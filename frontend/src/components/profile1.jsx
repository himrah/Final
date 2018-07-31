import React from 'react'
//import { BrowserRouter as Link } from "react-router-dom"
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import  { post } from 'axios';
import {Helmet} from 'react-helmet'
import './profile.css'
import { Gallery } from "./actions/actions"
import { mapStateToProps,mapDispatchToProps } from './others/MapsProps'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Map,fromJS} from 'immutable'

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
      instagram
      twitter
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

class Edit extends React.Component{
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
    //const user = fromJS({name:'ajay',contact:{mobile:90}})
    const user = fromJS(this.props.info.users) 
    console.log(this.props.info.users)
    console.log(user.get('profile').get('about'))
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
    console.log(this.state.user)
    let user = Map(this.state.user)
    return(
      <article>
      {
        <form onSubmit={this.handlesubmit.bind(this)} >
        First Name : <input type="text" name="first_name" value={user.get('firstName')} onChange={this.handlechange.bind(this)}/>
        Last Name : <input type="text" value={user.get('lastName')} name="last_name" onChange={this.handlechange.bind(this)}/>
        Date of Birthday : <input type="date" value={user.getIn(['profile','birthDay'])} name="birthDay" onChange={this.handlechange.bind(this)}/>
        About : <textarea value={user.getIn(['profile','about'])} onChange={this.handlechange.bind(this)} name="about"/>
        website : <input type="text" value={user.getIn(['profile','website'])} name="website" onChange={this.handlechange.bind(this)}/>
        twitter <input type="text" name="twitter" value={user.getIn(['profile','twitter'])} onChange={this.handlechange.bind(this)}/>
        Instagram <input type="text" name="insta" value={user.getIn(['profile','instagram'])} onChange={this.handlechange.bind(this)}/>
        Facebook <input type="text" name="fb" value={user.getIn(['profile','fb'])} onChange={this.handlechange.bind(this)}/>        
        <button type="submit" name="submit" className="edit">Sumit</button>
      </form>
  
    }

      </article>
    )
  }
}


const server = "http://localhost:8000/"
//const server = "http://cf792ff7.ngrok.io/"

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




class Single extends React.Component{
  constructor(props){
    super(props);
    this.state={
      maxWidth:'33%',
      grid:3,
      isedtable:true,
      edit:'none',
      user:{},      
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)

  }

  componentDidMount = () => {
    //console.log(this.props)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.data.data.loading){
      //console.log(nextProps)
    }
     else{
       //console.log(nextProps.user) 
       this.setState(
        {
          user:{
            user_id:nextProps.user.id,
            first_name:nextProps.user.firstName,
            last_name:nextProps.user.lastName,
            about:nextProps.user.profile.about,
            dob:nextProps.user.profile.birthDay,
            website:nextProps.user.profile.website,
            twitter:nextProps.user.profile.twitter,
            fb:nextProps.user.profile.fb,
            instagram:nextProps.user.profile.instagram
          }
        })
      }
  }


  Updateuser(e){
    console.log(e.target)
    //console.log(this.props)
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


render(){
        console.log(this.props.data)
        //console.log(this.state.user)
        let { data, mutate } = this.props.data
        if (data.loading || !data.users) {
          return <div>Loading...</div>
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
        console.log(this.state.user)
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
                    { data.users.profile ?(
                      <div className="personal">
                          
                          <div className="fl_rw">
                            <span className="unm">{data.users.firstName + " " +data.users.lastName}</span>
                            <span className="_un">(@{data.users.username})</span>
                          </div>
                          <div className="_about">
                            {data.users.profile.about}
                          </div>
                          <button className="edit" onClick={this.ShowEditInfo.bind(this)}>Edit Profile</button>
                      </div>
                    ) : (
                      <div className="p">
                      </div>
                    )
                    }
                  
                  </div>
                  <div className="container">
                      {/*}
                      <img style={style} src={ "http://localhost:8000/photos/"+data.users.profilePic.profileThumbs} alt="profile"/>
                      */}
                      <div className="uprf">
                      <img style={style} src={ server+data.users.profilePic.profileThumbs} alt="profile"/>
                      <div className="overlay"></div>
                      </div>
                    </div>                  
                  </span>                  
                  </div>
              </div>

            </section>
            <section className="edit_info" style={{display:this.state.edit}}>
              <Edit info={data} mutate = {mutate}  view={this.Updateuser.bind(this)}/>
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
              </div>
            </section>
            <section className="bottom">
            <div className="p_cont">
            {   
              <div className="_row">
                {photo_list.map(p=><Group key={p[0].node.id} Gallery={this.props} maxWidth={this.state.maxWidth} photo={p} />)}
              </div>
            }
            </div>    
            </section>
          </main>
        )
    }


}




class Profile extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      //file:null
      maxWidth:'33%',
      grid:3,
      isedtable:true,
      edit:'none',
      user:[],
    }
  }
  
  componentDidMount = () => {
    this.setState(
      {
        grid:this.props.Gallery.grid,
        maxWidth:this.props.Gallery.width
      }
    )
    //this.setState()
  }


  render(){
    return(
      <Single data={this.props}   user={this.props.data.users}/>
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
  connect(
    (state)=>({
      Gallery:state.Gallery,
    })
  ),
  graphql(query,queryOptions),
  graphql(updateinfo)
)(Profile)