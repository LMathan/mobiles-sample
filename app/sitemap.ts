import { MetadataRoute } from "next";
import { PRODUCTS_DATA } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://novamobile-demo.com";

  const staticRoutes = [
    "",
    "/shop",
    "/deals",
    "/exchange",
    "/emi",
    "/store",
    "/about",
    "/faq",
    "/compare",
    "/enquire",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productRoutes = PRODUCTS_DATA.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
