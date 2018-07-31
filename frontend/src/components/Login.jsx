
import React from 'react';
//import {  Link } from "react-router-dom";
//import '../static/logincss.css'
import './logincss.css'
import {post} from 'axios'
import axios from 'axios'
import { graphql, Query, compose } from 'react-apollo'
import gql from 'graphql-tag'
import client from '../connection'
import { mapStateToProps, mapDispatchToProps } from './others/MapsProps'
import {connect} from 'react-redux'
import { User } from './actions/actions';
//import About from '../About'
import {fromJS} from 'immutable'
import {backend_server} from '../server'
const query = gql`query user{
    currentUser{
        id
        username
        firstName
        lastName
        profile{
          fb
          instagram
          website
          twitter
          about
          birthDay
        }
    }
  }`


  class Login extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            username :'',
            password :'',
            //count : 0
            //uid : localStorage.token
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }    


/*    componentWillUpdate(nextProps) {
        //console.log(localStorage)
        console.log(this.props)
        console.log(`from cwp ${nextProps}`)
        if (!nextProps.data.loading && nextProps.data.currentUser === null) {
          localStorage.setItem("user",nextProps.data.currentUser)
          //window.location.replace('/login/')
        }
    }*/
       

    componentWillReceiveProps(nextProps) {
        if(nextProps.data.currentUser){
            console.log(this.props.data)
            //nextProps.data.loading
            console.log(nextProps.data)
                
            
            //console.log(user)

            if(this.props.data.currentUser!==nextProps.data.currentUser)
                {
                    var user = fromJS(nextProps.data.currentUser)
                    console.log(user)
                    this.props.dispatch(User({
                        //username:nextProps.data.currentUser.username,
                        //first_name:nextProps.data.currentUser.firstName,
                        //last_name:nextProps.data.currentUser.lastName,
                        user_id:user.get("id"),
                        first_name:user.get('firstName'),
                        last_name:user.get('lastName'),
                        username:user.get('username'),
                        about:user.getIn(['profile','about']),
                        dob:user.getIn(['profile','birthDay']),
                        website:user.getIn(['profile','website']),
                        twitter:user.getIn(['profile','twitter']),
                        fb:user.getIn(['profile','fb']),
                        instagram:user.getIn(['profile','instagram'])

                    }))
               }
            }
        }

    updateInput = (e) => {
        this.setState({
            [e.target.id]:e.target.value
        })
    } 
 

  handleSubmit(e) {
    //alert("workd")
    //e.preventDefault()
    //alert(this.state.username+this.state.password)
    

    e.preventDefault()
   /* fetch('http://localhost:8000/api-token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: this.state.username, password: this.state.password})

    })*/
    
    //var server = "http://localhost:8000/api-token-auth/"
    var server = backend_server+"api-token-auth/"
    const config={
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
/*    console.log(server)
    axios({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'charset':'UTF-08',            
        },
        method:'post',
        url:server,
        params:{
            username: this.state.username, 
            password: this.state.password
        }
    }).then(
        (res)=>{
            alert(res.data.token)
        }
    )
    .catch(
        (err)=>err
    )*/
    var data={'username':this.state.username, password: this.state.password}
    //alert(data)
    post(server,data,config)
    .then(res => {
        if (res.data.token) {
            //alert(res.data.token)         
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            this.props.data.refetch()
            //alert(res.data.token)
            window.location.replace("/")
        }
          else{
              alert("username or password")
              console.log('Username or Password is wrong')
          }
        })
      .catch(err => {
        alert(err.response.status)
        console.log('wrong'+err)
      })
       
    
    }
    render(){
        //console.log(this.props)
        return(
        <main className="main-login">
            <section className="section-login">
            <div className="login_box">
                <form ref={ref => (this.form = ref)}  onSubmit={this.handleSubmit}>
                        <div>
                            <input type="text"  value={this.state.userame}  name="username" placeholder="Username" className="form-control" id="username"    onChange={this.updateInput}/>
                        </div>
                        <div>
                        <input type="password" value={this.state.password} name="password" placeholder="Password" className="form-control" id="password"  onChange={this.updateInput}/>
                        </div>
                        <input type="submit" className="btn" value="login"/>
                        
                        <div className="optional">
                            <div className="signup">
                                
                                <span className="_sup">
                                {/*}
                                <Link to="/registration">Sign Up</Link>*/}
                                </span>
                            </div>
                            <div className="forget">
                                <span className="_fgps">
                                {/*<Link to="#">Forget Password ?</Link>*/}
                                </span>
                            </div>
                        </div>
                    
                </form>
            </div>
            </section>
            
        </main>
        )
    }
}
const queryOptions = {
    options: props => ({
        variables: {
        
        },
    }),
    }

export default compose(
    connect(mapStateToProps),
    graphql(query)
)(Login)
