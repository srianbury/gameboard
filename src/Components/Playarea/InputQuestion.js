import React from 'react';
import { createQuestion } from '../../ApiHandler/FetchHandler';
import { baseUrl } from '../../ApiHandler/EndPoints';
import { Response } from '../Responses/Response';

export default class InputQuestion extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            question: '',
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

    insertQuestionIntoDb = () => {
        if(!this.state.question){
            this.setState({valid:false});
            return;
        }
        const data = {
            gameId:this.props.gameId,
            question:this.state.question,
            userId:this.props.userId
        };
        createQuestion(data, res => this.setState({success:res}));
    }

    addBlank = () => {
        const b = '______';
        if(this.state.question.length===0){
            this.setState({question:b});
        }else{
            const blank = (this.state.question.slice(-1) === ' ') ? b : (' ' + b);
            const newText = this.state.question+blank;
            this.setState({question: newText});
        }
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
        if(this.state.success===null){  
            return(
                <div>
                    <div className='d-flex justify-content-center'>
                        <h4>Add a question for everyone to answer</h4>
                    </div>
                    <div>
                        <textarea 
                            id='question'
                            type='text'
                            rows='3'
                            maxLength='255'
                            value={this.state.question}
                            onChange={this.handleChange}
                            placeholder='Enter your question'
                            className={this.state.valid ? 'form-control' : 'form-control is-invalid'}
                            style={{fontWeight:'bold'}} />
                        {!this.state.valid && <div className='invalid-feedback'>
                            Gotta add a little bit of text
                        </div>}
                    </div>
                    <div className='d-flex justify-content-between py-2'>
                        <button className='btn btn-info w-50 py-2' onClick={this.insertQuestionIntoDb}>
                            Add question
                        </button>
                        <button className='btn btn-secondary py-2' onClick={this.addBlank}>
                            Add blank
                        </button>
                    </div>
                </div>
            );
        }
        else {
            const resheader = this.state.success ? 'Success!' : 'Whoops...';
            const resMessage = this.state.success ? '' : 'There was an issue adding your question.';
            return(
                <Response 
                    status={this.state.success}
                    header={resheader}
                    message={resMessage}
                    image='https://media.giphy.com/media/l0MYBzykeuHzLef3G/giphy.gif'
                    author='Karo Rigaud'
                    source='GIPHY' />
            );
        }
    }
}