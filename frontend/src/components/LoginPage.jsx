import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Имя пользователя должно быть не менее 3 символов')
      .max(20, 'Имя пользователя должно быть не более 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Пароль должен быть не менее 6 символов')
      .required('Обязательное поле'),
  })

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Форма отправлена:', values)
    setSubmitting(false)
    navigate('/')
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Вход в чат</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="username">Имя пользователя</label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Введите имя пользователя"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
              <ErrorMessage name="username" component="div" style={{ color: 'red', fontSize: '12px' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="password">Пароль</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Введите пароль"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '12px' }} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {isSubmitting ? 'Вход...' : 'Войти'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginPage
