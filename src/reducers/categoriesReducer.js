import { GET_ALL_CATEGORY, GETTING_DATA } from '../actions/postsAction'

const initialState = {
    allCategories: [],
    loading: true
}

const categoriesReducer = (state = initialState, action) => {
    switch(action.type){
        case GETTING_DATA:
            return{
                loading: true
            }
        case GET_ALL_CATEGORY:
            return {
                allCategories: action.allCategories,
                loading: false
            }
        default:
            return state
        
    }
}


export default categoriesReducer