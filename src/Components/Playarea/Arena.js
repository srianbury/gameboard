import React from 'react';
import InputQuestion from './InputQuestion';
import AnswerQuestion from './AnswerQuestion';
import PickFavorite from './PickFavorite';
import { 
    AfterInputQuestionIntermission, 
    AfterAnswersIntermission,
    AfterPickFaveIntermission,
    NextRoundIntermission,
    BeforeFinalResults 
} from '../Playarea/Intermission';
import { RoundResults } from '../Playarea/Views';
import { Error } from '../Error';

export default class Arena extends React.Component{
    render(){
        let view;
        const playState = this.props.playState;

        if(!playState){
            view = (
                <div>
                    <p>Loading...</p>
                    <div className='spinner-border' role='status'>
                        <span class='sr-only'>Loading...</span>
                    </div>
                </div>
            );
        }
        else if(playState==='inputQuestions'){
            view = (<InputQuestion 
                    gameId={this.props.gameId}
                    userId={this.props.userId} />);
        } else if(playState==='afterQuestionIntermission'){
            view = (<AfterInputQuestionIntermission />);
        } else if(playState==='answerQuestion'){
            view = (<AnswerQuestion
                    gameId={this.props.gameId}
                    question={this.props.question}
                    userId={this.props.userId} />);
        } 
        else if(playState==='afterAnswerIntermission'){
            view = (<AfterAnswersIntermission />);
        }
        else if(playState==='pickFavoriteAnswer'){
            view = (<PickFavorite
                    question={this.props.question}
                    gameId={this.props.gameId}
                    userId={this.props.userId}
                    answers={this.props.answers} />);
        }
        else if(playState==='afterPickIntermission'){
            view = (<AfterPickFaveIntermission />);
        } 
        else if(playState==='roundResults'){
            view = (<RoundResults 
                    question={this.props.question}
                    answers={this.props.answers}
                    players={this.props.players} />);
        } 
        else if(playState==='nextRound'){
            view = (<NextRoundIntermission />);
        }
        else if(playState==='beforeFinalIntermission'){
            view = (<BeforeFinalResults />);
        } 
        else { view = (<Error />); }

        return(
            <div>
                <div>
                    <h3>{this.props.timer}</h3>
                </div>
                <div>{view}</div>
            </div>
        );
    }
}
