import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return(
        <div className='text-muted'>
            <div 
                className='d-flex justify-content-center p-1'
                style={{backgroundColor:'#000000'}}>
                <NavLink to='/'><h5 className='text-muted'>Gameboard</h5></NavLink>
            </div>
            <div className='container'>
                <div className='d-flex justify-content-between px-2'>
                    <div><h5>{props.gameId}</h5></div>
                    <div><h5>{props.username}</h5></div>
                </div>
            </div>
        </div>
    );
}

export { Header }