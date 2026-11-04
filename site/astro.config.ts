import { fileURLToPath } from 'node:url';
import { satteri } from '@astrojs/markdown-satteri';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightLlmsTxt from 'starlight-llms-txt';
import { editorFolders, editorTable, readmeLinks, repo, siteUrl } from './src/readmes';

const { origin, pathname } = new URL(siteUrl);
const repoRoot = fileURLToPath(new URL('..', import.meta.url));

const editorGuides = editorTable(repoRoot)
	.map(({ folder, cells }) => {
		const name = cells.Editor?.match(/^\[([^\]]+)\]/)?.[1];
		if (!name) throw new Error(`The editor table row for ${folder} has no linked name`);
		return `- [${name}](https://github.com/${repo}/blob/main/${folder}/README.md)`;
	})
	.join('\n');

export default defineConfig({
	site: origin,
	base: pathname,
	trailingSlash: 'always',
	markdown: { processor: satteri({ mdastPlugins: [readmeLinks(repoRoot, pathname)] }) },
	integrations: [
		starlight({
			title: 'IFC-LS-integrations',
			logo: { src: './src/assets/logo.svg' },
			favicon: '/favicon.svg',
			customCss: ['./src/styles/custom.css'],
			description: 'Editor setups for the IFC Language Server.',
			social: [{ icon: 'github', label: 'GitHub', href: `https://github.com/${repo}` }],
			components: {
				Footer: './src/components/Footer.astro',
				MarkdownContent: './src/components/MarkdownContent.astro',
				TableOfContents: './src/components/TableOfContents.astro',
			},
			plugins: [
				starlightLlmsTxt({
					details: `Each guide below sets up one editor for IFC files. Editors with a language client also need the \`ifc-language-server\` binary from https://github.com/NepomukWolf/IFC-Language-Server/releases/latest on \`PATH\`.\n\n${editorGuides}`,
				}),
			],
			sidebar: [{ label: 'Home', link: '/' }, ...editorFolders(repoRoot).map((slug) => ({ slug }))],
		}),
	],
});
