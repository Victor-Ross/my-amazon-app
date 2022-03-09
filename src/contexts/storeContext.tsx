import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

type StoreContextProps = {
  state: {
    cart: {
      cartItems: Product[];
    };
  };
  dispatch: Dispatch<Action>;
  updateCartHandler: (product: Product, quantity: number) => void;
  removeProductHandler: (product: Product) => void;
  checkoutHandler: () => void;
  addProductFromHomeScreenCartHandler: (product: Product) => void;
};

type StoreContextProviderProps = {
  children: ReactNode;
};

type Product = {
  _id: string;
  name: string;
  slug: string;
  quantity: number;
  image: string;
  price: number;
  countInStock: number;
};

type State = {
  cart: {
    cartItems: Product[];
  };
};

type Action =
  | {
      type: 'cart_add_item';
      item: Product;
    }
  | {
      type: 'cart_remove_item';
      item: Product;
    };

export const StoreContext = createContext({} as StoreContextProps);

export function StoreProvider({ children }: StoreContextProviderProps) {
  const initialState = {
    cart: {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(String(localStorage.getItem('cartItems')))
        : [],
    },
  };

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case 'cart_add_item': {
        const newItem = action.item;
        const existItem = state.cart.cartItems.find(
          (item) => item._id === newItem._id
        );
        const cartItems = existItem
          ? state.cart.cartItems.map((item) =>
              item._id === existItem._id ? newItem : item
            )
          : [...state.cart.cartItems, newItem];

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        return { ...state, cart: { ...state.cart, cartItems } };
      }
      case 'cart_remove_item': {
        const cartItems = state.cart.cartItems.filter(
          (item) => item._id !== action.item._id
        );
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems } };
      }
      default:
        return state;
    }
  }

  async function updateCartHandler(product: Product, quantity: number) {
    const response = await api.get(`/products/${product._id}`);
    const data: Product = response.data;

    if (data.countInStock < quantity) {
      window.alert('Sorry, Product is out of stock');
      return;
    }
    dispatch({ type: 'cart_add_item', item: { ...product, quantity } });
  }

  async function addProductFromHomeScreenCartHandler(product: Product) {
    const existItem = state.cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const response = await api.get(`/products/${product._id}`);
    const data: Product = response.data;

    if (data.countInStock < quantity) {
      window.alert('Sorry, Product is out of stock');
      return;
    }

    dispatch({ type: 'cart_add_item', item: { ...product, quantity } });
  }

  async function removeProductHandler(product: Product) {
    dispatch({ type: 'cart_remove_item', item: product });
  }

  function checkoutHandler() {
    navigate('/signin?redirect=/shipping');
  }

  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch,
        updateCartHandler,
        removeProductHandler,
        checkoutHandler,
        addProductFromHomeScreenCartHandler,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext() {
  return useContext(StoreContext);
}
