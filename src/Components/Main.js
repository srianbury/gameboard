import React from 'react';
import StartJoin from './StartJoin';
import StartMenu from './StartMenu';


export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menu: null
        };
    }

    handleClick = (value) => {
        const newGame = (value==='new') ? true : false;
        this.setState({menu:<StartMenu newGame={newGame}/>});
    }

    render(){
        return (
            <div>
                <h1>Welcome to gameboard!</h1>
                <StartJoin onClick={this.handleClick}/>
                {this.state.menu}
            </div>
        );
    }
}

