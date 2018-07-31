import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Loadable from 'react-loadable'
import Loading from './loading'

import allreducer from './components/reducers/reduce'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

export const initialState = {
  Gallery:
    {
      grid:3,
      width:'33.3%'
    },
  Toggle:{toggle:'none'},
  
  //byname:['username','first_name','last_name','dob','about','twitter','website','fb','instagram'],
  //User:undefined
  User:{
    username:'',
    user_id:'',
    first_name:'',
    last_name:'',
    dob:'',
    about:'',
    website:'',
    twitter:'',
    fb:'',
    instagram:'',
  },
  Position:{
    article:1
  }
}

const store = createStore(allreducer,initialState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


const Nav = Loadable({
  loader: () => import('./components/Nav'),
  loading : Loading
})

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Nav/>
      </Provider>
    );
  }
}

export default App;
