import { GET_ALL_POSTS, GETTING_DATA } from '../actions/postsAction'

const initialState = {
    allPosts: [],
    loading: true
}

const postsReducer = (state = initialState, action) => {
    switch(action.type){
        case GETTING_DATA:
            return{
                loading: true
            }
        case GET_ALL_POSTS:
            return {
                allPosts: action.allPosts,
                loading: false
            }
        default:
            return state
        
    }
}


export default postsReducer