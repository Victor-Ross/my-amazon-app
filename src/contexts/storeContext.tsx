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
    userInfo: User | null;
  };
  dispatch: Dispatch<Action>;
  updateCartHandler: (product: Product, quantity: number) => void;
  removeProductHandler: (product: Product) => void;
  checkoutHandler: () => void;
  addProductFromHomeScreenCartHandler: (product: Product) => void;
  signOutHandler: () => void;
};

type StoreContextProviderProps = {
  children: ReactNode;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  quantity: number;
  image: string;
  price: number;
  countInStock: number;
};

type User = {
  name: string;
  email: string;
  password: string;
};

type State = {
  cart: {
    cartItems: Product[];
  };
  userInfo: User | null;
};

type Action =
  | {
      type: 'cart_add_item';
      item: Product;
    }
  | {
      type: 'cart_remove_item';
      item: Product;
    }
  | {
      type: 'user_signin';
      user: User;
    }
  | {
      type: 'user_signout';
    };

export const StoreContext = createContext({} as StoreContextProps);

export function StoreProvider({ children }: StoreContextProviderProps) {
  const initialState = {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(String(localStorage.getItem('userInfo')))
      : null,
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
          (item) => item.id === newItem.id
        );
        const cartItems = existItem
          ? state.cart.cartItems.map((item) =>
              item.id === existItem.id ? newItem : item
            )
          : [...state.cart.cartItems, newItem];

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        return { ...state, cart: { ...state.cart, cartItems } };
      }
      case 'cart_remove_item': {
        const cartItems = state.cart.cartItems.filter(
          (item) => item.id !== action.item.id
        );
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems } };
      }
      case 'user_signin': {
        return { ...state, userInfo: action.user };
      }
      case 'user_signout': {
        return { ...state, userInfo: null };
      }
      default:
        return state;
    }
  }

  async function updateCartHandler(product: Product, quantity: number) {
    const response = await api.get(`/products/${product.id}`);
    const data: Product = response.data;

    if (data.countInStock < quantity) {
      window.alert('Sorry, Product is out of stock');
      return;
    }
    dispatch({ type: 'cart_add_item', item: { ...product, quantity } });
  }

  async function addProductFromHomeScreenCartHandler(product: Product) {
    const existItem = state.cart.cartItems.find(
      (item) => item.id === product.id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const response = await api.get(`/products/${product.id}`);
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

  const signOutHandler = () => {
    dispatch({ type: 'user_signout' });
    localStorage.removeItem('userInfo');
  };

  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch,
        updateCartHandler,
        removeProductHandler,
        checkoutHandler,
        addProductFromHomeScreenCartHandler,
        signOutHandler,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext() {
  return useContext(StoreContext);
}
