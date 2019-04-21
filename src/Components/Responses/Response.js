import React from 'react';

const Response = (props) => {
    const headerClass = props.status ? 'text-success' : 'text-danger';
    const style = 'text-center py-2';
    return(
        <div>
            <div className={style}>
                <h2 className={headerClass}>{props.header}</h2>
            </div>
            {!props.status && <div className={style}>
                <h5>{props.message}</h5>
            </div>}
            <div className={style}>
                <h5 className='animated infinite pulse'>
                    Just waiting on the others :)
                </h5>
            </div>
            {props.image && <div>
                <div className={style}>
                    <img 
                        src={props.image}
                        alt='gif4u'
                        className='img-fluid' />
                </div>
                <p className='text-muted'>
                    <small>via {props.author} on {props.source}</small>
                </p>
            </div>}
        </div>
    );
}

export { Response }