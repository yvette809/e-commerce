import {createStore, combineReducers, applyMiddleware} from  'redux'
import thunk from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'


const reducer = combineReducers({})
const initialState={}

const store= createStore(reducer,initialState)