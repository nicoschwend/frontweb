import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './Routing.jsx'
import AuthProvider from '../auth/AuthProvider.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>  
    <Routing />
  </AuthProvider>
  </React.StrictMode>,
);
