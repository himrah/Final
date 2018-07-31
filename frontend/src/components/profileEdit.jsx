import React from 'react';
import {connect} from 'react-redux'
import {mapStateToProps, mapDispatchToProps} from './others/MapsProps'
import gql from 'graphql-tag'
import { User } from "./actions/actions"
import './profileEdit.css'
import {fromJS} from 'immutable'
import { graphql, compose } from 'react-apollo'


const updateinfo = gql`mutation UpdateInfo($user_id: ID!, $website: String!, $first_name: String!, $last_name: String!, $twitter: String!, $fb: String!, $instagram: String!, $about: String!, $dob: String!) {
    updateInfo(website: $website, userId: $user_id, firstName: $first_name, lastName: $last_name, twitter: $twitter, fb: $fb, instagram: $instagram, about: $about, dob: $dob) {
      formErrors
      status
    }
  }
  `

class Edit extends React.Component{

    handlechange(e){
        //let user = Map(this.state.user)
        //this.props.view(e)
        //this.props.dispatch(User({first_name:e.target.value}))
        var f = document.forms.namedItem("editform")
        console.log(this.props)
        this.props.UpdateUser({
          first_name:f.elements.first_name.value,
          last_name:f.elements.last_name.value,
          dob:f.elements.dob.value,
          instagram:f.elements.instagram.value,
          fb:f.elements.fb.value,
          twitter:f.elements.twitter.value,
          website:f.elements.website.value,
          about:f.elements.about.value,
        })
        //this.props.view(f)
        //this.props.view(e)
        //this.props.UpdateUser({first_name:e.target.value})
        /*switch(e.target.name){
            case 'first_name':this.props.dispatch(User({first_name:e.target.value}));break;
            case 'last_name':this.props.dispatch(User({last_name:e.target.value}));break;
            case 'birthDay':this.props.dispatch(User({dob:e.target.value}));break;
            case 'about':this.props.dispatch(User({about:e.target.value}));break;
            case 'website':this.props.dispatch(User({website:e.target.value}));break;
            case 'twitter':this.props.dispatch(User({twitter:e.target.value}));break;
            case 'insta':this.props.dispatch(User({instagram:e.target.value}));break;
            case 'fb':this.props.dispatch(User({fb:e.target.value}));break;            
            default:break
        }*/
      }
      handlesubmit(e){
        e.preventDefault()
        let user = e.target
        this.props.mutate(
          { 
            variables:{
            user_id:this.props.User.user_id,
            first_name:user.first_name.value,
            last_name:user.last_name.value,
            about:user.about.value,
            dob:user.dob.value,
            website:user.website.value,
            twitter:user.twitter.value,
            fb:user.fb.value,
            instagram:user.instagram.value,
          }
        }).then(res=>{
          if(res.data.updateInfo.status==="Success")
          {
            this.props.views({show:'none'})
          }
        }).catch(err=>{
          console.log(err)
        })
      }

    render(){
        console.log(this.props)
        //let users = fromJS(this.props.info.users)
        let users = this.props.User
        //let user = this.props.user
        //console.log(user)
        return(
            <article className="_editform">
            {
              <form onSubmit={this.handlesubmit.bind(this)} onChange={this.handlechange.bind(this)} name="editform">
              <div>
                First Name : <input type="text" className="form-control" name="first_name" value={users.first_name} />
              </div>

              <div>
                Last Name : <input type="text" className="form-control" value={users.last_name} name="last_name"/>
              </div>
              <div>
                Instagram <input type="text" name="instagram" className="form-control" value={users.instagram} />
              </div>              
              <div>
                Facebook <input type="text" name="fb" className="form-control" value={users.fb} />
              </div>
              <div>
               twitter <input type="text" name="twitter" className="form-control" value={users.twitter} />
              </div>
              <div>
                website : <input type="text" value={users.website} className="form-control" name="website" />
              </div>
              <div>
                Date of Birthday : <input type="date" className="form-control" value={users.dob} name="dob" />
              </div>
              <div>
                About : <textarea value={users.about} className="form-control"  name="about"/>
              </div>
            <button type="submit" name="submit" className="edit">Sumit</button>
            </form>
        
          }
      
            </article>
        )
    }
}
//export default connect(mapStateToProps)(Edit)
export default compose(
    /*connect(
      (state)=>({
        Gallery:state.Gallery,
      })
    ),*/
    /*connect(mapStateToProps,mapDispatchToProps),*/
    connect(mapStateToProps,mapDispatchToProps),
    //graphql(query,queryOptions),
    graphql(updateinfo)
  )(Edit)