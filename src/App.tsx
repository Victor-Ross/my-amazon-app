import { Route, Routes } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import { Footer } from './components/footer';
import { Header } from './components/header';
import { Products } from './components/products';

import { CartPage } from './pages/Cart';
import { ProductPage } from './pages/Product';
import { Signin } from './pages/SigninPage';
import { Signup } from './pages/Signup';
import { ShippingAddressPage } from './pages/Shipping';
import { PaymentMethod } from './pages/PaymentMethod';
import PlaceOrder from './pages/PlaceOrder';
import OrderPage from './pages/Order';
import OrderHistoryPage from './pages/OrderHistory';

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
            <Route path="/signup" element={<Signup />} />
            <Route path="/shipping" element={<ShippingAddressPage />} />
            <Route path="/payment" element={<PaymentMethod />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/orderhistory" element={<OrderHistoryPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
