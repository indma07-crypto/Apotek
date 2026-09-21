import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { seedOrders } from '../data/seed.js';

/**
 * State global aplikasi: keranjang, pesanan, sesi pengguna, dan toast.
 * Disimpan di localStorage dengan key berversi supaya perubahan struktur
 * data tidak merusak sesi lama. Ganti bagian ini dengan API call saat backend siap.
 */
const STORAGE_KEY = 'asb:store:v1';

const initialState = {
  cart: [], // { id, name, price, qty, category, requiresPrescription, unit }
  orders: seedOrders,
  user: null, // { name, email, phone }
};

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    return { ...initialState, ...parsed, orders: parsed.orders?.length ? parsed.orders : seedOrders };
  } catch {
    return initialState;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'cart/add': {
      const { product, qty } = action;
      const existing = state.cart.find((i) => i.id === product.id);
      const cart = existing
        ? state.cart.map((i) =>
            i.id === product.id ? { ...i, qty: Math.min(i.qty + qty, product.stock) } : i
          )
        : [
            ...state.cart,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              oldPrice: product.oldPrice,
              category: product.category,
              unit: product.unit,
              stock: product.stock,
              requiresPrescription: product.requiresPrescription,
              qty: Math.min(qty, product.stock),
            },
          ];
      return { ...state, cart };
    }
    case 'cart/qty': {
      const cart = state.cart
        .map((i) => (i.id === action.id ? { ...i, qty: Math.max(1, Math.min(action.qty, i.stock)) } : i))
        .filter((i) => i.qty > 0);
      return { ...state, cart };
    }
    case 'cart/remove':
      return { ...state, cart: state.cart.filter((i) => i.id !== action.id) };
    case 'cart/clear':
      return { ...state, cart: [] };
    case 'order/create':
      return { ...state, cart: [], orders: [action.order, ...state.orders] };
    case 'order/status':
      return {
        ...state,
        orders: state.orders.map((o) => (o.id === action.id ? { ...o, status: action.status } : o)),
      };
    case 'auth/login':
      return { ...state, user: action.user };
    case 'auth/logout':
      return { ...state, user: null };
    default:
      return state;
  }
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, readStorage);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage penuh atau diblokir: abaikan, state tetap jalan di memori */
    }
  }, [state]);

  const notify = useCallback((message, tone = 'success') => {
    setToast({ message, tone, key: Date.now() });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const value = useMemo(() => {
    const subtotal = state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const savings = state.cart.reduce(
      (sum, i) => sum + (i.oldPrice ? (i.oldPrice - i.price) * i.qty : 0),
      0
    );
    return {
      ...state,
      dispatch,
      toast,
      notify,
      cartCount: state.cart.reduce((sum, i) => sum + i.qty, 0),
      subtotal,
      savings,
      addToCart: (product, qty = 1) => {
        dispatch({ type: 'cart/add', product, qty });
        notify(product.name + ' ditambahkan ke keranjang.');
      },
      setQty: (id, qty) => dispatch({ type: 'cart/qty', id, qty }),
      removeFromCart: (id) => dispatch({ type: 'cart/remove', id }),
      clearCart: () => dispatch({ type: 'cart/clear' }),
      createOrder: (order) => dispatch({ type: 'order/create', order }),
      setOrderStatus: (id, status) => dispatch({ type: 'order/status', id, status }),
      login: (user) => dispatch({ type: 'auth/login', user }),
      logout: () => dispatch({ type: 'auth/logout' }),
    };
  }, [state, toast, notify]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore harus dipakai di dalam StoreProvider');
  return ctx;
}
