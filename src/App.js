import React from 'react';
import BirthDayForm from './component/birthdayComponent.jsx'
import TemplateForm from './component/templateComponent.jsx'
import './App.css';
import Navbar from './component/Navbar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <div className='global_section'>
                <Routes>
                    <Route path='/' exact element={<BirthDayForm/>} />
                    <Route path='/template' element={<TemplateForm/>} />
                </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;