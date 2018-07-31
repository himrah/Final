import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`{
    users(username:"ajay")
    {
      interest{
        pageInfo{
          hasNextPage
          endCursor
        }
        edges{
            node{
            id
            name
          }
        }
      }
    }
}`

  class Interest extends React.Component{
      render(){
          return(
              <div>
              interest
              </div>
          )
      }
  }
  Interest = graphql(query)(Interest)
  export default Interest