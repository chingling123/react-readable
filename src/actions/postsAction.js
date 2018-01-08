import * as API from '../utils/api';

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GETTING_DATA = 'GETTING_DATA'
export const GET_ALL_CATEGORY = 'GET_ALL_CATEGORY'
export const SET_VOTE = 'SET_VOTE'
export const GET_POST_ID = 'GET_POST_ID'
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const Loading = () => {
    return{
        type: GETTING_DATA
    }
}

export const setVote = (id, option) => {
    return dispatch => {
        API.setVote(id, option).then((data) => {
            console.log(data)
            dispatch(getAllPosts())
        })
    }
}

export const getAllPosts = () => {
    return dispatch => {
        API.getPosts().then((data) => {
            dispatch(loadPostsSuccess(data))
        }
    )}
}

export const getPostsByCategory = (category) => {
    return dispatch => {
        API.getPostsCategories(category).then((data) => {
            dispatch(loadPostsSuccess(data))
        })
    }
}

export const loadPostsSuccess = (data) => {
    return{
        type: GET_ALL_POSTS,
        allPosts: data
    }
}

export const loadPostSuccess = (data) => {
    return {
        type: GET_POST_ID,
        post: data
    }
}

export const loadCommentsSuccess = (data) => {
    return {
        type: GET_POST_COMMENTS,
        comments: data
    }
}

export const getAllData = () => {
    return dispatch => {
        dispatch(Loading())
        API.getCategories().then((data) => {
            dispatch(loadCategorySuccess(data))
            dispatch(getAllPosts())
        })
    }
}

export const getPostById = (id) => {
    return dispatch => {
        dispatch(Loading())
        API.getPostsById(id).then((data) => {
            dispatch(loadPostSuccess(data))
            dispatch(getPostsCommentsById(id))
        }
    )}
}


export const addPost = (values) => {
    return dispatch => {
        API.addPost(values).then((data) => {
            dispatch(getAllPosts())
        }
    )}
}

export const getPostsCommentsById = (id) => {
    return dispatch => {
        API.getPostsCommentsById(id).then((data) => {
            dispatch(loadCommentsSuccess(data))
        }
    )}
}

export const loadCategorySuccess = (data) => {
    return{
        type: GET_ALL_CATEGORY,
        allCategories: data
    }
}

export const deleteCommentSuccess = (id) => {
    return{
        type: DELETE_COMMENT,
        id: id
    }
}

export const addComment = (values) => {
    return dispatch => {
        API.addComment(values).then((data) => {
            dispatch(getPostsCommentsById(values.parentId))
        }
    )}
}

export const editComment = (values) => {
    return dispatch => {
        API.editComment(values).then((data) => {
            dispatch(getPostsCommentsById(values.parentId))
        }
    )}
}

export const editPost = (values) => {
    return dispatch => {
        API.editPost(values).then((data) => {
            dispatch(getPostById(values.id))
        }
    )}
}

export const deleteComment = (id) => {
    return dispatch => {
        API.deleteComment(id).then((data) => {
            dispatch(deleteCommentSuccess(id))
        })
    }
}
