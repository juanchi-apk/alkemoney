import {rootReducer} from './reducers/reducers'
import { createStore , applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk';


const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

function persistentReducer(reducer){
    
    return (state,action)=>{
        
        const newState = reducer(state, action)
        localStorage.setItem("reduxState",  JSON.stringify(newState))
        return newState
    }
    }
    
    let paramaux= JSON.parse(localStorage.getItem("reduxState"))
    
    
    export const store = createStore(persistentReducer(rootReducer), paramaux||undefined, composedEnhancer)    


