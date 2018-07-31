import React from 'react';
//import $ from 'jquery'
import Async from 'react-code-splitting';
import { BrowserRouter as Router, Link } from "react-router-dom";
//import TimeAgo from 'javascript-time-ago'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
//import en from 'javascript-time-ago/locale/en'

class Temp extends React.Component{
    render(){
        console.log(this.props)
        return(
            <div>
                Done!
            </div>
        )
    }
}

const MY_QUERY = gql`query allPhotos{
    allPhotos {
        id
        photo
        createdDate
        comments {
          edges {
            node {
              id
              comment
              commentTime
              commentBy{
                id
                username
                
              }
            }
          }
        }
        uploadBy {
          id
          username
          profilePic{
            id
            profileThumbs
          }
        }
      }
      }`

const UpdateComment = gql`mutation create($comment:String!,$photoid:ID!,$userid:ID!){
    postComment(
      comment:$comment
      photoid:$photoid
      uid:$userid
    ) 
    {
        formErrors
        comment {
          id
          comment
          commentTime
          commentBy {
            id
            username
          }
        }
    }
  }`

Temp = graphql(MY_QUERY)(Temp)
export default Temp

/*  export default compose(
    graphql(MY_QUERY),
    graphql(UpdateComment)
)(Temp)*/