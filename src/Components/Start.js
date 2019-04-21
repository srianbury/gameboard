import React from 'react';
import { Redirect } from 'react-router-dom';
import { baseUrl, getGameIdUrl, createGameUrl, createPlayerUrl } from '../ApiHandler/EndPoints';
import { Error } from '../Components/Error';
const blankGameIdMsg = 'Gotta have a Game ID';

export default class Start extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            new: false,
            gameId: this.props.gameId || '',
            username: '',
            redirectToPlayarea: null,
            gameIdIsInvalid: false,
            gIdInvalidMsg: blankGameIdMsg,
            usernameIsInvalid: false,
            loadingPlay: false,
            getGameIdError: false,
            loadingGameID: false
        };
    }

    getGid = () => {
        if(this.state.getGameIdError){ this.setState({getGameIdError:false}); }
        if(!this.state.new){
            this.setState({loadingGameID:true});
            fetch(baseUrl+getGameIdUrl)
            .then(res => res.json())
            .then(data => this.setState({gameId:data['gameId'], new:true, loadingGameID:false}))
            .catch(()=>this.setState({getGameIdError:true, loadingGameID:false}));
        }
    }

    join = () => {
        this.setState({getGameIdError:false});
        if(this.state.new){
            this.setState({
                gameId: '',
                new: false
            });
        }
    }

    handleChange = (e) => {
        let change = {};
        change[e.target.id] = e.target.value;
        if(e.target.id==='gameId'){
            change['gameIdIsInvalid'] = false;
        }
        if(e.target.id==='username'){
            change['usernameIsInvalid'] = false;
        }   
        this.setState(change);
    }

    startGame = () => {

        if((this.state.gameId.trim()==='') || (this.state.username.trim()==='')){
            this.setState({
                gameIdIsInvalid: (this.state.gameId.trim()===''),
                usernameIsInvalid: (this.state.username.trim()===''),
                gIdInvalidMsg: blankGameIdMsg
            });
            return;
        } else{
            this.setState({loadingPlay:true});
            const url = baseUrl + (this.state.new ? createGameUrl : createPlayerUrl);
            fetch(url, {
                'method':'POST',
                'body': JSON.stringify({gameId:this.state.gameId.toLowerCase().trim(), username:this.state.username.trim()})
            })
            .then(res => res.json())
            .then(data => {
                if('error' in data){
                    this.setState({gameIdIsInvalid:true, gIdInvalidMsg:data['error'], loadingPlay:false});
                } else{
                    this.setState({userId:data['userId'], redirectToPlayarea:true});
                }
            })
            .catch(() => this.setState({redirectToPlayarea:false}));
        }
    }

    render(){
        if(this.state.redirectToPlayarea!==null){
            if(this.state.redirectToPlayarea){
                return (
                    <Redirect 
                        to={{
                            pathname:`/play/${this.state.gameId.toLowerCase().trim()}`,
                            state: { 
                                username: this.state.username, 
                                starter:this.state.new, 
                                userId:this.state.userId,
                                gameId:this.state.gameId
                            }
                        }}/>
                );
            } else { return ( <Error /> ); }
        }

        return(
            <div>
                <h1>Welcome to gameboard!</h1>
                {this.state.getGameIdError &&
                <p className='text-danger'>Could not get a new Game ID.</p>}
                <div className='d-flex justify-content-between my-3'>
                <Button
                        onClick={this.getGid}
                        className='btn btn-lg btn-primary'>
                        {this.state.loadingGameID ? (
                            <div className='spinner-border' role='status'>
                                <span className='sr-only'>Loading...</span>
                            </div>
                        ): 'New Game'}
                    </Button>
                    <Button
                        onClick={this.join}
                        className='btn btn-lg btn-primary'>
                        Join
                    </Button>
                </div>
                <InputArea 
                    title='Game ID'
                    id='gameId'
                    maxLength='5'
                    disabled={this.state.new}
                    value={this.state.gameId}
                    onChange={this.handleChange}
                    invalid={this.state.gameIdIsInvalid}
                    invalidMessage={this.state.gIdInvalidMsg} />
                <InputArea 
                    title='Username'
                    id='username'
                    maxLength='31'
                    disabled={false}
                    value={this.state.username}
                    onChange={this.handleChange}
                    invalid={this.state.usernameIsInvalid}
                    invalidMessage='Please enter a username'/>
                <div className='my-3'>
                    <Button
                        onClick={this.startGame}
                        className='btn btn-warning btn-lg'>
                        {this.state.loadingPlay ? (
                            <div className='spinner-border' role='status'>
                                <span className='sr-only'>Loading...</span>
                            </div>
                        ) : 'Play!'}
                    </Button>
                </div>
            </div>
        );
    }
}

const Button = (props) => {
    return(
        <button
            onClick={props.onClick}
            className={props.className}>
            {props.children}
        </button>
    );
}

const InputArea = (props) => {
    return(
        <div className='my-2'>
            <h5>{props.title}</h5>
            <input
                id={props.id}
                maxLength={props.maxLength}
                disabled={props.disabled}
                value={props.value} 
                onChange={props.onChange}
                autoComplete='off'
                className={`form-control ${props.invalid && 'is-invalid'}`}
                style={{fontWeight:'bold'}} />
            {props.invalid && 
                <div className='invalid-feedback'>{props.invalidMessage}</div>}
        </div>
    );
}
