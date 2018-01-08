import { GETTING_DATA, GET_POST_ID, GET_POST_COMMENTS, DELETE_COMMENT } from '../actions/postsAction'

const initialState = {
    comments: [],
    post: [],
    loading: true,
    loadingC: true
}

const postReducer = (state = initialState, action) => {
    switch(action.type){
        case GETTING_DATA:
            return{
                loading: true
            }
        case GET_POST_ID:
            return {
                post: action.post,
                loading: false,
                loadingC: true
            }
        case GET_POST_COMMENTS:
            return {
                ...state,
                comments: action.comments,
                loadingC: false
            }
        case DELETE_COMMENT:
            return{
                ...state,
                comments: [...state.comments.filter((c) => c.id !== action.id)],
            }
        default:
            return state
        
    }
}


export default postReducer