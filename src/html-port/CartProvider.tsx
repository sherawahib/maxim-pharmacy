"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { shopProducts, type ShopProduct } from "@/html-port/shop-catalog";

export type CartItem = {
  id: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  ready: boolean;
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  coupon: string | null;
  couponMessage: string | null;
  addItem: (productId: string, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  clearCoupon: () => void;
  lines: Array<CartItem & { product: ShopProduct; lineTotal: number }>;
};

const STORAGE_KEY = "maxim-pharmacy-cart-v1";
const FREE_SHIPPING_AT = 50;
const SHIPPING_FEE = 5.99;
const TAX_RATE = 0.08;

const CartContext = createContext<CartContextValue | null>(null);

type Stored = {
  items: CartItem[];
  coupon: string | null;
};

function calcDiscount(subtotal: number, coupon: string | null): number {
  if (!coupon) return 0;
  if (coupon === "MAXIM10") return Math.round(subtotal * 0.1 * 100) / 100;
  if (coupon === "SAVE5") return Math.min(5, subtotal);
  return 0;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Stored;
        if (Array.isArray(parsed.items)) setItems(parsed.items);
        if (parsed.coupon) setCoupon(parsed.coupon);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const payload: Stored = { items, coupon };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [items, coupon, ready]);

  const addItem = useCallback((productId: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === productId);
      if (existing) {
        return prev.map((i) =>
          i.id === productId ? { ...i, qty: Math.min(99, i.qty + qty) } : i
        );
      }
      return [...prev, { id: productId, qty }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    const next = Math.max(0, Math.min(99, Math.floor(qty)));
    setItems((prev) => {
      if (next <= 0) return prev.filter((i) => i.id !== productId);
      return prev.map((i) => (i.id === productId ? { ...i, qty: next } : i));
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCoupon(null);
    setCouponMessage(null);
  }, []);

  const applyCoupon = useCallback(
    (code: string) => {
      const normalized = code.trim().toUpperCase();
      if (normalized === "MAXIM10" || normalized === "SAVE5") {
        setCoupon(normalized);
        setCouponMessage(
          normalized === "MAXIM10"
            ? "10% off applied"
            : "$5 off applied"
        );
        return true;
      }
      setCouponMessage("Invalid coupon code");
      return false;
    },
    []
  );

  const clearCoupon = useCallback(() => {
    setCoupon(null);
    setCouponMessage(null);
  }, []);

  const lines = useMemo(() => {
    return items
      .map((item) => {
        const product = shopProducts.find((p) => p.id === item.id);
        if (!product) return null;
        return {
          ...item,
          product,
          lineTotal: Math.round(product.price * item.qty * 100) / 100,
        };
      })
      .filter(Boolean) as Array<
      CartItem & { product: ShopProduct; lineTotal: number }
    >;
  }, [items]);

  const subtotal = useMemo(
    () => Math.round(lines.reduce((sum, l) => sum + l.lineTotal, 0) * 100) / 100,
    [lines]
  );

  const discount = useMemo(
    () => calcDiscount(subtotal, coupon),
    [subtotal, coupon]
  );

  const shipping = useMemo(() => {
    if (lines.length === 0) return 0;
    const afterDiscount = Math.max(0, subtotal - discount);
    return afterDiscount >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;
  }, [lines.length, subtotal, discount]);

  const tax = useMemo(() => {
    const taxable = Math.max(0, subtotal - discount);
    return Math.round(taxable * TAX_RATE * 100) / 100;
  }, [subtotal, discount]);

  const total = useMemo(
    () =>
      Math.round((Math.max(0, subtotal - discount) + shipping + tax) * 100) /
      100,
    [subtotal, discount, shipping, tax]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      ready,
      itemCount,
      subtotal,
      discount,
      shipping,
      tax,
      total,
      coupon,
      couponMessage,
      addItem,
      removeItem,
      setQty,
      clearCart,
      applyCoupon,
      clearCoupon,
      lines,
    }),
    [
      items,
      ready,
      itemCount,
      subtotal,
      discount,
      shipping,
      tax,
      total,
      coupon,
      couponMessage,
      addItem,
      removeItem,
      setQty,
      clearCart,
      applyCoupon,
      clearCoupon,
      lines,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const CART_FREE_SHIPPING_AT = FREE_SHIPPING_AT;
