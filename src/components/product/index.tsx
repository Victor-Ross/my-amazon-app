import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Rating } from '../rating';

import styles from './styles.module.scss';

type Product = {
  product: {
    name: string;
    slug: string;
    category: string;
    image: string;
    price: number;
    countInStoc: number;
    brand: string;
    rating: number;
    numReviews: number;
    description: string;
  };
};

export function Product({ product }: Product) {
  return (
    <Card className={styles.productItem}>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title color="secondary">{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(product.price)}
        </Card.Text>
        <Link to={`product/${product.slug}`}>
          <Button className="buttonsDefaultColors">Add to Cart</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
