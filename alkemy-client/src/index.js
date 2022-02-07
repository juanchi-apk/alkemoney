import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import {store} from './store/store';
import { Provider } from 'react-redux';
import Navbar from './navbar/Navbar';
import Dashboard from './Dashboard/Dashboard';

  
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar/>

        <Routes>
          <Route exact path="/" element={<App/>}/>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      
    </BrowserRouter>
 
  </Provider>
,
  document.getElementById('root')
);
