import React from 'react';

const Error = (props) => {
    return(
        <div className='d-flex justify-content-center'>
            <h3 className='text-danger'>
                {props.message ? props : 'Whoops... Something went wrong'}
            </h3>
        </div>
    );
}

export { Error };