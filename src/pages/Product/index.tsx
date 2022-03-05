import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

import { Rating } from '../../components/rating';

import { api } from '../../services/api';

import styles from './styles.module.scss';
import { Helmet } from 'react-helmet-async';

type ParamsProduct = {
  slug: string;
};

type Product = {
  name: string;
  slug: string;
  image: string;
  rating: number;
  numReviews: number;
  price: number;
  description: string;
  countInStock: number;
};

type State = {
  product: Product;
  isLoading?: boolean;
  error?: string;
};

type Action =
  | { type: 'request' }
  | { type: 'success'; product: Product }
  | { type: 'fail'; error: string };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'request':
      return { ...state, isLoading: true };
    case 'success':
      return { ...state, product: action.product, isLoading: false };
    case 'fail':
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}

export function ProductPage() {
  const [{ product, isLoading }, dispatch] = useReducer(reducer, {
    product: {} as Product,
    isLoading: false,
    error: '',
  });

  const { slug } = useParams<ParamsProduct>();

  useEffect(() => {
    const fetchingData = async () => {
      dispatch({ type: 'request' });
      try {
        const response = await api.get(`/products/slug/${slug}`);
        dispatch({ type: 'success', product: response.data });
      } catch (error: any) {
        dispatch({ type: 'fail', error: error.message });
      }
    };

    fetchingData();
  }, [slug]);

  return (
    <>
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <Row>
          <Col md={6}>
            <img
              className={styles.imgLarge}
              src={product.image}
              alt={product.name}
            />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item className="my-3">
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Price :
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(product.price)}
              </ListGroup.Item>
              <ListGroup.Item>
                Description:
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(product.price)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button
                          style={{ backgroundColor: '#ffc000', color: '#000' }}
                          variant="primary"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
