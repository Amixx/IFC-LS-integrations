import { copyFileSync, createReadStream, existsSync, mkdirSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { satteri } from '@astrojs/markdown-satteri';
import starlight from '@astrojs/starlight';
import { type AstroIntegration, defineConfig } from 'astro/config';
import { editorFolders, imageTypes, readmeLinks, repo, repoImages, siteUrl } from './src/readmes';

const { origin, pathname } = new URL(siteUrl);
const repoRoot = fileURLToPath(new URL('..', import.meta.url));

const readmeImages: AstroIntegration = {
	name: 'readme-images',
	hooks: {
		'astro:config:setup': ({ command, updateConfig }) => {
			if (command !== 'dev') return;
			updateConfig({
				vite: {
					plugins: [
						{
							name: 'readme-images',
							configureServer(server) {
								const images = new Set(repoImages(repoRoot));
								server.middlewares.use((req, res, next) => {
									const url = decodeURIComponent(new URL(req.url as string, origin).pathname);
									const path = url.startsWith(pathname) ? url.slice(pathname.length) : url.slice(1);
									if (!images.has(path)) return next();
									res.setHeader('Content-Type', imageTypes[extname(path).toLowerCase()] as string);
									createReadStream(join(repoRoot, path)).pipe(res);
								});
							},
						},
					],
				},
			});
		},
		'astro:build:done': ({ dir }) => {
			for (const path of repoImages(repoRoot)) {
				const target = join(fileURLToPath(dir), path);
				if (existsSync(target)) throw new Error(`${path} would overwrite a file the site already built`);
				mkdirSync(dirname(target), { recursive: true });
				copyFileSync(join(repoRoot, path), target);
			}
		},
	},
};

export default defineConfig({
	site: origin,
	base: pathname,
	trailingSlash: 'always',
	markdown: { processor: satteri({ mdastPlugins: [readmeLinks(repoRoot, pathname)] }) },
	integrations: [
		starlight({
			title: 'IFC-LS-integrations',
			description: 'Editor setups for the IFC Language Server.',
			social: [{ icon: 'github', label: 'GitHub', href: `https://github.com/${repo}` }],
			sidebar: [{ label: 'Home', link: '/' }, ...editorFolders(repoRoot).map((slug) => ({ slug }))],
		}),
		readmeImages,
	],
});
