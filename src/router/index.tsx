import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from '../pages/home';
import { Header } from '../components/header';
import { Products } from '../components/products';
import { Product } from '../components/product';

export function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:slug" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
