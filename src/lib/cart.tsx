import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type ProductType = 'circular' | 'square' | 'rectangular' | 'mixed';

export interface CartItem {
  id: string;
  productType: ProductType;
  title: string;
  unitPriceUGX: number;
  quantity: number;
  design: Record<string, unknown>;
  createdAt: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  notes: string;
}

interface CartContextValue {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  addItem: (item: Omit<CartItem, 'id' | 'createdAt'> & { id?: string }) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotalUGX: number;
  updateShippingAddress: (patch: Partial<ShippingAddress>) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'wonderlabels_cart_v1';

const emptyShippingAddress: ShippingAddress = {
  fullName: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  region: '',
  postalCode: '',
  country: 'Uganda',
  notes: '',
};

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function makeId() {
  return `cart_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(emptyShippingAddress);

  useEffect(() => {
    const saved = safeParse<{ items: CartItem[]; shippingAddress: ShippingAddress }>(
      localStorage.getItem(STORAGE_KEY)
    );

    if (saved?.items) setItems(saved.items);
    if (saved?.shippingAddress) setShippingAddress(saved.shippingAddress);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, shippingAddress }));
  }, [items, shippingAddress]);

  const addItem: CartContextValue['addItem'] = (item) => {
    const id = item.id ?? makeId();

    setItems((prev) => {
      const existingIndex = prev.findIndex((p) => p.id === id);
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + (item.quantity ?? 1),
        };
        return next;
      }

      return [
        {
          id,
          createdAt: new Date().toISOString(),
          ...item,
        },
        ...prev,
      ];
    });
  };

  const removeItem: CartContextValue['removeItem'] = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const setQuantity: CartContextValue['setQuantity'] = (id, quantity) => {
    const safeQuantity = Math.max(1, Math.floor(quantity || 1));
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: safeQuantity } : p)));
  };

  const clearCart = () => setItems([]);

  const updateShippingAddress: CartContextValue['updateShippingAddress'] = (patch) => {
    setShippingAddress((prev) => ({ ...prev, ...patch }));
  };

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + (item.quantity ?? 0), 0),
    [items]
  );

  const subtotalUGX = useMemo(
    () => items.reduce((sum, item) => sum + (item.unitPriceUGX ?? 0) * (item.quantity ?? 0), 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    shippingAddress,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
    totalItems,
    subtotalUGX,
    updateShippingAddress,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
