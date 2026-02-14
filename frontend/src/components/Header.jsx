import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar, Container, Button } from 'react-bootstrap';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="text-white">
          💬 Hexlet Chat
        </Navbar.Brand>
        {isAuthenticated && (
          <Button
            variant="outline-light"
            size="sm"
            onClick={handleLogout}
          >
            Выйти
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
