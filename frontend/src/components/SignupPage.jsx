import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSignupMutation } from '../store/api/authApi';
import { useAuth } from '../contexts/AuthContext';
import { Container, Card, Alert, Spinner } from 'react-bootstrap';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [signup, { isLoading }] = useSignupMutation();
  const [error, setError] = useState('');
  const usernameRef = useRef(null);

  useEffect(() => {
    // Автофокус на поле username
    usernameRef.current?.focus();
  }, []);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Обязательное поле'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError('');
    
    try {
      const { username, password } = values;
      const result = await signup({ username, password }).unwrap();
      
      // Автоматический вход после успешной регистрации
      await login(username, password);
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      if (err.status === 409) {
        setError('Пользователь с таким именем уже существует');
      } else {
        setError('Ошибка при регистрации. Попробуйте позже.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <Card className="shadow">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4">Регистрация</h2>
              
              {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )}

              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, isValid, dirty }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Имя пользователя
                      </label>
                      <Field
                        innerRef={usernameRef}
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="От 3 до 20 символов"
                        disabled={isLoading}
                      />
                      <ErrorMessage name="username">
                        {msg => (
                          <div className="text-danger small mt-1">{msg}</div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Пароль
                      </label>
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Не менее 6 символов"
                        disabled={isLoading}
                      />
                      <ErrorMessage name="password">
                        {msg => (
                          <div className="text-danger small mt-1">{msg}</div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="form-label">
                        Подтвердите пароль
                      </label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Повторите пароль"
                        disabled={isLoading}
                      />
                      <ErrorMessage name="confirmPassword">
                        {msg => (
                          <div className="text-danger small mt-1">{msg}</div>
                        )}
                      </ErrorMessage>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 mb-3"
                      disabled={isLoading || isSubmitting || !isValid || !dirty}
                    >
                      {isLoading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Регистрация...
                        </>
                      ) : (
                        'Зарегистрироваться'
                      )}
                    </button>

                    <div className="text-center">
                      <span className="text-muted">Уже есть аккаунт? </span>
                      <Link to="/login" className="text-decoration-none">
                        Войти
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default SignupPage;
