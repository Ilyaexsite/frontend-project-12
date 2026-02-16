import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const DebugPage = () => {
  useEffect(() => {
    console.log('Debug page mounted');
    console.log('Document title:', document.title);
    console.log('Root element:', document.getElementById('root'));
    console.log('Header text:', document.querySelector('.navbar-brand')?.textContent);
  }, []);

  return (
    <div className="container mt-5">
      <h1>Debug Page</h1>
      <p>Current time: {new Date().toISOString()}</p>
      <p>User Agent: {navigator.userAgent}</p>
      <Link to="/">Go to main page</Link>
    </div>
  );
};

export default DebugPage;
