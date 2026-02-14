import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSignupMutation } from '../store/api/authApi';
import { useAuth } from '../contexts/AuthContext';
import { Container, Card, Alert, Spinner } from 'react-bootstrap';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();
  const [signup, { isLoading }] = useSignupMutation();
  const [error, setError] = useState('');
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
      .min(6, t('auth.errors.passwordMin'))
      .required(t('auth.errors.passwordRequired')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('auth.errors.passwordMatch'))
      .required(t('auth.errors.passwordRequired')),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError('');
    
    try {
      const { username, password } = values;
      await signup({ username, password }).unwrap();
      
      await login(username, password);
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      if (err.status === 409) {
        setError(t('auth.errors.userExists'));
      } else {
        setError(t('auth.errors.signupError'));
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
              <h2 className="text-center mb-4">{t('auth.signup')}</h2>
              
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

                    <div className="mb-3">
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

                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="form-label">
                        {t('auth.confirmPassword')}
                      </label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder={t('auth.confirmPasswordPlaceholder')}
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
                          {t('auth.signupLoading')}
                        </>
                      ) : (
                        t('auth.signupButton')
                      )}
                    </button>

                    <div className="text-center">
                      <span className="text-muted">{t('auth.hasAccount')} </span>
                      <Link to="/login" className="text-decoration-none">
                        {t('auth.loginButton')}
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
