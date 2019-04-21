import React from 'react';
import { createAnswer } from '../../ApiHandler/FetchHandler';
import { baseUrl } from '../../ApiHandler/EndPoints';
import { Response } from '../Responses/Response';


export default class AnswerQuestion extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            answer: '',
            valid: true,
            success: null
        };
    }

    handleChange = (e) => {
        let change = {};
        change[e.target.id] = e.target.value;
        change['valid'] = true;
        this.setState(change);
    }

    insertAnsIntoDb = () => {
        if(!this.state.answer){
            this.setState({valid:false});
            return;
        }
        const data = {
            gameId: this.props.gameId,
            answer: this.state.answer,
            userId: this.props.userId
        };
        createAnswer(data, response => this.setState({success:response}));
    }

    componentDidMount(){
        const data = {
            gameId: this.props.gameId,
            userId: this.props.userId
        }
        fetch(`${baseUrl}/api/isFinished`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => data['finished'] && this.setState({success:true}))
        .catch(() => this.setState({success:false}));
    }

    render(){
        const style='d-flex justify-content-center py-2';
        if(this.state.success===null){
            return(
                <div>
                    <div className='pt-1'>
                        <h4>{this.props.question}</h4>
                    </div>
                    <div className={style}>
                        <textarea 
                            id='answer'
                            type='text'
                            rows='3'
                            maxLength='255'
                            value={this.state.answer}
                            onChange={this.handleChange}
                            placeholder='Enter your answer'
                            className={this.state.valid ? 'form-control' : 'form-control is-invalid'}
                            style={{fontWeight:'bold'}} />
                        {!this.state.valid && <div className='invalid-feedback'>
                            Gotta add a little bit of text
                        </div>}
                    </div>
                    <div className='py-2'>
                        <button className='btn btn-info w-50 py-2' onClick={this.insertAnsIntoDb}>
                            Add your answer!
                        </button>
                    </div>
                </div>
            );
        }
        else{
            const resheader = this.state.success ? 'Success!' : 'Whoops...';
            const resMessage = this.state.success ? '' : 'There was an issue adding your question :(';
            return(
                <Response 
                    status={this.state.success}
                    header={resheader}
                    message={resMessage}
                    image='https://media.giphy.com/media/3ohzgD1wRxpvpkDCSI/giphy.gif'
                    author='Chris Gannon'
                    source='GIPHY' />
            );
        }
        
    }
}