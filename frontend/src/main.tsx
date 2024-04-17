import React from 'react'
import ReactDOM from 'react-dom/client'
import {MainPage} from "./components/pages/MainPage.tsx";
import './index.css'

/**
 * Hier ist quasi der entry-point für ein React Projekt
 *
 * Die App.css und App.tsx file brauchen wir btw. nicht. Die werden nur standardmäßig beim Generieren von einem
 * React Projekt erstellt und als Beispiel verwendet.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <MainPage/>
  </React.StrictMode>,
)
