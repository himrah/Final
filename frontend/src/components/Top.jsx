import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './in.css';
import './jv.js'
import Nav from './Nav';
import Main from './Main';
class Top extends Component{
    render(){
        return(
            <section className="top">
            <Nav />
            <Main />
            </section>
        )
    }
}
export default Top;