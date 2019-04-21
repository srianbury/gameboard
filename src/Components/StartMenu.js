import React from 'react';
import Status from './Status';
import { Redirect } from 'react-router-dom';
import { baseUrl as endpoint } from '../ApiHandler/EndPoints'; 

const urlGameId = '/api/get/gameId';
const urlNewGame = '/api/create/newGame';
const urlAddPlayer = '/api/create/player';

export default class StartMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gameId: '',
            username: '',
            userId: '',
            error: null,
            notFound: false,
            redirectToPlayarea: null,
            gIdBlank: false,
            uIdBlank: false
        }
    }

    getNewGameId = () => {
        fetch(endpoint+urlGameId)
        .then(res => res.json())
        .then(data => this.setState({gameId:data['gameId']}))
        .catch(() => this.setState({error: <Status color='#ff6363' message=' Could not make a new game, please see if someone else can start the lobby.' />}));
    }

    componentDidMount(){
        if(this.props.newGame){
            this.getNewGameId();
        } 
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.newGame && !this.props.newGame){
            this.setState({gameId:null}); //new to join, clear the game id field
        }

        if(!prevProps.newGame && this.props.newGame){
            this.getNewGameId(); //join to new, get a new gameID
        }
    }

    handleChange = (e) => {
        let change = {};
        change[e.target.id] = e.target.value;
        if(e.target.id==='gameId'){
            change['gIdBlank'] = false;
            change['notFound'] = false;
        }
        if(e.target.id==='username'){
            change['uIdBlank'] = false;
        }
        this.setState(change);
    }

    // create a new collection and add the player to the db
    createNewGame = () => {
        fetch(endpoint+urlNewGame, {
            'method':'POST',
            'body': JSON.stringify({gameId:this.state.gameId.trim(), username:this.state.username.trim()})
        })
        .then(res => res.json())
        .then(data => {
            if('alreadyExists' in data){
                this.setState({notFound:data['alreadyExists']});
            } else if('notFound' in data){
                this.setState({notFound:data['notFound']});
            } else{
                this.setState({userId:data['userId'], redirectToPlayarea:true});
            }            
        })
        .catch(() => { this.setState({redirectToPlayarea:false}) });
    }

    joinGame = () => {
        this.setState({
            notFound: (<div className='animated infinite pulse'>Joining game...</div>)
        });
        fetch(endpoint+urlAddPlayer, {
            'method':'POST',
            'body': JSON.stringify({gameId:this.state.gameId.trim(), username:this.state.username.trim()})
        })
        .then(res => res.json())
        .then(data => {
            if('notFound' in data){
                this.setState({ notFound: <div className='text-danger'>{data['notFound']}</div> });
            } else{
                const userId = data['userId'];
                this.setState({userId:userId, redirectToPlayarea:true});
            }
        })
        .catch(() => { this.setState({redirectToPlayarea:false}) });
    }

    insertGameIdIntoDb = () => {
        if(this.state.gameId.trim() && this.state.username.trim()){
            if(this.props.newGame){ this.createNewGame(); } 
            else { this.joinGame(); }
        } else{
            this.setState({
                gIdBlank: !this.state.gameId.trim(),
                uIdBlank: !this.state.username.trim()
            })
        }
        
    }

    render(){
        if(this.state.redirectToPlayarea!==null){
            if(this.state.redirectToPlayarea){
                return (
                    <Redirect 
                        to={{
                            pathname:`/${this.state.gameId}/play`,
                            state: { 
                                username: this.state.username, 
                                starter:this.props.newGame, 
                                userId:this.state.userId,
                                gameId:this.state.gameId
                            }
                        }}/>
                );
            } else { return ( <Redirect to='/error' /> ); }
        }

        if(!this.state.gameId && this.props.newGame){
            return( <div>Getting your game ID!</div>);
        }

        return(
            <div>
                {this.state.error}
                {this.state.notFound}
                <div className={this.state.gIdBlank ? 'form-group has-danger py-2' : 'py-2'}>
                    <h6>Game ID</h6>
                    <input 
                        id='gameId'
                        maxLength='5'
                        type='text'
                        value={this.state.gameId}
                        onChange={this.handleChange}
                        placeholder='Enter your game ID'
                        className={this.state.gIdBlank ? 'form-control is-invalid': 'form-control'}
                        autoComplete='false'
                        disabled={this.props.newGame}
                        style={{fontWeight:'bold'}} />
                    {this.state.gIdBlank && <div className='invalid-feedback'>
                        Please enter a gameId
                    </div>}
                </div>
                <div className={this.state.uIdBlank ? 'form-group has-danger py-2' : 'py-2'}>
                    <h6>Pick a username!</h6>
                    <input 
                        id='username'
                        type='text'
                        value={this.state.username || ''}
                        onChange={this.handleChange}
                        placeholder='Username'
                        autoComplete='false'
                        className={this.state.uIdBlank ? 'form-control is-invalid': 'form-control'}
                        style={{fontWeight:'bold'}} />
                    {this.state.uIdBlank && <div className='invalid-feedback'>
                        Please enter a username
                    </div>}
                </div>
                <div className='py-2'>
                    <button className='btn btn-lg btn-primary' onClick={this.insertGameIdIntoDb}>
                        Play!
                    </button>
                </div>
            </div>
        );
    }
}