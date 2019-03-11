import React from 'react'
import './article.css'
import {graphql,compose} from 'react-apollo'
import InfiniteScroll from 'react-infinite-scroller';
import { BrowserRouter as Router, Link } from "react-router-dom"
import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'
//import { graphql, compose } from 'react-apollo'
import Comments from './comments'
import gql from 'graphql-tag'
import {backend_server} from '../../server'
import { mapStateToProps,mapDispatchToProps } from '../others/MapsProps'
import {connect} from 'react-redux'
import CreatePost from './CreatePost'
import temp_profile from '../Images/temp_profile.jpeg'
import ProgressiveImage from 'react-progressive-bg-image';

    class Articles extends React.Component{
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
            <article className="article" >
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
//export default Article;


class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasNextPage :true,
            cursor : '',
            location:0,
            feeds:[],
            positionArticle:''
            //uid : localStorage.token
        }
    }
    changeposition(){
        //console.log(window.scrollY)
        //this.setState({location:window.scrollY})
        console.log(this.props)
        this.props.UpdatePosition(
            
                {
                    article:window.scrollY
                }
        )

    }
    componentDidMount(){
    console.log(this.props)
    }
    componentDidUpdate()
    {
        //console.log("after load");
        //console.log(this.props)
        var article = document.getElementsByClassName("article")
        article = article[article.length - 3]
        //this.artt(article)
        //article.scrollY
        //console.log(article[article.length - 3])
        //this.setState({positionArticle:article[article.length - 3]})
    }
    artt(article)
    {
        //console.log(article);
        console.log(this.props)
        /*this.setState(
            {positionArticle:article}
        )*/        
    }
    updateStat(pageInfo){
        this.setState({hasNextPage:pageInfo.hasNextPage,cursor:pageInfo.endCursor})
    }

/*    componentWillReceiveProps(){

        if(this.props.data.loading){
            //return (<div>sdf</div>)
            console.log(this.props)
        }
        console.log(this.props)
    }*/

    loadItems(){

                let { data, } = this.props
                    data.fetchMore({
                        query : MoreArticle,
                        variables :{
                            after:data.allContext.pageInfo.endCursor,
                        },
                        updateQuery:(prev,next)=>{
                            const newEdges = next.fetchMoreResult.allContext.edges
                            const pageInfo = next.fetchMoreResult.allContext.pageInfo
                            this.setState({'hasNextPage':pageInfo.hasNextPage})
                            return{
                                allContext : {
                                    __typename:prev.allContext.___typename,
                                    edges:[...prev.allContext.edges,...newEdges],
                                    pageInfo
                                },
                            }
                        },
                })

    }

    handlescroll =() =>{
        let {data } = this.props
            data.fetchMore({
                query:MoreArticle,
                variables:{
                    after:data.allContext.pageInfo.endCursor
                },
                updateQuery:(prev,next)=>{
                    const newEdges = next.fetchMoreResult.allContext.edges
                    const pageInfo = next.fetchMoreResult.allContext.pageInfo
                    return{
                    allContext : {
                        __typename:prev.allContext.___typename,
                        edges:[...prev.allContext.edges,...newEdges],
                        pageInfo
                    },
                }
                }
            })
    }
    render(){
        if(this.props.data.loading){
            return (<div>Loading...</div>)
        }
        console.log(this.props)
        const photos = this.props.data.allContext.edges;
        //const feeds = photos
        //console.log(photos)
        //var i=0;
        return(
                
                <div>
                 {/* {photos.map(p=><Articles key={p.node.id} p={p} m={mu}/>)}*/}
                {/*this.changeposition(window.scrollY)*/}
                
                {<CreatePost s={this.props}/>
                }
                {
                
                /*photos.forEach(p=>{
                  if(i==3)
                  {
                    <Articles click={this.props} ending="sl" toggle={this.props.toggle} key={p.node.id} p={p} />
                    i=0 
                  }
                  else{
                    <Articles click={this.props} endling="all" toggle={this.props.toggle} key={p.node.id} p={p} />
                    i++;
                  }
                })*/
                /*
                <InfiniteScroll
                    pageStart={0}
                    loadMore = {this.loadItems.bind(this)}
                    hasMore = {this.state.hasNextPage}
                    loader="<h1>Loading..</h1>"
                    
                    >
                    <div>{photos.map(p=><Articles click={this.props} toggle={this.props.toggle} key={p.node.id} p={p} />)}</div>
                </InfiniteScroll>*/
                photos.map(p=><Articles click={this.props} toggle={this.props.toggle} key={p.node.id} p={p} />)
            }
            <input type="button" value="loadmore" onClick={this.loadItems.bind(this)}/>
            </div>
        );
    }
}



const MoreArticle = gql`query allPhotos($after:String!){
allContext(first:3,after:$after) {
        pageInfo{
            hasNextPage
            endCursor
          }
        edges{
            __typename
            cursor
            node{
                id
                photo
                createdDate
                caption
                comments(first:10) {
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

const LoadComment = gql`query loadcmt($id:ID!,$after:String!){
  photos(id:$id){
    comments(first:5,after:$after){
      pageInfo{
        endCursor
        hasNextPage
      }
      edges{
        node{
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
            firstName
            lastName
          }
          commentBy{
            id
            username
            firstName
            lastName
          }
        }
      }
    }
  }
}
`

const MY_QUERY = gql`query allPhotos{
    allContext(first:3) {
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
/*
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

*/

const UpdateComment = gql`mutation create($comment:String!,$photoid:ID!,$userid:ID!){
    postComment(
        comment : $comment
        photoid : $photoid
        uid : $userid
    )
    {
        formErrors
        comment{
            id
            comment
            commentTime
            replycomment{
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
    `



/*const mapStateToProps = state =>{
    state:state
}

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        toggle:initialState.toggle
    },dispatch)
}*/
const User = gql`query user{
    currentUser{
        id
        username
    }
  }`

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    graphql(MY_QUERY,queryOptions),
    graphql(UpdateComment,{name:'m'}),
    graphql(User,{name:'user'})

)(Article)
