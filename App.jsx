import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hashHistory } from 'react-router';
import Chat from './src/chatbot.component.jsx';
import Bot from './src/testbot.component.jsx';

render(
    <Router history={hashHistory}>
    <div>
        <Route path="/chat" component={Bot}/>
        
        </div>
</Router>,
document.getElementById('container'));