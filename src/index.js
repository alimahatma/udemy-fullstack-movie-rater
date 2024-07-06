import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Auth from './components/auth';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const TokenContext = createContext(null);

function Router() {

  const [token, setToken] = useState('');

  return (
    <TokenContext.Provider value={{token, setToken}}>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' Component={Auth} />
            <Route exact path='/movies' Component={App} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </TokenContext.Provider>

  )

}

root.render(<Router />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
