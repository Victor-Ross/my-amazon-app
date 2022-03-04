import { Link } from 'react-router-dom';
import { data } from '../../data';
import styles from './styles.module.scss';

export function Products() {
  return (
    <div className={styles.container}>
      <h1>Featured products</h1>
      <div className={styles.products}>
        {data.products.map((product) => (
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
        ))}
      </div>
    </div>
  );
}
