import React from 'react';
import { Redirect } from 'react-router-dom';
import {  getPlayers } from './socketConnect';

export default class Lobby extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: false,
        };
    }

    componentDidMount(){
        getPlayers(this.props.gameId);
    }

    render(){
        if(this.state.error){ return(<Redirect to='/error' />); }

        // const anims = ['heartBeat', 'jello', 'wobble', 'tada', 'swing', 'shake', 'bounce', 'flash', 'pulse', 'rubberBand'];
        const players = this.props.players || [];
        return(
            <div id='lobby-container'>
                <h3>Welcome to the Lobby</h3>
                <h5>Currently in the lobby:</h5>
                {players.map((player, index) => 
                <div key={player.id}>
                    <h2 
                        className={(index===players.length-1) && 'animated bounceInUp'}>
                        {player.username}</h2>
                </div>)}
                {this.props.starter &&
                <div style={{marginTop:'2em'}}>
                    <h6 className='d-flex justify-content-center'>
                        With great power comes great responsibility
                    </h6>
                    <div className='d-flex justify-content-center'>
                        <button 
                            onClick={() => this.props.startGame('inputQuestions')}
                            className='btn btn-warning py-2'>
                            Click this once everyone is in the lobby!
                        </button>
                    </div>
                </div>}
                <div className='text-center py-2'>
                    <img 
                        src='https://media.giphy.com/media/26DNhSJnqWFdgPgMo/giphy.gif'
                        alt='doggo'
                        className='img-fluid' />

                </div>
            </div>
        );
    }
}
