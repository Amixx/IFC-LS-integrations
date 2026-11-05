import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineMdastPlugin, type MdastPluginEntry } from 'satteri';

export const repo = 'Amixx/IFC-LS-integrations';
export const siteUrl = 'https://amixx.github.io/IFC-LS-integrations/';
export const agentHeading = { depth: 2, slug: 'set-up-with-an-ai-agent', text: 'Set up with an AI agent' };

const excludedFolders = new Set(['site', 'node_modules']);

interface EditorRow {
	folder: string;
	cells: Record<string, string>;
}

export function editorTable(repoRoot: string): EditorRow[] {
	const lines = readFileSync(join(repoRoot, 'README.md'), 'utf8').split('\n');
	const splitRow = (line: string) =>
		line
			.trim()
			.replace(/^\||\|$/g, '')
			.split('|')
			.map((cell) => cell.trim());
	const rows: EditorRow[] = [];
	let headers: string[] = [];
	for (const line of lines) {
		if (!line.trim().startsWith('|')) {
			headers = [];
			continue;
		}
		const cells = splitRow(line);
		if (headers.length === 0) {
			headers = cells;
			continue;
		}
		const folder = cells[0]?.match(/^\[[^\]]+\]\(([^)]+)\)$/)?.[1];
		if (!folder) continue;
		rows.push({ folder, cells: Object.fromEntries(headers.map((header, i) => [header, cells[i] ?? ''])) });
	}
	return rows;
}

export function editorFolders(repoRoot: string): string[] {
	const folders = readdirSync(repoRoot).filter(
		(name) =>
			!name.startsWith('.') &&
			!excludedFolders.has(name) &&
			statSync(join(repoRoot, name)).isDirectory() &&
			existsSync(join(repoRoot, name, 'README.md')),
	);
	const tableOrder = editorTable(repoRoot).map((row) => row.folder);
	const rank = (folder: string) => {
		const i = tableOrder.indexOf(folder);
		return i === -1 ? tableOrder.length : i;
	};
	return folders.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
}

/**
 * Rewrites relative URLs in the repository's READMEs: links to a page's folder become site links and other links become
 * GitHub links.
 */
export function readmeLinks(repoRoot: string, base: string): MdastPluginEntry {
	const basePath = base.replace(/\/$/, '');
	return ({ fileURL }) => {
		if (!fileURL) return null;
		const file = posix.relative(repoRoot.replace(/\\/g, '/'), fileURLToPath(fileURL).replace(/\\/g, '/'));
		if (posix.basename(file) !== 'README.md' || file.startsWith('..') || file.startsWith('site/')) return null;
		const folder = posix.dirname(file).replace(/^\.$/, '');
		const pages = new Set(['', ...editorFolders(repoRoot)]);
		const resolve = (url: string) => {
			if (/^[a-z][a-z\d+.-]*:/i.test(url) || url.startsWith('#') || url.startsWith('/')) return undefined;
			const [path = '', hash] = url.split('#', 2);
			const target = posix.normalize(posix.join(folder, path)).replace(/\/$/, '').replace(/^\.$/, '');
			return { target, suffix: hash === undefined ? '' : `#${hash}` };
		};
		return defineMdastPlugin({
			name: 'readme-links',
			paragraph(node, ctx) {
				if (node.children.some((child) => child.type === 'link' && child.url === siteUrl)) ctx.removeNode(node);
			},
			link(node, ctx) {
				const resolved = resolve(node.url);
				if (!resolved) return;
				const { target, suffix } = resolved;
				const isDir = existsSync(join(repoRoot, target)) && statSync(join(repoRoot, target)).isDirectory();
				const url = pages.has(target)
					? `${basePath}/${target ? `${target}/` : ''}${suffix}`
					: `https://github.com/${repo}/${isDir ? 'tree' : 'blob'}/main/${target}${suffix}`;
				ctx.setProperty(node, 'url', url);
			},
		});
	};
}
