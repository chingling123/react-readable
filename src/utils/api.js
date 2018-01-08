const apiUrl = 'http://localhost:3001'

const headers = {  'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'ChingLing' }

// GET METHODS

export function getCategories () {
  return fetch(`${apiUrl}/categories`, { headers: headers})
    .then((res) => res.json())
    .then((data) => data.categories)
}

export function getPostsCategories (category) {
    return fetch(`${apiUrl}/${category}/posts`, { headers: headers})
        .then((res) => res.json())
        .then((data) => data)
}

export function getPosts () {
    return fetch(`${apiUrl}/posts`, { headers: headers})
        .then((res) => res.json())
        .then((data) => data)
}

export function getPostsById(id) {
    return fetch(`${apiUrl}/posts/${id}`, { headers: headers})
        .then((res) => res.json())
        .then((data) => data)
}

export function addPost(values) {
    return fetch(`${apiUrl}/posts/`, { 
        method: 'POST',
        headers: headers,
        body: JSON.stringify(values)
    })
    .then((res) => res.json())
    .then((data) => data)
}


export function editPost(values) {
    return fetch(`${apiUrl}/posts/${values.id}`, { 
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(values)
    })
    .then((res) => res.json())
    .then((data) => data)
}


export function getPostsCommentsById(id) {
    return fetch(`${apiUrl}/posts/${id}/comments`, { headers: headers})
        .then((res) => res.json())
        .then((data) => data)
}

export function getCommentsById(id) {
    return fetch(`${apiUrl}/comments/${id}`, { headers: headers})
        .then((res) => res.json())
        .then((data) => data)
}

export function setVote (id, option) {
    return fetch(`${apiUrl}/posts/${id}`, { 
                method: 'POST',
                headers: headers,
                body: JSON.stringify({option})
            })
        .then((res) => res.json())
        .then((data) => data)
}

export function addComment(values) {
    return fetch(`${apiUrl}/comments`, { 
        method: 'POST',
        headers: headers,
        body: JSON.stringify(values)
    })
    .then((res) => res.json())
    .then((data) => data)
}

export function editComment(values) {
    return fetch(`${apiUrl}/comments/${values.id}`, { 
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(values)
    })
    .then((res) => res.json())
    .then((data) => data)
}

export function deleteComment(id) {
    return fetch(`${apiUrl}/comments/${id}`, { 
        method: 'DELETE'
    })
    .then((res) => res.json())
    .then((data) => data)
}

// POST METHODS


// export const update = (book, shelf) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ shelf })
//   }).then(res => res.json())

// export const search = (query, maxResults) =>
//   fetch(`${api}/search`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query, maxResults })
//   }).then(res => res.json())
//     .then(data => data.books)