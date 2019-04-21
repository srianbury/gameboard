import React from 'react';
import Playarea from './Playarea';
import App from '../App';
import { Error } from './Error'; //Error seems to be some react keyword
import { BrowserRouter, Route } from 'react-router-dom';

export default class Nav extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Route path='/' exact component={App} />                
                <Route path='/play/:gameId' component={Playarea} />
                <Route path='/error' component={Error} />
            </BrowserRouter>
        );
    }
}