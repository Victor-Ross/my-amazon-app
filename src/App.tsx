import { Route, Routes } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import { CartPage } from './pages/Cart';
import { ProductPage } from './pages/Product';

import { Footer } from './components/footer';
import { Header } from './components/header';
import { Products } from './components/products';
import { Signin } from './pages/SigninPage';
import { ShippingAddressPage } from './pages/Shipping';

function App() {
  return (
    <div className="d-flex flex-column site-container">
      <Header />
      <main style={{ flex: 1 }}>
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/shipping" element={<ShippingAddressPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
