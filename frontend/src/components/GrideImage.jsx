import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'
import {backend_server} from '../server'
import { mapStateToProps,mapDispatchToProps } from './others/MapsProps'
import {connect} from 'react-redux'
//import InfiniteScroll from 'react-infinite-scroller';
import InfiniteScroll from 'react-infinite-scroll-component'

//import gql from 'graphql-tag'
const server  = backend_server
class Thumb extends React.Component{
    constructor(props){
      super(props);
        this.state = {
          grid : 3,
      }
    }
    render()
    {
      const style = {
        'maxWidth':this.props.mw,
        'padding':'2px'
      }
      //console.log(this.props)
      let th = server+'media/'+this.props.photo.thumbs
      let img = server+'media/'+this.props.photo.photo
      return(
        <div className="thm" style={style}>
          <img className="thumbimg" src={th} alt="pho"/>   
        </div>
      )
    }
  }


  class Group extends React.Component{
    constructor(props){
        super(props);
          this.state = {
            //grid : 3,
            grid:this.props.grid,
        }
      }

    render(){
        //console.log(this.props)
        var counter = 0
        var photo_list = []
        var photos = this.props.photo
        
        while(counter<photos.length){
            var t=[]
            photos.slice(counter,counter+this.props.grid).forEach(function(e){
              t.push(e)
            })
            photo_list.push(t)
            counter+=this.props.grid
          }

        //console.log(photo_list)



      return(
        photo_list.map(photo_node=>
            <div className="fl_rw _group">
            {
                photo_node.map(
                p=><Thumb key={p.node.id} Gallery={this.props} mw={this.props.maxWidth} photo={p.node}/>
                )
            }
            </div>
        )
      )
    }  
  }




class GrideImage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasNextPage :true,
            cursor : '',
            location:0,
            feeds:[],
            grid:3,
            length:9,
            //uid : localStorage.token
        }
    }


    componentDidMount=()=>{
        let post = this.props.data
        //console.log(post)
        //this.setState({hasNextPage:post.comments.pageInfo.hasNextPage})
        //this.setState({comments:post.comments.edges.map(c=><Comments key={c.node.id} cmt={c.node}  />)})
    }

    loadItems=()=>{
        setTimeout(()=>{
                let { data, } = this.props
                    data.fetchMore({
                        query : MORE_PIC,
                        variables :{
                            after:data.allContext.pageInfo.endCursor,
                        },
                        updateQuery:(prev,next)=>{
                            const newEdges = next.fetchMoreResult.allContext.edges
                            const pageInfo = next.fetchMoreResult.allContext.pageInfo
                            let len = this.state.length
                            this.setState({'hasNextPage':pageInfo.hasNextPage,length:len+9})
                            return{
                                allContext : {
                                    __typename:prev.allContext.___typename,
                                    edges:[...prev.allContext.edges,...newEdges],
                                    pageInfo
                                },
                            }
                        },
                })
            },1500);
    }



    render(){
        if(this.props.data.loading){
            return (<div>Loading...</div>)
        }        
        //console.log(this.props)
        const photos = this.props.data.allContext.edges;

        return(
            <div>

                <InfiniteScroll
                //dataLength={this.state.length}
                //hasMore={this.state.hasNextPage}

                dataLength={this.state.length}
                next={this.loadItems.bind(this)}
                hasMore={this.state.hasNextPage}
                loader={<h4>Loading..........</h4>}                
                >
                <Group photo = {photos} prev_props = {this.props} grid = {this.props.grid} maxWidth = {this.props.maxWidth}/>
                </InfiniteScroll>

                {/*<InfiniteScroll
                    pageStart={0}
                    hasMore = {this.state.hasNextPage}
                    loadMore = {this.loadItems.bind(this)}
                    loader="<h1>Loading..</h1>"
                    //threshold = {2000}
                    >
                    <div>{
                        /*
                        photos.map(p=><Thumb prev_props={this.props} key={p.node.id} photo={p} />)
                        
                       <Group photo = {photos} prev_props = {this.props} grid = {this.props.grid} maxWidth = {this.props.maxWidth}/>
                        }</div>
                </InfiniteScroll>*/}
            </div>
        )
    }
}

const MORE_PIC = gql`query allPhotos ($after:String!){
    allContext(first:9,after:$after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          photo
          thumbs
          createdDate
          caption
        }
      }
    }
  }
`


const MY_QUERY = gql`query allPhotos {
    allContext (first:9){
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          photo
          thumbs
          createdDate
          caption
        }
      }
    }
  }`


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    graphql(MY_QUERY)
)(GrideImage);