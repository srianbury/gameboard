import React from 'react';

//green: #54d88b
//red: #ff6363

export default class Status extends React.Component{
    render(){
        return (
            <div className='py-2' style={{backgroundColor:this.props.color}}>
                <div>
                    {this.props.message}
                </div>
            </div>
        );
    }
}