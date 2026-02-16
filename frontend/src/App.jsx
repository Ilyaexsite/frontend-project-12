import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary as RollbarErrorBoundary } from '@rollbar/react';
import { store } from './store';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ChatPage from './components/Chat/ChatPage';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './components/NotFoundPage';
import ToastContainer from './components/Toast/ToastContainer';
import { Spinner } from 'react-bootstrap';
import rollbarConfig from './rollbar';
import 'bootstrap/dist/css/bootstrap.min.css';

// Компонент для отображения fallback UI при ошибке
const ErrorFallback = ({ error, resetError }) => (
  <div className="text-center mt-5 p-5">
    <h2 className="text-danger mb-4">Что-то пошло не так</h2>
    <p className="text-muted mb-4">Мы уже знаем об этой ошибке и работаем над её исправлением.</p>
    <button 
      className="btn btn-primary"
      onClick={resetError}
    >
      Попробовать снова
    </button>
    <details className="mt-4 text-start">
      <summary>Техническая информация</summary>
      <pre className="bg-light p-3 rounded mt-2 small">
        {error?.toString()}
      </pre>
    </details>
  </div>
);

function App() {
  return (
    <RollbarProvider config={rollbarConfig}>
      <RollbarErrorBoundary 
        fallbackUI={ErrorFallback}
        level="error"
        errorMessage="React App Error"
      >
        <Provider store={store}>
          <AuthProvider>
            <BrowserRouter>
              <Suspense fallback={
                <div className="d-flex justify-content-center align-items-center vh-100">
                  <Spinner animation="border" variant="primary" />
                </div>
              }>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <ChatPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
                <ToastContainer />
              </Suspense>
            </BrowserRouter>
          </AuthProvider>
        </Provider>
      </RollbarErrorBoundary>
    </RollbarProvider>
  );
}

export default App;
