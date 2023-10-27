import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago'
import { UsernameProvider } from './context/username-context.jsx';
import { TopicProvider } from './context/topic-context.jsx'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TopicProvider>
        <UsernameProvider>
          <App />
        </UsernameProvider>
      </TopicProvider>
    </BrowserRouter>
  </React.StrictMode>
)
