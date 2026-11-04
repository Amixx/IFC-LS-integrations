import { fileURLToPath } from 'node:url';
import { satteri } from '@astrojs/markdown-satteri';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import { editorFolders, readmeLinks, repo, siteUrl } from './src/readmes';

const { origin, pathname } = new URL(siteUrl);
const repoRoot = fileURLToPath(new URL('..', import.meta.url));

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
			sidebar: [{ label: 'Home', link: '/' }, ...editorFolders(repoRoot).map((slug) => ({ slug }))],
		}),
	],
});
