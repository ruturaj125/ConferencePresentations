import React from  'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Presentations from './components/Presentations';
import AddPresentation from './components/AddPresentation';
import EditPresentation from './components/EditPresentation';

export default function RouterContainer(){
    
    return(
        <Router>
            <Routes>
                <Route exact path='/login' element={ <Login /> } />
                <Route path='/registration' element={ <Registration /> } />                
                <Route path='/' element={ <Presentations /> } />  
                <Route path='/add' element={ <AddPresentation /> } />   
                <Route path='/edit/:id' element={ <EditPresentation /> } />                
            </Routes>
        </Router>
    )
}