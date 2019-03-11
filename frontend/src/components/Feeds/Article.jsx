import _Article  from './ProfileArticle';
import React from 'react';
import {graphql,compose} from 'react-apollo'
//import InfiniteScroll from 'react-infinite-scroller';
import InfiniteScroll from 'react-infinite-scroll-component'
import gql from 'graphql-tag'
import {backend_server} from '../../server'
import { mapStateToProps,mapDispatchToProps } from '../others/MapsProps'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Link } from "react-router-dom"
import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'
//import { graphql, compose } from 'react-apollo'
import Comments from './comments'
import temp_profile from '../Images/temp_profile.jpeg'
import $ from 'jquery'
//import {backend_server} from '../../server'

class FeedShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputcomment : '',
            keyset : '',
            comments : [],
            cmt_endcursor:'',
            hasNextPage:'',
            id:'',
            show:'none',
            pcontent:'op'
        }
        this.updateInput = this.updateInput.bind(this);
    }  
    componentDidMount = () => {
        let post=this.props.p.node
        this.setState({cmt_endcursor:post.comments.pageInfo.endCursor,hasNextPage:post.comments.pageInfo.hasNextPage})
        this.setState({comments:post.comments.edges.map(c=><Comments key={c.node.id} cmt={c.node}  />)})
      }      
    updateInput(e,key){
        this.setState({inputcomment: e.target.value,keyset:key})
    }           
    handletoggle=()=>{

        if (this.props.toggle==='initial'){
        this.props.click.onStClick("none")
        }
        else{
            this.props.click.onStClick('initial')
        }
}
render(){
    TimeAgo.locale(en)
    const timeAgo = new TimeAgo('en-US')
    let post = this.props.p.node
    let tag = this.props.ending+" article"
    const server = backend_server
    let img = server+'media/'+post.thumbs
    let preview = server+"media/"+post.photo
    if(post.uploadBy.profilePic){
        var prf =server+'media/'+post.uploadBy.profilePic.profileThumbs
    }
    else{
        var prf=temp_profile;
    }    
    return(
        <article className="article" key={post.id}>
                <header className="img_header">
                    <div className="img_header_title">
                        {/*<Link to={this.props.p.uploadBy.username}><h4>{this.props.p.uploadBy.username}</h4></Link>
                        */}
                            <div className="fl_rw">
                                    <div className="_pt">
                                        {/*<Link to={this.props.p.uploadBy.username}><span className="user">{this.props.p.uploadBy.firstName}</span></Link>*/}

                                        <img src={prf} alt="prf" className="prf" title={post.uploadBy.username}/>
                                        
                                        {/*<div>{ctime}</div>*/}
                                        <div className="_name">
                                            <Link to={post.uploadBy.username}><span className="user">{post.uploadBy.firstName}</span></Link>
                                            <div className="_time">
                                                <span className="time">{timeAgo.format(new Date(post.createdDate)-60*1000,'time')} ago</span>
                                                {/*<span className="time" >{this.props.p.createdDate}</span>*/}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="dot">
                                            <span className={this.state.pcontent} onClick={this.handletoggle.bind(this)}></span>
                                        </div>
                                    </div>
                            </div>
                            <div className="_info">
                                <div className="caption">
                                    <span>{post.caption}</span>
                                </div>
                            </div>

                    </div>

                </header>
                <div className="scrl">
                <Router>

    {/*  ---------------------------------------------- image --------------------------------------------------------- */}    
                    <div className="img_content">
                    <a target="_blank" href={img}>
                        <div>

                            <div className="main_img">
                            
                                {/*
                                    <ProgressiveImage
                                    src={preview}
                                    preview = {img}
                                    />
                                                                
<img alt="smile" src={img} className="m_img" />
                                    */
                                }  
                                <img src={preview} />
                            </div>
                        </div>
                    </a>
                    </div>
    {/*------------------------------------------------endimage-----------------------------------------------------------*/}
                    </Router>
                    <div className="img_footer">
                    <div className="rating">
                    <span className="str s1"></span>
                    <span className="str s2"></span>
                    <span className="str s3"></span>
                    <span className="str s4"></span>
                    <span className="str s5"></span>
                    {/*<span>☆</span><span>☆</span><span>☆</span><span>☆</span>*/}
                    </div>
                    <div className="cmt_section">
                        <div className="show_comments">
                        {
                            this.state.comments
                        }

                        {/*
                        {post.comments.edges.map(c=><Comments key={c.node.id} cmt={c}  />)}
                        */}
                        {
                         this.state.hasNextPage ? (
                            <div className="mcmt">
                                {/*<span onClick={(e)=>this.loadItems(post.id)}>More Comments</span>*/}
                                <span onClick={this.loadItems.bind(this,post.id)}>More Comment</span>
                            </div>) : (
                                <span/>
                            )
                        }
                    </div>

                    </div>
                        <div className="comment_box">
                        <form ref={ref=>(this.this=ref)} onSubmit={e=>this.handleSubmit(e)}>
                            <div className="_cmt_btn">
                                <textarea className="form-control" placeholder="Comment here" onChange={(e)=> this.updateInput(e,post.id)} key={post.id}  ></textarea>
                                <input type="submit" value="post"  className="pstbtn" />
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
        </article>
    )
}
}





class Imgshow extends React.Component{
    render(){
        let prev = backend_server+"media/"+this.props.node.originalPhoto
        let img = this.props.node.originalPhoto
        return(
            <div className="abc" key={this.props.node.id}>
                <div>
                    <img src={prev} alt="smg" />
                </div>
            </div>
        )
    }
}

class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasNextPage :true,
            cursor : '',
            location:0,
            feeds:[],
            length:10,
            positionArticle:''
            //uid : localStorage.token
        }
    }    
    componentDidMount(){
        console.log(this.props)
        if(!this.props.data.loading)
        {
            console.log(this.props.data.allContext.edges)
        }
        //window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUpdate(prev){
        //console.log(prev.data.allContext.edges)
        /*if(!this.props.data.loading){
            if(this.props.data.allContext.edges[0].cursor==prev.data.allContext.edges[0].cursor)
                {this.setState({feeds:prev.data.allContext.edges})}
        }*/
        //console.log(this.props)
    }
    handleScroll=()=>{

        var wH = $(window).height();
        var wS = $(this).scrollTop();
        //var hT = $(".load").offset().top;
        var hT = document.getElementsByClassName("load")
        console.log("load "+hT)
        console.log("window "+wH)
        console.log("sc "+wS)

        console.log(wS+wH)
        if (hT < (wS+wH)){
            console.log("loading....")
            this.loading
        }
        //var wh = window.scroll
    }
      loading=()=>{
          setTimeout(()=>{

          console.log(this.props)
          //console.log("clicked")
          let { data, } = this.props
          data.fetchMore({
              query : MoreArticle,
              variables :{
                  after:data.allContext.pageInfo.endCursor,
              },
              updateQuery:(prev,next)=>{
                  const newEdges = next.fetchMoreResult.allContext.edges
                  const pageInfo = next.fetchMoreResult.allContext.pageInfo
                  let len = this.state.length

                  this.setState({'hasNextPage':pageInfo.hasNextPage,length:len+10})
                    console.log(newEdges)
                    
                    var fd = this.state.feeds
                    newEdges.map(v=>{
                        fd.push(v)
                    })
                    this.setState({feeds:fd})
                  return{
                      allContext : {
                          __typename:prev.allContext.___typename,
                          edges:[...prev.allContext.edges,...newEdges],
                          pageInfo
                      },
                  }
              },
        });
        },1500);

      };
    render(){
        const loadings = <div className="l">Loading.....</div>
        if(this.props.data.loading){
            return (<div>Loading...</div>)
        }
        //this.setState({})
        let edges = this.props.data.allContext.edges
        //this.setState({fee})
        let items=[]
        /*this.state.feeds.map(n=>{
            n.node
            items.push(<div>Hello{n.node.id}</div>)
        })*/
        let server="localhost:8000/"
        /*this.state.feeds.map((n,i)=>{

            items.push(
                <FeedShow p={n} />
            )
        })*/
        edges.map((n,i)=>{

            items.push(
                <FeedShow key={i} p={n} />
            )
        })   

        //console.log(this.state.feeds)
        console.log(items)
        return(
            <div onScroll={this.handleScroll.bind(this)}>
             {/*       {
                        items
                    }
                <input type="button" value="loadmore" onClick={this.loading.bind(this)}/>
                <span className="load"></span>*/}
                <InfiniteScroll
                dataLength={this.state.length}
                next={this.loading.bind(this)}
                hasMore={this.state.hasNextPage}
                loader={<h4>Loading..........</h4>}
                >
                {items}
                </InfiniteScroll>
            </div>
            
        )
    }
}

const MoreArticle = gql`query allPhotos($after:String!){
    allContext(first:10,after:$after) {
        pageInfo{
            hasNextPage
            endCursor
          }
        edges{
            cursor
            node{
                id
                photo
                thumbs
                originalPhoto
                createdDate
                caption
                comments(first:5) {
                pageInfo{
                  hasNextPage
                  endCursor
                }
                edges {
                    node {
                    id
                    comment
                    commentTime
                    replycomment{
                      pageInfo{
                        hasNextPage
                        endCursor
                      }
                        edges{
                            node{
                                id
                                comment
                                commentTime
                                commentBy{
                                    id
                                    username
                                    firstName
                                    lastName
                                }
                            }
                        }
                    }
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
                firstName
                lastName
                profilePic{
                    id
                    profileThumbs
                }
                }
            }
        }
      }
      }`


const MY_QUERY = gql`query allPhotos{
    allContext(first:10) {
        pageInfo{
            hasNextPage
            endCursor
          }
        edges{
            cursor
            node{
                id
                photo
                thumbs
                originalPhoto
                createdDate
                caption
                comments(first:5) {
                pageInfo{
                  hasNextPage
                  endCursor
                }
                edges {
                    node {
                    id
                    comment
                    commentTime
                    replycomment{
                      pageInfo{
                        hasNextPage
                        endCursor
                      }
                        edges{
                            node{
                                id
                                comment
                                commentTime
                                commentBy{
                                    id
                                    username
                                    firstName
                                    lastName
                                }
                            }
                        }
                    }
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
                firstName
                lastName
                profilePic{
                    id
                    profileThumbs
                }
                }
            }
        }
      }
      }`
      const queryOptions = {
        options: props => ({
            variables: {
            after:null
            },
        }),
        }

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    graphql(MY_QUERY,queryOptions),
    //graphql(UpdateComment,{name:'m'}),
    //graphql(User,{name:'user'})    
)(Article)

//export default Article;