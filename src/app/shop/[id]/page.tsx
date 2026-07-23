import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailContent } from "@/html-port/ProductDetailContent";
import { getProductDetail, shopProducts } from "@/html-port/shop-catalog";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = true;

export function generateStaticParams() {
  return shopProducts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductDetail(id);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.shortBlurb ?? product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductDetail(id);
  if (!product) notFound();
  return <ProductDetailContent productId={id} />;
}
