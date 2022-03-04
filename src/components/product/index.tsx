import { useParams } from 'react-router-dom';

type Product = {
  slug: string;
};

export function Product() {
  const { slug } = useParams<Product>();

  return <h1>Esse é o slug: {slug}</h1>;
}
