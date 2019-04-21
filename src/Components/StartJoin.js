import React from 'react';

export default class StartJoin extends React.Component{
    render(){
        return(
            <div className='d-flex justify-content-between py-2'>
                <button className='btn btn-lg btn-primary' onClick={() => this.props.onClick('new')}>Start a new game!</button>
                <button className='btn btn-lg btn-primary' onClick={() => this.props.onClick('join')}>Join a game!</button>
            </div>
        );
    }
}