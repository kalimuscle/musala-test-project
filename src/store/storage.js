export const LOCALSTORAGE_KEY = 'musala_store';

const initialState = {
    gateways: [],
};

const { localStorage } = window;

export const loadState = () => {
    try {
        let storedState = {};

        try {
            storedState = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
        } catch (e) {
            storedState = {};
        } finally {
            storedState = typeof storedState === 'object' ? storedState : {};
        }

        const serializedState = { ...initialState, ...storedState };
        return serializedState;
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const persistable = { ...state };
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(persistable));
    } catch (err) {
        console.error(err);
    }
};
