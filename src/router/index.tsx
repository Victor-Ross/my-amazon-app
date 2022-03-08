import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import { ProductPage } from '../pages/Product';

import { Header } from '../components/header';
import { Products } from '../components/products';
import { Footer } from '../components/footer';

import styles from './styles.module.scss';
import { CartPage } from '../pages/CartPage';

export function Router() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ flex: 1 }}>
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
