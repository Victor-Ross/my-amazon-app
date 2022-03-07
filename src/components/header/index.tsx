import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { useStoreContext } from '../../contexts/storeContext';

export function Header() {
  const { cart } = useStoreContext().state;

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav.Link as={Link} to="/">
            <Navbar.Brand>amazona</Navbar.Brand>
          </Nav.Link>
          <Nav className="me-auto">
            <Link to="/cart" className="nav-link">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.length}
                </Badge>
              )}
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}
