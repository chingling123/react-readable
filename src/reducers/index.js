import { combineReducers } from 'redux'
import postsReducer from './postsReducer'
import categoriesReducer from './categoriesReducer'
import postReducer from './postReducer'

export default combineReducers({
    postReducer,
    postsReducer,
    categoriesReducer
})