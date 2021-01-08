import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Field from '../Field/Field';
import './App.sass';

const App = () => (
    <div className="app">
        <BrowserRouter>
            <Route path='/' exact component={Field} />
            <Route path='/:id' exact component={Field} />
        </BrowserRouter>
    </div>
);

export default App;
