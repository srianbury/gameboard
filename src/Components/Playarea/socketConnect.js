import socketIOClient from 'socket.io-client';
import { baseUrl as endpoint } from '../Connect';
// const endpoint = 'http://10.0.1.16:8080';
let socket;


function subscribeToJoinGame(gameId, cb){
    //
}


function getPlayers(gameId){
    socket.emit('get-players', {gameId: gameId});
}


function initGameState(gameId, lsPlayersCB, timerCB, gameStateCB){ 
    socket = socketIOClient(endpoint);
    socket.on('list-players', pData => lsPlayersCB(pData));
    socket.on('timer', t => timerCB(t));
    socket.on('game-state', gsVal => {
        gameStateCB(gsVal);
    });
    socket.emit('join-game', {gameId: gameId});
    //socket.emit('init-game-state', {gameId:gameId});
}


function updateGameState(gameId, newGameState){
    socket.emit('update-game-state', {gameId:gameId, newGameState:newGameState});
}


function startGame(gameId){
    socket.emit('start-playing', {gameId:gameId});
}


export { subscribeToJoinGame, initGameState, updateGameState, startGame, getPlayers };