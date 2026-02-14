import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Container, Card, Alert, Spinner } from 'react-bootstrap';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, t('auth.errors.usernameLength'))
      .max(20, t('auth.errors.usernameLength'))
      .required(t('auth.errors.usernameRequired')),
    password: Yup.string()
      .min(1, t('auth.errors.passwordRequired'))
      .required(t('auth.errors.passwordRequired')),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError('');
    setIsLoading(true);
    
    const result = await login(values.username, values.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(t('auth.errors.invalidCredentials'));
    }
    
    setIsLoading(false);
    setSubmitting(false);
  };

  return (
    <Container className="mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <Card className="shadow">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4">{t('auth.login')}</h2>
              
              {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )}

              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, isValid, dirty }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        {t('auth.username')}
                      </label>
                      <Field
                        innerRef={usernameRef}
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder={t('auth.usernamePlaceholder')}
                        disabled={isLoading}
                      />
                      <ErrorMessage name="username">
                        {msg => (
                          <div className="text-danger small mt-1">{msg}</div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">
                        {t('auth.password')}
                      </label>
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder={t('auth.passwordPlaceholder')}
                        disabled={isLoading}
                      />
                      <ErrorMessage name="password">
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
                          {t('auth.loginLoading')}
                        </>
                      ) : (
                        t('auth.loginButton')
                      )}
                    </button>

                    <div className="text-center">
                      <span className="text-muted">{t('auth.noAccount')} </span>
                      <Link to="/signup" className="text-decoration-none">
                        {t('auth.signupButton')}
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

export default LoginPage;
