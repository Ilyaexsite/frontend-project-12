import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ErrorBoundary } from '@rollbar/react'
import store from './store/index.js'
import resources from './locales/index.js'
import App from './App'
import { setTranslator } from './utils/translator.js'
import { FilterProvider } from './utils/context/FilterContext.jsx'
import { initializeSocket } from './socket/index.js'

const init = async () => {
  const i18n = i18next.createInstance()

  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
    environment: import.meta.env.MODE,
  }

  const state = store.getState()
  const { currentLanguage } = state.language

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
    lng: currentLanguage,
  })

  setTranslator(i18n.t)

  // Инициализируем сокеты после настройки i18n
  initializeSocket(i18n)

  return (
    <ErrorBoundary config={rollbarConfig}>
      <Provider store={store}>
        <FilterProvider>
          <I18nextProvider i18n={i18n}>
            <App />
            <ToastContainer />
          </I18nextProvider>
        </FilterProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default init
