"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

export type CartItem = {
  slug: string;
  name: string;
  collection: string;
  image: string;
  variantId: string;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
};

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; item: CartItem }
  | { type: "setQty"; slug: string; variantId: string; quantity: number }
  | { type: "remove"; slug: string; variantId: string }
  | { type: "clear" };

const STORAGE_KEY = "lumiere.cart.v1";

function keyOf(slug: string, variantId: string) {
  return `${slug}::${variantId}`;
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { items: action.items };
    case "add": {
      const k = keyOf(action.item.slug, action.item.variantId);
      const existing = state.items.find(
        (i) => keyOf(i.slug, i.variantId) === k
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            keyOf(i.slug, i.variantId) === k
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "setQty": {
      const k = keyOf(action.slug, action.variantId);
      return {
        items: state.items
          .map((i) =>
            keyOf(i.slug, i.variantId) === k
              ? { ...i, quantity: Math.max(1, action.quantity) }
              : i
          )
          .filter((i) => i.quantity > 0),
      };
    }
    case "remove": {
      const k = keyOf(action.slug, action.variantId);
      return { items: state.items.filter((i) => keyOf(i.slug, i.variantId) !== k) };
    }
    case "clear":
      return { items: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  setQuantity: (slug: string, variantId: string, quantity: number) => void;
  removeItem: (slug: string, variantId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) dispatch({ type: "hydrate", items: parsed });
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* storage unavailable */
    }
  }, [state.items]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = state.items.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0
    );
    return {
      items: state.items,
      count,
      subtotal,
      addItem: (item) => dispatch({ type: "add", item }),
      setQuantity: (slug, variantId, quantity) =>
        dispatch({ type: "setQty", slug, variantId, quantity }),
      removeItem: (slug, variantId) =>
        dispatch({ type: "remove", slug, variantId }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
