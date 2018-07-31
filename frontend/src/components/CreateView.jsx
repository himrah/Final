import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './article.css';
import TimeAgo from 'javascript-time-ago';
import { graphql,compose } from 'react-apollo'
import gql from 'graphql-tag'

const mutation = gql`
mutation abc($msg:String!,$pid:ID!)
{
  postComment(comment:$msg,photoid:$pid){
    formErrors
    comment{
      id,
      photoId {
        id
      }
    }
  }
}
`


class CreateView extends React.Component {
    handleSubmit(e) {
      e.preventDefault()
      let formData = new FormData(this.form)
      this.props
        .mutate({ variables: { msg: formData.get('comment'),pid:formData.get('pid') } })
        .then(res => {
          if (res.data.postComment.formErrors === null) {
            window.location.replace(`/`)
          } else {
            console.log(res.data.createMessage.formErrors)
          }
        })
        .catch(err => {
          console.log('Network error!')
        })
    }
  
    render() {
      return (
        <div>
          <h1>Create</h1>
          <form
            ref={ref => (this.form = ref)}
            onSubmit={e => this.handleSubmit(e)}
            >
            <textarea name="comment" />
            <input type="text" name="pid"/>
            <button type="submit">Submit</button>
          </form>
        </div>
      )
    }
  }
  CreateView = graphql(mutation)(CreateView)
  export default CreateView