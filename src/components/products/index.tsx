import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import logger from 'use-reducer-logger';

import { api } from '../../services/api';

import styles from './styles.module.scss';

type Product = {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  countInStoc: number;
  brand: string;
  rating: number;
  numReview: number;
  description: string;
};

type State = {
  products: Product[];
  isLoading?: boolean;
  error?: string;
};

type Action =
  | { type: 'request' }
  | { type: 'success'; products: [] }
  | { type: 'fail'; error: string };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'request':
      return {
        ...state,
        isLoading: true,
      };
    case 'success':
      return {
        ...state,
        products: action.products,
        isLoading: false,
      };
    case 'fail':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function Products() {
  const [{ products, isLoading, error }, dispatch] = useReducer(
    logger(reducer),
    {
      products: [] as Product[],
      isLoading: false,
      error: '',
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'request', isLoading: true });
      try {
        const response = await api.get('/products');
        dispatch({ type: 'success', products: response.data });
      } catch (error: any) {
        dispatch({ type: 'fail', error: error.message });
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Featured products</h1>
      <div className={styles.products}>
        {isLoading ? (
          <h1>Carregando...</h1>
        ) : (
          products.map((product) => (
            <div className={styles.productItem} key={product.slug}>
              <a href={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <div className={styles.productInfo}>
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>
                  <strong>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(product.price)}
                  </strong>
                </p>
                <button type="button">Add to cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
