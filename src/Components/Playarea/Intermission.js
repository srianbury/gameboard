import React from 'react';


const AfterInputQuestionIntermission = (props) => {
    return(
        <IntermissionTemplate 
            header='Nice questions!'
            body="Let the games begin." />
    );
}

const AfterAnswersIntermission = (props) => {
    return(
        <IntermissionTemplate 
            header="Think you're funny?"
            body="We will see..." />
    );
}

const AfterPickFaveIntermission = (props) => {
    return(
        <IntermissionTemplate 
            header="Let's see what everyone thought" />
    );
}

const NextRoundIntermission = (props) => {
    return(
        <IntermissionTemplate 
            header='Get ready for the next round'
            image='https://media.giphy.com/media/xULW8OB67sl1MTjH32/giphy.gif' />
    );
}

const BeforeFinalResults = (props) => {
    return(
        <IntermissionTemplate 
            header='Calculating the final results'
            image='https://media.giphy.com/media/Y6Hj3kY0d8OYw/giphy.gif'/>
    );
}

const IntermissionTemplate = (props) => {
    // off centered because of existing text/divs
    const style = 'text-center py-2';
    const anims = [
        'bounceOut',
        'bounceOutDown',
        'bounceOutLeft',
        'bounceOutUp',
        'fadeOutUpBig',
        'flipOutX',
        'rotateOutUpLeft',
        'rotateOutUpRight',
        'slideOutUp',
        'slideOutDown',
        'slideOutLeft',
        'slideOutRight',
        'zoomOut',
        'zoomOutUp',
        'zoomOutDown',
        'zoomOutLeft',
        'zoomOutRight',
        'hinge'
    ];
    
    return(
        <div>
            {props.header &&
                <div className={style}>
                    <h2 className={`animated ${anims[Math.floor(Math.random()*anims.length)]} delay-2s text-info`}>{props.header}</h2>
                </div>}
            {props.body &&
                <div className={style}>
                    <h5>{props.body}</h5>
                </div>}
            {props.image &&
                <div className={style}>
                    <img 
                        src={props.image}
                        alt='gif4u'
                        className='img-fluid' />
                </div>}
        </div>
    );
}

export { 
    AfterInputQuestionIntermission, 
    AfterAnswersIntermission, 
    AfterPickFaveIntermission,
    NextRoundIntermission,
    BeforeFinalResults
}