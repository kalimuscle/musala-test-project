/* eslint-disable no-case-declarations */
import * as types from '../actions';

const initialState = {
    gateways: [], 
    gateway: null,
    loading: false,
    error: false, 
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_GATEWAY_PENDING:
        case types.LIST_GATEWAY_PENDING:
        case types.REMOVE_GATEWAY_PENDING:
        case types.UPDATE_GATEWAY_PENDING:
        case types.READ_GATEWAY_PENDING:
            return {
                ...state,
                gateway: null,
                loading: true,
                error: false
            };
        case types.CREATE_GATEWAY_SUCCESS:
            return {
                ...state,
                gateways: [... state.gateways, action.payload],
                gateway: null,
                loading: false,
                error: false
            };
            case types.CREATE_GATEWAY_ERROR:
            case types.LIST_GATEWAY_ERROR:
            case types.REMOVE_GATEWAY_ERROR:
            case types.UPDATE_GATEWAY_ERROR:
            case types.READ_GATEWAY_ERROR:
                return {
                    ...state,
                    gateway: null,
                    loading: false,
                    error: true
                };
        case types.LIST_GATEWAY_SUCCESS:
            return {
                ...state,
                gateways: action.payload,
                gateway: null,
                loading: false,
                error: false
            };
        case types.REMOVE_GATEWAY_SUCCESS:
            return {
                 ...state,
                gateways: state.gateways.filter(item => item._id != action.payload._id),
                gateway: null,
                loading: false,
                error: false
            };
        case types.UPDATE_GATEWAY_SUCCESS:
            const index = state.gateways.findIndex((item) => item._id == action.payload._id);
            let temp = state.gateways;
            temp[index] = action.payload;
            return {
                 ...state,
                gateways: temp,
                gateway: null,
                loading: false,
                error: false
            };
        case types.READ_GATEWAY_SUCCESS:
            return {
                ...state,
                gateway: action.payload != '' ? action.payload : null,
                loading: false,
                error: false
            };
        case types.CLOSE_MODAL_ERROR:
            return {
                ...state,
                loading: false,
                error: false
            };
        default:
            return state;
    }
};

export default mainReducer;
