import React from 'react'
//import { BrowserRouter as Link } from "react-router-dom"
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import  { post } from 'axios';
import {Helmet} from 'react-helmet'
import './profile.css'
import { Gallery, User,Toggle } from "./actions/actions"
import { mapStateToProps,mapDispatchToProps } from './others/MapsProps'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Map,fromJS} from 'immutable'
import Edit from './profileEdit'
import fb from './Images/fb.png'
import instagram from './Images/instagram.png'
import twitter from './Images/twitter.png'
import about from './Images/ab.png'
import user from './Images/user.png'
import web from './Images/web.png'
import medium from './Images/medium.png'
import {backend_server} from '../server'
import Article from './Feeds/ProfileArticle'
/*
mutation abc(
  $id:ID!,
  $website:String!,
  $first_name:String!
	$last_name:STring!
  $twitter:String!
  $fb:String!
  $instagram:String!
  $about:String!
  $dob:String!
){
  updateInfo(	
    website:$website,
    userId:$id
    firstName:$first_name
    lastName:$last_name
    twitter:$twitter
    fb:$fb instagram:$instagram about:$about dob:$dob
  ){
    formErrors{
      
    }
    info{
      firstName
      lastName
    }
  }
}

*/




const qury = gql`query user{
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
        gender
        about
        birthDay
      }
  }
}`
const query = gql`query user($username:String!)
{
  users(username:$username){
    id
    username
    firstName
    lastName
    profile{
      id
      about,
      birthDay
      website
      fb
      gender
      instagram
      twitter
    }
    following{
      edges{
        node{
          id
        }
      }
    }
    follower{
      edges{
        node{
          id
        }
      }
    }
		profilePic{
      id
      profileOriginal
      profileThumbs
      profilePhoto
    }
    photos{
      pageInfo{
        startCursor
        endCursor
      }
      edges{
        node{
          id
          originalPhoto
          photo
          thumbs
        }
      }
    }
  }
}
  `
const updateinfo = gql`mutation UpdateInfo($user_id: ID!, $website: String!, $first_name: String!, $last_name: String!, $twitter: String!, $fb: String!, $instagram: String!, $about: String!, $dob: String!) {
  updateInfo(website: $website, userId: $user_id, firstName: $first_name, lastName: $last_name, twitter: $twitter, fb: $fb, instagram: $instagram, about: $about, dob: $dob) {
    formErrors
    status
  }
}
`
/*
class Edits extends React.Component{
  constructor(props){
    super(props);
      this.state = {
        user:[],
        users:[],
        us:'ajay',
        user_id:''
    }
  }
  componentDidMount = () => {
    const user = fromJS(this.props.info.users) 
    console.log(this.props.info.users)
    //console.log(user.get('profile').get('about'))
    this.setState(
      {
        user:user,
        users:this.props.info.users,
        user_id:this.props.info.users.id
      }
    )
  }
  handlechange(e){
    let user = Map(this.state.user)
    this.props.view(e)
    switch(e.target.name){
      case 'first_name':this.setState({user:user.set('firstName',e.target.value)});break;
      case 'last_name':this.setState({user:user.set('lastName',e.target.value)});break;
      case 'birthDay':this.setState({user:user.setIn(['profile','birthDay'],e.target.value)});break;
      case 'about':this.setState({user:user.setIn(['profile','about'],e.target.value)});break;
      case 'website':this.setState({user:user.setIn(['profile','website'],e.target.value)});break;
      case 'twitter':this.setState({user:user.setIn(['profile','twitter'],e.target.value)});break;
      case 'insta':this.setState({user:user.setIn(['profile','instagram'],e.target.value)});break;
      case 'fb':this.setState({user:user.setIn(['profile','fb'],e.target.value)});break;
      default:break
    }
  }
  handlesubmit(e){
    e.preventDefault()
    let user = e.target
    this.props.mutate(
      { 
        variables:{
        user_id:this.state.user_id,
        first_name:user.first_name.value,
        last_name:user.last_name.value,
        about:user.about.value,
        dob:user.birthDay.value,
        website:user.website.value,
        twitter:user.twitter.value,
        fb:user.fb.value,
        instagram:user.insta.value,
      }
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }

  render(){
    let user = Map(this.state.user)
    console.log(this.props)
    return(
      <article>
      
        <form onSubmit={this.handlesubmit.bind(this)}>
        First Name : <input type="text" name="first_name" value={this.props.User.first_name} onChange={this.handlechange.bind(this)}/>
        Last Name : <input type="text" value={user.get('lastName')} name="last_name" onChange={this.handlechange.bind(this)}/>
        Date of Birthday : <input type="date" value={user.getIn(['profile','birthDay'])} name="birthDay" onChange={this.handlechange.bind(this)}/>
        About : <textarea value={user.getIn(['profile','about'])} onChange={this.handlechange.bind(this)} name="about"/>
        website : <input type="text" value={user.getIn(['profile','website'])} name="website" onChange={this.handlechange.bind(this)}/>
        twitter <input type="text" name="twitter" value={user.getIn(['profile','twitter'])} onChange={this.handlechange.bind(this)}/>
        Instagram <input type="text" name="insta" value={user.getIn(['profile','instagram'])} onChange={this.handlechange.bind(this)}/>
        Facebook <input type="text" name="fb" value={user.getIn(['profile','fb'])} onChange={this.handlechange.bind(this)}/>        
        

        <button type="submit" name="submit" className="edit">Sumit</button>
      </form>
  
      
      <p>sdf</p>  
      </article>
    )
  }
}
*/

//const server = "http://localhost:8000/"
//const server = "http://2b9bcbc6.ngrok.io/"
const server = backend_server

class Thumb extends React.Component{
  constructor(props){
    super(props);
      this.state = {
        //maxWidth : '33.3%',
        grid : 3,
        //comments : []
    }
  }
  render()
  {
    const style = {
      'maxWidth':this.props.mw,
      'padding':'2px'
    }
    //console.log(this.props.Gallery.Gallery.gallery)
    //console.log(this.props)
    let img = server+this.props.photo.thumbs
    //let img = "http://localhost:8000/"+this.props.photo.node.thumbs
    return(
      <div className="thm" style={style}>
        <img className="thumbimg" src={img} alt="pho" />   
      </div>
    )
  }
}






class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state={
      maxWidth:'33%',
      grid:3,
      isedtable:true,
      conwidh:"900px",
      edit:'none',
      user:{},
      first_name:'',  
      showfeedarticle:'none',
      showfeed:'initial'    
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)

  }

  componentDidMount = () => {
    //console.log(this.props)
    console.log(this.props)
    this.setState(
      {
        grid:this.props.Gallery.grid,
        maxWidth:this.props.Gallery.width
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props)
    console.log(nextProps)
    if(this.props.data.users!=nextProps.data.users)
    {
      //let user = nextProps.data.users
      let user = fromJS(nextProps.data.users)
      console.log(user)
      this.props.dispatch(
        User(
          {
            user_id:user.get('id'),
            first_name:user.get('firstName'),
            last_name:user.get('lastName'),
            username:user.get('username'),
            about:user.getIn(['profile','about']),
            dob:user.getIn(['profile','birthDay']),
            website:user.getIn(['profile','website']),
            twitter:user.getIn(['profile','twitter']),
            fb:user.getIn(['profile','fb']),
            instagram:user.getIn(['profile','instagram'])
          }
        )
      )      
    }
}


  Updateuser(e){
    this.setState({
      edit:e.show
    })    

  }
  

  onFormSubmit(e){
    e.preventDefault()
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    }).catch(function(error){
      console.log(error) 
    })
  }

  
  onChange(e){
    this.setState({file:e.target.files[0]})
  }
  
  fileUpload(file){
    const url = 'http://localhost:8000/api/post/';
    //const url = 'http://example.com/file-upload';
    const formData = new FormData();
    formData.append('original_photo',file)
    //console.log(file)
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'authorization': `JWT ${token}`,
          }
    }
    return  post(url, formData,config)
}
changeWidth(e){
this.props.dispatch(Gallery({grid:e,width:`${100/e}%`}))
this.setState({'grid':e,'maxWidth':`${100/e}%`})
this.setState({'showfeedarticle':'none'})
this.setState({'showfeed':'initial','conwidth':'900px'})

}

ShowEditInfo(){
  if (this.state.edit=='none')
  {
    this.setState({edit:'initial'})
  }
  else{
    this.setState({edit:'none'})
  }
}
changelook(){
  //this.setState({'conwidh':'600px'})
  this.setState({'showfeed':'none'})
  this.setState({'showfeedarticle':'initial','conwidh':'600px'})
  console.log("word")
}

singlechange(f){
  //this.setState({first_name:e.target.value})
  //var f = document.forms.namedItem("upform")
  //formData = new FormData(f)
  //form.append("form",f)
  //console.log(f.elements.first_name.value)
  //console.log(formData)
  //console.log(e.target.name)
  console.log(f.elements.first_name.value)
  console.log(this.props)
  this.props.dispatch(User({
    //first_name:(e.target.name==="first_name")?e.target.value:"",
    //last_name:(e.target.name==="last_name")?e.target.value:""
    first_name:"op",
    last_name:f.elements.last_name.value,
    dob:f.elements.dob.value,
    instagram:f.elements.instagram.value,
    fb:f.elements.fb.value,
    twitter:f.elements.twitter.value,
    website:f.elements.website.value,
    about:f.elements.about.value,
  }))
  /*switch(e.target.name){
    case 'first_name':this.props.dispatch(User({first_name:e.target.value}));break;
    case 'last_name':this.props.dispatch(User({last_name:e.target.value}));break;
    default:break;
  }*/
  /*if(e.target.name=="first_name"){
  this.props.dispatch(User({first_name:e.target.value}))
  }else{
    this.props.dispatch(User({last_name:e.target.value}))
  }*/
  /*this.setState({
    user:{
      ...this.state.user,
      first_name:e.target.value
    }
  })*/


  //console.log(e.target.value)

}
render(){
        //console.log(this.state)
        //console.log(this.state.user)
        let { data, mutate } = this.props
        console.log(this.props)
        if (data.loading) {
          return <div>Loading...</div>
        }
        if(!data.users){
          return<div><h2>Not Found</h2></div>
        }
        const style={
          'borderRadius': '50%',
        }
        const profile_photos = data.users.photos.edges;
        var photo_list=[]
        var counter = 0
        let l = profile_photos
        while(counter<l.length){
          var t=[]
          l.slice(counter,counter+this.state.grid).forEach(function(e){
            t.push(e)
          })
          photo_list.push(t)
          counter+=this.state.grid
        }
        //console.log(this.props)
        //console.log(this.state.user.first_name)
        let users = fromJS(data.users)
        let U = this.props.User
        //let users = this.props.User
        console.log(this.props.User)
        if(!this.props.current.loading && !this.props.data.loading)
        {
          if(this.props.current.currentUser){ 
            if(this.props.current.currentUser.id===users.get("id")){
              var con = false
            }
            else{
              var con = true
            }
          }
          else{
            var newuser = true
          }
        }
          console.log(con)
          return(
          <main className="main">      
          <Helmet>
          <title>Profile</title>
          </Helmet>  
            <section className="top">
              <div className="profile">
                <div className="pfile">
                  <span className="fl_rw">
                    <div className="information">
                      <div className="personal">
                        <div className="fl_rw">
                          <img src={user} className="logo" alt="user"/><span className="unm">{U.first_name + " " +U.last_name}</span>
                            <span className="_un">(@{U.username})</span>
                        </div>
                        {con?
                        (
                        <div className="connection">
                          <input type="button" className="connect" value="Connect"/>
                        </div>
                        ):(
                          newuser?(
                          <input type="button" className="connect" value="Connected"/>
                          ):(
                          <span/>
                          )  
                        )
                        }
                        
                        <div className="fls_rw">
                          <div className="conn">
                            <span className="income">65</span>
                          </div>
                         <div className="conn">
                          <span className="outgo">98</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container">
                      <div className="uprf">
                        <img style={style} src={ server+data.users.profilePic.profileThumbs} alt="profile"/>
                        <div className="overlay"></div>
                      </div>

                      {
                      /*
                      <input type="file" className="in" name="profile_pic" onChange={this.onChangePost}/>
                      */
                      }
                    </div>                  
                  </span>                  
                </div>

                <div className="pfile">                
      
                  {U.instagram?(
      
                            <div className="_about fl_rw">
                            <img src={instagram} className="logo" alt="instagram"/>{U.instagram}
                            </div>
                          ):(
                            <span></span>
                          )
                          }
                          {U.fb?(   
                          <div className="_about fl_rw">  
                          <img src={fb} className="logo" alt="fb"/>{U.fb}
                          </div>):(
                            <span></span>
                          )                                       
                           }
                           {U.twitter?(
                          <div className="_about fl_rw">
                          <img src={twitter} className="logo" alt="twitter"/> {U.twitter}
                          </div>
                           ):(
                             <span></span>
                           )
                           }
                          {U.website?(
                          <div className="_about fl_rw">
                          <img src={web} className="logo" alt="website"/>{U.website}
                          </div>
                          ):(
                            <span/>
                          )
                          }
                          <div className="_about fl_rw">
                          {U.about}
                          </div>
                        
                          {!con?(
                          <div className="editbtn">
                          <button className="edit" onClick={this.ShowEditInfo.bind(this)}>Edit Profile</button>
                          </div>):(
                            <span></span>
                          )
                          }
                </div>
              </div>
            </section>

            <section className="edit_info" style={{display:this.state.edit}}>
              <Edit info={data} mutate = {mutate} user={this.props.User} view={this.singlechange.bind(this)}  views={this.Updateuser.bind(this)}/>
              </section>
            <section className="slide">
                    <div className="fl_rw sl_sec">
                        <div><span  className="li" >All(232)</span></div>
                        <div><span  className="li" >Photos(44)</span></div>
                        <div><span  className="li" >Blogs(5)</span></div>
                        <div><span  className="li" >Documents(3)</span></div>
                        <div><span  className="li" >Videos(10)</span></div>
                        <div><span  className="li" >Presentations(1)</span></div>
                        <div><span  className="li" >Another</span></div>
                    </div>
            </section>
            <section className="slide">
              <div className="fl_rw ch_op">
                <span  onClick={(e)=>this.changeWidth(3)}>3</span>
                <span  onClick={(e)=>this.changeWidth(4)}>4</span>
                <span  onClick={(e)=>this.changeWidth(5)}>5</span>
                <span onClick={(e)=>this.changelook()}>feed</span>
              </div>
            </section>
            <section className="bottom">
            <div className="p_cont">
               
              <div className="_row" style={{maxWidth:this.state.conwidh}}>
                  <div style={{display:this.state.showfeed}}>
                  {
                    photo_list.map(p=><Group key={p[0].node.id} Gallery={this.props} maxWidth={this.state.maxWidth} photo={p} />)   
                  }
                  </div>
                  <div style={{display:this.state.showfeedarticle}}>
                  {
                    <Article/>
                  }
                  </div>

              </div>


            
            </div>    
            </section>
          </main>
        )
    }


}



class Group extends React.Component{
  render(){
    return(
      <div className="fl_rw _group">
        {
          this.props.photo.map(
            p=><Thumb key={p.node.id} Gallery={this.props} mw={this.props.maxWidth} photo={p.node}/>
          )
        }
      </div>
    )
  }  
}

const queryOptions = {
  options: props => ({
    variables: {
      username: props.match.params.userName,
    },
  }),
}

export default compose(
  /*connect(
    (state)=>({
      Gallery:state.Gallery,
    })
  ),*/
  /*connect(mapStateToProps,mapDispatchToProps),*/
  connect(mapStateToProps),
  graphql(qury,{name:'current'}),
  graphql(query,queryOptions),
  graphql(updateinfo)
)(Profile)