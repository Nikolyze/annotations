import React, { useReducer } from 'react';

const UseReducerHook = (initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    function reducer(state, action) {
        switch (action.type) {
            case 'updateData':
                return action.payload;
            case 'updateDataPartial':
                return {
                    ...state,
                    ...action.payload
                };
            case 'moveData':
                return {
                    ...state,
                    moveData: {
                        ...state.moveData,
                        ...action.payload
                    }
                };
            default:
                throw new Error();
        }
    }

    return [state, dispatch];
}

export default UseReducerHook;
