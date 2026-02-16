import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Простой хедер
const Header = () => (
  <nav style={{ backgroundColor: '#0d6efd', padding: '1rem' }}>
    <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.25rem' }}>
      💬 Hexlet Chat
    </Link>
  </nav>
);

// Страница логина
const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center' }}>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Ваш ник</label><br />
          <input type="text" name="username" style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Пароль</label><br />
          <input type="password" name="password" style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.5rem', background: '#0d6efd', color: 'white' }}>
          Войти
        </button>
      </form>
      <p style={{ textAlign: 'center' }}>
        <Link to="/signup">Регистрация</Link>
      </p>
    </div>
  );
};

// Страница регистрации
const SignupPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center' }}>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Ваш ник</label><br />
          <input type="text" name="username" style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Пароль</label><br />
          <input type="password" name="password" style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Подтвердите пароль</label><br />
          <input type="password" name="confirmPassword" style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.5rem', background: '#0d6efd', color: 'white' }}>
          Зарегистрироваться
        </button>
      </form>
      <p style={{ textAlign: 'center' }}>
        <Link to="/login">Вход</Link>
      </p>
    </div>
  );
};

// Главная страница
const HomePage = () => (
  <>
    <Header />
    <LoginPage />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;