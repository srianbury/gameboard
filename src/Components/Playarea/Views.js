// stateless functional components
import React from 'react';

const RoundResults = (props) => {
    const answersOrdered = props.answers.sort((a, b) => parseInt(b.score) - parseInt(a.score));
    const playersOrdered = props.players.sort((a,b) => parseInt(b.score) - parseInt(a.score));
    const anims = ['bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp'];
    if(anims.length > answersOrdered.length){
        anims.splice(answersOrdered.length);
    }
    const bucketSize = answersOrdered.length/anims.length;

    return(
        <div>
            <h4 className='my-2'>{props.question}</h4>
            <div className='my-2 py-2'>
                <h6 className='text-muted'>Favorite Answers</h6>
                {answersOrdered.map((answer, index) => 
                    <div key={answer.owner} className={`animated
                                                        ${anims[Math.floor(index/bucketSize)]}
                                                        delay-${Math.floor((answersOrdered.length-index-1)/bucketSize)}s
                                                        d-flex justify-content-between my-2`}>
                        <h3>{answer.answer}</h3>
                        <h3>{answer.score}</h3>
                    </div>
                )}
            </div>
            <div className='mt-4 py-2'>
                <h6 className='text-info'>Current Standings</h6>
                {playersOrdered.map((player, index) => 
                    <div key={player.id} className={`animated
                                                    ${anims[Math.floor(index/bucketSize)]}
                                                    delay-${Math.floor((answersOrdered.length-index-1)/bucketSize)}s
                                                    d-flex justify-content-between my-2`}>
                        <h5 className='text-success'>{player.username}</h5>
                        <h5 className='text-success'>{player.score}</h5>
                    </div>
                )}
            </div>
        </div>
    );
}

const FinalResults = (props) => {
    const playersOrdered = props.players.sort((a,b) => parseInt(b.score) - parseInt(a.score));
    const anims = ['bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp'];
    if(anims.length > playersOrdered.length){
        anims.splice(playersOrdered.length);
    }
    const bucketSize = playersOrdered.length/anims.length;
    const highScore = playersOrdered[0].score;
    const winners = playersOrdered.filter(p => p.score===highScore).map(p => p.id);
    return(
        <div>
            <div className='py-2'>
                <h4>Final Results!</h4>
                {playersOrdered.map((player, index) => 
                    <div key={player.id} className={`animated
                                                    ${anims[Math.floor(index/bucketSize)]}
                                                    delay-${Math.floor((playersOrdered.length-index-1)/bucketSize)}s
                                                    d-flex justify-content-between my-2`}>
                        <h3>{player.username}</h3>
                        <h3>{player.score}</h3>
                    </div>
                )}
            </div>
            <div className='text-center py-2'>
                <h4>Thanks for playing!!</h4>
            </div>
            {winners.includes(props.userId) && <div className='text-center py-2'>
                <img 
                    src='https://media.giphy.com/media/fdPrizLgIwnc8dHhJR/giphy.gif'
                    alt='winner'
                    className='img-fluid' />
            </div>}
        </div>
    );
}

export { RoundResults, FinalResults }