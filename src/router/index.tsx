import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from '../components/header';
import { Products } from '../components/products';
import { Product } from '../components/product';
import { Container } from 'react-bootstrap';
import { Footer } from '../components/footer';

import styles from './styles.module.scss';

export function Router() {
  return (
    <BrowserRouter>
      <Header />
      <main className={styles.main}>
        <Container>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:slug" element={<Product />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
