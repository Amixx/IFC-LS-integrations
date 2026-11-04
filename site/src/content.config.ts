import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection } from 'astro:content';
import type { Loader } from 'astro/loaders';
import { editorFolders } from './readmes';

function readmeLoader(): Loader {
	return {
		name: 'readme-loader',
		async load({ config, store, parseData, renderMarkdown, watcher }) {
			const rootUrl = new URL('../', config.root);
			const repoRoot = fileURLToPath(rootUrl);
			const sync = async () => {
				const folders = editorFolders(repoRoot);
				store.clear();
				for (const folder of ['', ...folders]) {
					const fileUrl = new URL(`${folder ? `${folder}/` : ''}README.md`, rootUrl);
					const source = readFileSync(fileUrl, 'utf8');
					const title = source.match(/^# (.+)$/m)?.[1]?.trim();
					if (!title) throw new Error(`${fileURLToPath(fileUrl)} has no "# " heading`);
					const body = source.replace(/^# .+\n+/m, '');
					const id = folder || 'index';
					const data = await parseData({ id, data: { title } });
					const rendered = await renderMarkdown(body, { fileURL: fileUrl });
					store.set({ id, data, body, rendered });
				}
			};
			await sync();
			watcher?.on('all', (_event, path) => {
				if (path.endsWith('README.md')) void sync();
			});
			watcher?.add(repoRoot);
		},
	};
}

export const collections = {
	docs: defineCollection({
		loader: readmeLoader(),
		schema: docsSchema(),
	}),
};
