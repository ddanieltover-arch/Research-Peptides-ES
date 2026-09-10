/** Highest EUR price for a product row (base price vs variants). */
export function productEffectiveMaxPrice(product: {
  price?: number | null;
  variants?: Array<unknown> | null;
}): number {
  let hi = Number(product.price);
  if (Number.isNaN(hi)) hi = 0;
  if (Array.isArray(product.variants) && product.variants.length > 0) {
    for (const raw of product.variants) {
      if (raw && typeof raw === 'object' && 'display_price' in raw) {
        const dp = Number((raw as { display_price?: number }).display_price);
        if (!Number.isNaN(dp)) hi = Math.max(hi, dp);
      }
    }
  }
  return hi;
}

/** Upper bound for the shop price slider from catalog prices (product + variant display_price). */
export function catalogPriceSliderMax(products: unknown[]): number {
  const floor = 500;
  if (!Array.isArray(products) || products.length === 0) return floor;

  let peak = 0;
  for (const raw of products) {
    peak = Math.max(
      peak,
      productEffectiveMaxPrice(raw as { price?: number; variants?: Array<{ display_price?: number }> }),
    );
  }

  const step = 50;
  const rounded = Math.ceil(peak / step) * step;
  return Math.max(floor, rounded);
}
