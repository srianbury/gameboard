import React from 'react';
import { Redirect } from 'react-router-dom';
import { FinalResults } from './Components/Playarea/Views';


export default class EndGame extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            playAgain: false
        };
    }

    render(){
        if(this.state.playAgain){
            return( <Redirect to='/'/> );
        }
        return(
            <div>
                <div className='d-flex justify-content-end my-2'>
                    <button
                        onClick={() => this.setState({playAgain:true})}
                        className='btn btn-warning'>Play again?</button>
                </div>
                <FinalResults 
                    userId={this.props.userId}
                    players={this.props.players} />
            </div>
        );
    }
}