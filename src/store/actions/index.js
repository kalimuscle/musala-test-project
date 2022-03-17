import {SERVER_URL} from "../../endpoint";
const axios = require('axios').default;
axios.defaults.baseURL = SERVER_URL;

console.log(SERVER_URL);


export const CREATE_GATEWAY_PENDING = 'CREATE_GATEWAY_PENDING';
export const CREATE_GATEWAY_SUCCESS = 'CREATE_GATEWAY_SUCCESS';
export const CREATE_GATEWAY_ERROR = 'CREATE_GATEWAY_ERROR';

export const LIST_GATEWAY_PENDING = 'LIST_GATEWAY_PENDING';
export const LIST_GATEWAY_SUCCESS = 'LIST_GATEWAY_SUCCESS';
export const LIST_GATEWAY_ERROR = 'LIST_GATEWAY_ERROR';

export const REMOVE_GATEWAY_PENDING = 'REMOVE_GATEWAY_PENDING';
export const REMOVE_GATEWAY_SUCCESS = 'REMOVE_GATEWAY_SUCCESS';
export const REMOVE_GATEWAY_ERROR = 'REMOVE_GATEWAY_ERROR';

export const UPDATE_GATEWAY_PENDING = 'UPDATE_GATEWAY_PENDING';
export const UPDATE_GATEWAY_SUCCESS = 'UPDATE_GATEWAY_SUCCESS';
export const UPDATE_GATEWAY_ERROR = 'UPDATE_GATEWAY_ERROR';

export const READ_GATEWAY_PENDING = 'READ_GATEWAY_PENDING';
export const READ_GATEWAY_SUCCESS = 'READ_GATEWAY_SUCCESS';
export const READ_GATEWAY_ERROR = 'READ_GATEWAY_ERROR';

export const CLOSE_MODAL_ERROR = 'CLOSE_MODAL_ERROR';

export function create_gateway( gateway) { 
    return (dispatch) => {
        dispatch({
            type: CREATE_GATEWAY_PENDING,
        });

        axios.post('/gateway/create', JSON.stringify(gateway), {
            headers: { 
                "Content-Type": "application/json"
            }
        }).then((res)=>{
            dispatch({
                type: CREATE_GATEWAY_SUCCESS,
                payload: res.data
            });
        }).catch((error)=>{
            dispatch({
                type: CREATE_GATEWAY_ERROR,
                payload: error
            });
        })
    };
}

export function list_gateway() {
    return (dispatch) => {
        dispatch({
            type: LIST_GATEWAY_PENDING
        });

        axios.get('/gateway/list', {
            headers: { 
                "Content-Type": "application/json"
            }
        }).then((res)=>{
            dispatch({
                type: LIST_GATEWAY_SUCCESS,
                payload: res.data
            });
        }).catch((error)=>{
            dispatch({
                type: LIST_GATEWAY_ERROR,
                payload: error
            });
        })
    };
}

export function remove_gateway( _id) {
    return (dispatch) => {
        dispatch({
            type: REMOVE_GATEWAY_PENDING
        });

        axios.post('/gateway/remove', JSON.stringify({_id}), {
            headers: { 
                "Content-Type": "application/json"
            }
        }).then((res) => {
            dispatch({
                type: REMOVE_GATEWAY_SUCCESS,
                payload: res.data
            });
        }).catch((error) => {
            dispatch({
                type: REMOVE_GATEWAY_ERROR,
                payload: error
            });
        })
    };
}

export function update_gateway( gateway) { 
    return (dispatch) => {
        dispatch({
            type: UPDATE_GATEWAY_PENDING,
        });

        axios.post('/gateway/update', JSON.stringify(gateway), {
            headers: { 
                "Content-Type": "application/json"
            }
        }).then((res)=>{
            dispatch({
                type: UPDATE_GATEWAY_SUCCESS,
                payload: res.data
            });
        }).catch((error) => {
            dispatch({
                type: UPDATE_GATEWAY_ERROR,
                payload: error
            });
        })
    };
}


export function read_gateway( _id) {
    return (dispatch) => {
        dispatch({
            type: READ_GATEWAY_PENDING
        });

        axios.post('/gateway/detail', JSON.stringify({_id}), {
            headers: { 
                "Content-Type": "application/json"
            }
        }).then((res)=>{
            dispatch({
                type: READ_GATEWAY_SUCCESS,
                payload: res.data
            });
        }).catch((error)=>{
            dispatch({
                type: READ_GATEWAY_ERROR,
                payload: error
            });
        })
    };
}

export function close_modal_error( _id) {
    return (dispatch) => {
        dispatch({
            type: CLOSE_MODAL_ERROR
        });
    };
}
