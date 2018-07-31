import React, { Component } from 'react';
//import Async from 'react-code-splitting'
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Loadable from 'react-loadable'
//const Login = () => <Async load={import('./base/Login')}/>
//const Nav = () => <Async load={import('./base/Nav')}/>
import Loading from './loading'
//import { Provider } from 'react-redux'
//import {reducer} from './reducers/reduce'

//import {  createStore,} from "redux"

//import { Provider } from 'react-redux'

//const store = createStore(reducer)
//let store = createStore(reducer)

//import {initialState} from '../actions/actions'

import allreducer from './components/reducers/reduce'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
//import { initialState } from './components/actions/actions'
/*
const initialstate={
  Gallery:{
    grid:3,
    width:"300px"
  },
  Toggle:'none'
}*/

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


const Login = Loadable({
  loader: () => import('./components/Login'),
  loading : Loading
})

const Nav = Loadable({
  loader: () => import('./components/Nav'),
  loading : Loading
})

class P extends Component{
  render() {
    return(
      <div>
      lkjsdlkf
      </div>
    )
  }
}

class Container extends Component{
  render() {
    //var token = true
    var token=localStorage.getItem('token')
    //var token=true
    //console.log(localStorage)
    //console.log(token)
    /*if(token==null){
      console.log("sdlkfjlksdf")
      window.location.replace('/login')
    }*/
    //console.log(token)
    return (
    <Provider store={store}>
      { token ? (
        <Nav />
      ): (
        <Login />
      )
      }
    </Provider>
    );
  }
}


class App extends Component {
  render(){
    return <Container />
  }
}

export default App;
