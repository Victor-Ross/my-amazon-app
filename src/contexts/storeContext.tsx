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
  name: string;
  slug: string;
};

type State = {
  cart: {
    cartItems: Item[];
  };
};

type Action = {
  type: 'cart_add_item';
  item: { name: string; slug: string; quantity: number };
};

export const StoreContext = createContext({} as StoreContextProps);

export function StoreProvider({ children }: StoreContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, { cart: { cartItems: [] } });

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case 'cart_add_item':
        return {
          ...state,
          cart: {
            ...state.cart,
            cartItems: [...state.cart.cartItems, action.item],
          },
        };
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
