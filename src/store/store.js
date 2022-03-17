import { applyMiddleware, createStore } from 'redux';
import throttle from 'lodash/throttle';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { loadState, saveState } from './storage';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware =
    process.env.NODE_ENV === 'production'
        ? applyMiddleware(thunk)
        : applyMiddleware(thunk, require('redux-logger').logger);

const persistedState = loadState();

const store = createStore(
    reducers,
    persistedState,
    composeWithDevTools(middleware)
);

//Use throttle to ensure state doesn't get saved faster than 1s.
store.subscribe(
    throttle(() => {
        const state = store.getState();
        saveState(state);
    }, 1000)
);

export default store;
