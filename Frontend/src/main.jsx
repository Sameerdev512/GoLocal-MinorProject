import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Utility/App.jsx'
import { Provider } from 'react-redux'
import Store from './redux/Store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
    <App />
    </Provider>
  </StrictMode>,
)