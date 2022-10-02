import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails);
    yield takeEvery('SAGA_SEARCH_MOVIES', searchMovieAPI);
    yield takeEvery('SAGA_ADD_TO_MOVIES', addToMovies);
    yield takeEvery('SAGA_FETCH_GENRES', fetchGenres);
}


function* fetchGenres() {
    try {
        // FETCH GENRES
        const genres = yield axios.get('/api/genre')
        // FILL GENRE REDUCER
        yield console.log(genres);
        yield put({
            type: 'SET_GENRES',
            payload: genres.data
        })
    }
    catch (error) {
        console.log('Error in Getting Genres:', error);
    }
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }

}

function* addToMovies(action) {
    try {
        yield axios({
            method: 'POST',
            url: '/api/movie',
            data: action.payload
        })
        yield put({
            type: 'FETCH_MOVIES'
        })
    }
    catch (error) {
        console.log('ERROR in POST new MOVIE:', error);
    }
}

function* fetchMovieDetails(action) {

    try {
        console.log('AP IS CURRENTLY:', action.payload)
        const movieID = action.payload;
        const moviedetailsRes = yield axios({
            method: 'GET',
            url: `/api/movie/${movieID}`
        })
        yield put({
            type: 'SET_MOVIE_DETAILS',
            payload: moviedetailsRes.data
        })
        yield put({
            type: 'SET_GENRES',
            payload: moviedetailsRes.data.genres
        })
    } catch (error) {
        console.log('Error in fetching Details', error);
    }
}


function* searchMovieAPI(action) {
    // action.payload should be a string
    const search = action.payload;
    console.log('Search Query:', search);

    try {
        const searchRes = yield axios({
            method: 'GET',
            url: `/search/${search}`
        })
        yield put({
            type: 'SET_SEARCH_RESULTS',
            payload: searchRes.data
        })
    } catch (error) {
        console.log('Error in Movie API GET:', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const moviedetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload;
        case 'CLEAR_MOVIE_DETAILS':
            return {};
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const searchResults = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        moviedetails,
        searchResults,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
