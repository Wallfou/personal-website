/**
 * Resolve a path under `public/` for the current deployment.
 *
 * `next/image` prefixes `basePath` onto its own `_next/` assets but not onto
 * files served straight from `public/`, so on GitHub Pages a plain
 * `/images/x.jpeg` resolves off the site root and 404s. Prefixing here keeps
 * local dev (empty base path) and Pages builds pointing at the same file.
 */
export function assetPath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
