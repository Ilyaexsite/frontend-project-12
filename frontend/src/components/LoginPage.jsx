import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Alert, Spinner } from 'react-bootstrap'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Имя пользователя должно быть не менее 3 символов')
      .max(20, 'Имя пользователя должно быть не более 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(1, 'Пароль должен быть не менее 1 символа')
      .required('Обязательное поле'),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    setError('')
    setIsLoading(true)
    const result = await login(values.username, values.password)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.message || 'Ошибка авторизации');
    }
    setIsLoading(false)
    setSubmitting(false)
  }

  const handleAdminLogin = (setFieldValue) => {
    setFieldValue('username', 'admin')
    setFieldValue('password', 'admin')
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Вход в чат</h2>
              
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
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Имя пользователя
                      </label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        placeholder="Введите имя пользователя"
                        disabled={isLoading}
                      />
                      <ErrorMessage name="username" component="div" className="text-danger small mt-1" />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">
                        Пароль
                      </label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Введите пароль"
                        disabled={isLoading}
                      />
                      <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 mb-3"
                      disabled={isLoading || isSubmitting}
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
                          Вход...
                        </>
                      ) : (
                        'Войти'
                      )}
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={() => handleAdminLogin(setFieldValue)}
                      disabled={isLoading}
                    >
                      Использовать тестовые данные (admin/admin)
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="text-center mt-4">
                <p className="text-muted small mb-0">
                  Для тестирования используйте:<br />
                  Имя пользователя: <strong>admin</strong><br />
                  Пароль: <strong>admin</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
