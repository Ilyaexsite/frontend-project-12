import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Минимальный компонент для тестов
const Header = () => (
  <nav style={{ backgroundColor: 'blue', padding: '10px' }}>
    <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>
      💬 Hexlet Chat
    </Link>
  </nav>
);

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Ваш ник</label><br />
          <input type="text" name="username" style={{ width: '100%', padding: '5px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Пароль</label><br />
          <input type="password" name="password" style={{ width: '100%', padding: '5px' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: 'blue', color: 'white' }}>
          Войти
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        <a href="/signup">Регистрация</a>
      </p>
    </div>
  );
};

const SignupPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Ваш ник</label><br />
          <input type="text" name="username" style={{ width: '100%', padding: '5px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Пароль</label><br />
          <input type="password" name="password" style={{ width: '100%', padding: '5px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Подтвердите пароль</label><br />
          <input type="password" name="confirmPassword" style={{ width: '100%', padding: '5px' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: 'blue', color: 'white' }}>
          Зарегистрироваться
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        <a href="/login">Вход</a>
      </p>
    </div>
  );
};

const ChatPage = () => (
  <div>
    <Header />
    <div style={{ padding: '20px' }}>
      <h2>Добро пожаловать в чат!</h2>
    </div>
  </div>
);

const HomePage = () => {
  return (
    <div>
      <Header />
      <LoginPage />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
