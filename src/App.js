import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'


import AllPosts from './components/AllPosts'
import Post from './components/Post'


class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => (
            <div>
              <AllPosts />
            </div>
            )}/>
          <Route path="/post/:id" component={ Post }/>
        </Switch>
      </div>
    )
  }
}

export default App
