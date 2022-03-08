import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

type StoreContextProps = {
  state: {
    cart: {
      cartItems: Item[];
    };
  };
  dispatch: Dispatch<Action>;
};

type StoreContextProviderProps = {
  children: ReactNode;
};

type Item = {
  _id: string;
  name: string;
  slug: string;
  quantity: number;
};

type State = {
  cart: {
    cartItems: Item[];
  };
};

type Action = {
  type: 'cart_add_item';
  item: { _id: string; name: string; slug: string; quantity: number };
};

export const StoreContext = createContext({} as StoreContextProps);

export function StoreProvider({ children }: StoreContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, { cart: { cartItems: [] } });

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case 'cart_add_item':
        const newItem = action.item;
        const existItem = state.cart.cartItems.find(
          (item) => item._id === newItem._id
        );
        const cartItems = existItem
          ? state.cart.cartItems.map((item) =>
              item._id === existItem._id ? newItem : item
            )
          : [...state.cart.cartItems, newItem];

        return { ...state, cart: { ...state.cart, cartItems } };
      default:
        return state;
    }
  }

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext() {
  return useContext(StoreContext);
}
