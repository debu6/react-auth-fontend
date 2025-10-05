import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/login';
import SignUp from './pages/signup';
import HomePage from './pages/HomePage';



function App() {
 



  return (
    <div >
      <Router>
      <Routes>
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes> 
      </Router>
    </div>
  );
}

export default App;
