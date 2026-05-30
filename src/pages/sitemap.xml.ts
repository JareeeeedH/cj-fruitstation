import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const pages = [""];
  const urls = pages
    .map(
      (path) => `  <url>
    <loc>${new URL(path, site).href}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
