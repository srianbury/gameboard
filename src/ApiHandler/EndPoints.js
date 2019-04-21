const prod = true;
const baseUrl = prod ? 'https://gameboard-238222.appspot.com' : 'http://10.0.1.16:8080';
const getGameIdUrl = '/api/get/gameId';
const createGameUrl = '/api/create/newGame';
const createPlayerUrl = '/api/create/player';

export { baseUrl, getGameIdUrl, createGameUrl, createPlayerUrl };