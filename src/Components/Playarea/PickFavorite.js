import React from 'react';
import { Response } from '../Responses/Response';
import { updateScores } from '../../ApiHandler/FetchHandler';
import { baseUrl } from '../../ApiHandler/EndPoints';


export default class PickFavorite extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            success: null
        };
    }

    handleFaveClick = (owner) => {
        const data = {
            gameId: this.props.gameId,
            userId: owner
        };
        updateScores(data,  res => this.setState({success:res}));
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
        const answersWithoutUser = this.props.answers.filter(answer => answer.owner!==this.props.userId);

        if(this.state.success===null){
            return(
                <div>
                    <h4 className='my-2'>
                        {this.props.question}
                    </h4>
                    <div className='py-2 w-100'>
                        {answersWithoutUser.map(ans =>
                            <button 
                                key={ans.owner}
                                className='btn btn-outline-success btn-lg my-2 w-100'
                                onClick={() => this.handleFaveClick(ans.owner)}>
                                    {ans.answer}
                            </button>
                        )}
                    </div>
                </div>
            );
        }
        else{
            const resheader = this.state.success ? 'Success!' : 'Whoops...';
            const resMessage = this.state.success ? 'May the votes be ever in your favor' : 'There was an issue adding your answer.';
            return(
                <Response 
                    status={this.state.success}
                    header={resheader}
                    message={resMessage}
                    image='https://media.giphy.com/media/l0HlyONUJlDBrv6iQ/giphy.gif'
                    author='joelplosz'
                    source='GIPHY' />
            );
        }
        
    }
}

// Another good analyzing results animation https://media.giphy.com/media/l0HlyONUJlDBrv6iQ/giphy.gif