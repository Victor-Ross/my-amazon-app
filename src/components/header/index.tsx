import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav.Link as={Link} to="/">
            <Navbar.Brand>amazona</Navbar.Brand>
          </Nav.Link>
        </Container>
      </Navbar>
    </header>
  );
}
