import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useEffect } from 'react';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Отладка - проверяем, что компонент монтируется
    console.log('Header mounted');
    console.log('isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand 
          as={Link} 
          to="/" 
          className="text-white"
          style={{ fontSize: '1.25rem' }}
        >
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
