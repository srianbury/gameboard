// const endpoint = 'http://127.0.0.1:8080';
import { baseUrl as endpoint } from './EndPoints'
// const endpoint = 'http://10.0.1.16:8080';
const insertQuestion = '/api/create/question';
const insertAnswer = '/api/create/answer';
const updateScoresUrl = '/api/update/scores';
const getGameIdUrl = '/api/get/gameId';


function commonGet(url, cb, err){
    fetch(url)
        .then(res => res.json())
        .then(data => cb(data))
        .catch(() => err());
}


function getGameId(cb){
    commonGet(endpoint+getGameIdUrl, cb);
}


function updateScores(data, cb){
    fetch(endpoint+updateScoresUrl, {
            'method':'POST',
            'body': JSON.stringify(data)
        })
            .then(res => {
                if(res.status===200){
                    cb(true);
                } else { cb(false); }
            })
            .catch(() => cb(false));
}

function createQuestion(data, cb){
    fetch(endpoint+insertQuestion, {
            'method':'POST',
            'body': JSON.stringify(data)
        })
            .then(res => {
                if(res.status===200){
                    cb(true);
                } else { cb(false); }
            })
            .catch(() => cb(false));
}

function createAnswer(data, cb){
    fetch(endpoint+insertAnswer, {
        'method':'POST',
        'body': JSON.stringify(data)
    })
        .then(res => {
            if(res.status===200){
                cb(true);
            } else { cb(false); }
        })
        .catch(() => cb(false));
}


export { createQuestion, createAnswer, updateScores, getGameId };