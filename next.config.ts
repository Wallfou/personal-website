import type { NextConfig } from "next";

/**
 * only set this for production builds on GitHub Actions (where `GITHUB_REPOSITORY` is set).
 * Local `next dev` and local `next build` keep the default (no basePath).
 */
const repoSlug = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGitHubPagesBuild =
  process.env.NODE_ENV === "production" && Boolean(repoSlug);
const basePath = isGitHubPagesBuild && repoSlug ? `/${repoSlug}` : undefined;

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath } : {}),
  /**
   * next/image does not prefix `basePath` onto files served from `public/`, so
   * the value is exposed to the client and applied by hand in `assetPath()`.
   * Without it every image 404s on GitHub Pages.
   */
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath ?? "",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
