import axios from "axios";
import React, { createContext, useReducer, useContext } from "react";
import { jsonplaceholder } from "./Users";

const initState = {
    users: {
        loading: false,
        data: null,
        error: null,
    },
    user: {
        loading: false,
        data: null,
        error: null,
    }
}

const loadingState = {
    loading: true,
    data: null,
    error: null,
}

const success = (data) => {
    return {
        loading: false,
        data: data,
        error: null,
    }
}

const error = e => ({
    loading: false,
    data: null,
    error: e,
})

function usersReducer(state, action) {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                user: loadingState,
            }
        case 'GET_USERS_SUCCESS':
            const result = {
                ...state,
                users: success(action.data),
            }
            return result;
        case 'GET_USERS_ERROR':
            return {
                ...state,
                users: error(action.error),
            }
        case 'GET_USER':
            return {
                ...state,
                user: loadingState,
            }
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                user: success(action.data),
            }
        case 'GET_USER_ERROR':
            return {
                ...state,
                user: error(action.error),
            }
        default:
            throw new Error('Unhandled action type', action.type);
    }
}

const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

export function UsersProvider({ children }) {
    const [state, dispatch] = useReducer(usersReducer, initState);

    return (
        <UsersStateContext.Provider value={state}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>
    )
}

export function useUsersState() {
    const state = useContext(UsersStateContext);
    if (!state) {
        throw new Error('Cannot find UserProvier');
    }

    return state;
}

export function useUsersDispatch() {
    const dispatch = useContext(UsersDispatchContext);
    if (!dispatch) {
        throw new Error('Connot find UserProvider');
    }
    
    return dispatch;
}

export async function getUsers(dispatch) {
    dispatch({ type: 'GET_USERS' });

    try {
        const response = await axios.get(jsonplaceholder);
        dispatch({
            type: 'GET_USERS_SUCCESS',
            data: response.data,
        })
    } catch (e) {
        dispatch({
            type: 'GET_USERS_ERROR',
            error: e,
        })
    }
}

export async function getUser(dispatch, id) {
    dispatch({ type: 'GET_USER' });

    try {
        const response = await axios.get(`${jsonplaceholder}${id}`);
        dispatch({
            type: 'GET_USER_SUCCESS',
            data: response.data,
        })
    } catch (e) {
        dispatch({
            type: 'GET_USER_ERROR',
            error: e,
        })
    }
}