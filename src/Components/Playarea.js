import React from 'react';
import {  Redirect } from 'react-router-dom';
import Lobby from './Playarea/Lobby';
import Arena from './Playarea/Arena';
import { Header } from '../Components/Playarea/Header';
import { initGameState, startGame } from './Playarea/socketConnect';
import EndGame from '../EndGame';

// const playStates = ['inputQuestions', 'answerQuestion', 'pickFavoriteAnswer'];

export default class Playarea extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gameState: null,
            error: false,
            question: null,
            answers: [],
            players: [],
            timer: null
        };
    }

    componentDidMount(){
        if(this.props.location.state==null){
            return;
        }
        initGameState(
            this.props.location.state.gameId, 
            p => this.setState({players:p}),
            t => this.setState({timer:t['currentTime']}),
            gs => this.setState({
                gameState:gs['currentState'], 
                question:gs['question'], 
                answers:gs['answers'],
                players:gs['players']
            })
        );
    }

    handleStart = () => {
        //updateGameState(this.props.location.state.gameId, 'play');
        startGame(this.props.location.state.gameId);
    }

    render(){
        const playStates = [
            'inputQuestions',
            'afterQuestionIntermission',
            'answerQuestion',
            'afterAnswerIntermission',
            'pickFavoriteAnswer',
            'afterPickIntermission',
            'roundResults',
            'nextRound',
            'beforeFinalIntermission'
        ];
        if(this.props.location.state==null || this.state.error){ 
            const paths = window.location.pathname.split('/');
            const gId = paths[paths.length-1].trim();
            return(
                <Redirect 
                        to={{
                            pathname:'/',
                            state: { 
                                gameId: gId
                            }
                        }}/>
            ); 
        } //if they didn't come from the login screen

        let view;
        if(this.state.gameState===null){
            view = (
                <div>
                    <p>Getting everything ready</p>
                    <div className='spinner-border' role='status'>
                        <span className='sr-only'>Loading...</span>
                    </div>
                </div>
            );
        } 
        else {
            if(this.state.gameState==='startLobby'){
                view =  (
                    <Lobby 
                        players={this.state.players}
                        gameId={this.props.location.state.gameId}
                        starter={this.props.location.state.starter}
                        startGame={this.handleStart} />
                );
            } 
            else if(playStates.includes(this.state.gameState)){ //this.state.gameState==='inputQuestions'
                view =  (
                    <Arena 
                        question={this.state.question}
                        answers={this.state.answers}
                        players={this.state.players}
                        timer={this.state.timer}
                        playState={this.state.gameState}
                        userId={this.props.location.state.userId}
                        gameId={this.props.location.state.gameId} />
                );
            }
            else if(this.state.gameState==='finalResults'){
                view = (
                    <EndGame 
                        userId={this.props.location.state.userId}
                        players={this.state.players} />
                );
            }
            else {
                view = (
                    <div>Hm... Something went wrong...</div>
                );
            }
        }

        return(
            <div>
                <Header 
                    gameId={this.props.location.state.gameId}
                    username={this.props.location.state.username} />
                <div className='container'>
                    <div className='p-2'>
                        {view}
                    </div>
                </div>
            </div>
        );
    }
}