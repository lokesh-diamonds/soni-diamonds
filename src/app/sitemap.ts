import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/shop",
    "/bag",
    "/checkout",
    "/size-guide",
    "/shipping-returns",
    "/privacy-policy",
    "/terms-of-service",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${site.url}/shop/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...productRoutes];
}
