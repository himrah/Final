import React from 'react'
import './article.css'
import {graphql,compose} from 'react-apollo'
//import InfiniteScroll from 'react-infinite-scroller';
import InfiniteScroll from 'react-infinite-scroll-component'
import { BrowserRouter as Router, Link } from "react-router-dom"
import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'
import Comments from './comments'
import gql from 'graphql-tag'
import {backend_server} from '../../server'
import temp_profile from '../Images/temp_profile.jpeg'

import { mapStateToProps,mapDispatchToProps } from '../others/MapsProps'
import {connect} from 'react-redux'
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
            //hasNextPage : this.props.pageInfo.hasNextPage,
            //cursor : this.props.pageInfo.endCursor,
            //uid : localStorage.token
        }
        this.updateInput = this.updateInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handletoggle=()=>{

          //console.log(this.props.click.onStClick("sdf"))
          //console.log(this.props.toggle)
          if (this.props.toggle==='initial'){
            this.props.click.onStClick("none")
          }
          else{
              this.props.click.onStClick('initial')
          }
    }

    componentDidMount = () => {
      let post=this.props.p.node
      this.setState({cmt_endcursor:post.comments.pageInfo.endCursor,hasNextPage:post.comments.pageInfo.hasNextPage})
      this.setState({comments:post.comments.edges.map(c=><Comments key={c.node.id} cmt={c.node}  />)})
    }


    handleSubmit(e){
        e.preventDefault()
        this.props.click.m({variables:{comment:this.state.inputcomment,photoid:this.state.keyset,userid:this.props.click.user.currentUser.id}})
        .then(res=>{
            if (res.data.postComment.formErrors == null) {
                let post=res.data.postComment
                this.setState({
                    comments:[...this.state.comments,<Comments key={post.comment.id} cmt={post.comment}  />]
                })
            }
            else(
                console.log(res.data.createMessage.formErrors)
            )
        })
        .catch(err=>{
            console.log(err+' Network error!')
        })
    }

    handleClick(){
    }

    updateInput(e,key){
        this.setState({inputcomment: e.target.value,keyset:key})
    }
    render(){
        TimeAgo.locale(en)
        const timeAgo = new TimeAgo('en-US')
        let post = this.props.p.node
        //console.log(this.props)
        //let server = "http://localhost:8000/"
        const server = backend_server
        //console.log(backend_server)
        //console.log(server)
        //let server = "http://2b9bcbc6.ngrok.io/"
        let img = server+'media/'+post.photo
        
        if(post.uploadBy.profilePic){
        var prf =server+'media/'+post.uploadBy.profilePic.profileThumbs
        }
        else{
            var prf=temp_profile
        }

        return(
            <article className="article">
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
                        <div className="img_content">
                        <a target="_blank" href={img}>
                            <div className="main_img">
                                <img alt="smile" src={img} className="m_img" />
                            </div>
                        </a>
                        </div>

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


class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasNextPage :true,
            cursor : '',
            location:0,
            length:30,
            pics:[],
            //uid : localStorage.token
        }
    }
    changeposition(){
        //console.log(window.scrollY)
        //this.setState({location:window.scrollY})
        //console.log(this.props)
        this.props.UpdatePosition(
            
                {
                    article:window.scrollY
                }
        )
        //console.log(this.state.location)
        //console.log(e)
        //console.log(window.scrollY)
        /*if(e==0){
            e+=1;
            this.setState({location:e})
        }
        else{
            this.setState({location:e})
        }*/
    }
    componentDidMount(){
        //window.scrollTo(0,1975.3333740234375)
        /*console.log(this.props.Position.article)
        window.scrollTo(0,this.props.Position.article);
        console.log(window.scrollY)
        if(window.scrollY!==0){
        if(this.props.Position.article)
          {  window.addEventListener("scroll",this.changeposition.bind(this))
          }
    }*/
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
        setTimeout(()=>{
                //let { data, location } = this.props
                let { data, } = this.props
                //console.log(this.props)
                //console.log(this.props)
                //console.log(data.allFeedbyuser.pageInfo.endCursor)
                //if (data.allFeedbyuser.pagInfo.hasNextPage){
                    data.fetchMore({
                        query : MoreArticle,
                        variables :{
                            after:data.allFeedbyuser.pageInfo.endCursor,
                            user:this.props.User.username
                        },
                        updateQuery:(prev,next)=>{
                            //console.log(next.fetchMoreResult.allFeedbyuser.edges)
                            const newEdges = next.fetchMoreResult.allFeedbyuser.edges
                            const pageInfo = next.fetchMoreResult.allFeedbyuser.pageInfo
                            let len = this.state.length;

                            this.setState({'hasNextPage':pageInfo.hasNextPage,length:len+30})
                            newEdges.map(p=>{
                                this.setState(prevstate=>({
                                    pics:[...prevstate.pics,p]
                                }))
                            })

                            return{
                                allFeedbyuser : {
                                    __typename:prev.allFeedbyuser.___typename,
                                    edges:[...prev.allFeedbyuser.edges,...newEdges],
                                    pageInfo
                                },
                            }
                        },
                })
            },500);
    }

    handlescroll =() =>{
        //let {data,location} = this.props
        let {data } = this.props
        //console.log(this.props)
        //console.log("hklhjldkf")
        //if (this.scroller && this.scroller.scrollTop < 100){
            data.fetchMore({
                query:MoreArticle,
                variables:{
                    after:data.allFeedbyuser.pageInfo.endCursor,
                    user:this.props.click.User.username
                },
                updateQuery:(prev,next)=>{
                    const newEdges = next.fetchMoreResult.allFeedbyuser.edges
                    const pageInfo = next.fetchMoreResult.allFeedbyuser.pageInfo
                    return{
                    allFeedbyuser : {
                        __typename:prev.allFeedbyuser.___typename,
                        edges:[...prev.allFeedbyuser.edges,...newEdges],
                        pageInfo
                    },
                }
                }
            })
       // }
    }
    render(){
        
        //console.log(this.props)
        if(this.props.data.loading){
            return (<div>Loading...</div>)
        }
        
        console.log(this.props)
        //console.log(localStorage)
        //const photos = this.props.data.allPhotos;
        //let pageInfo=this.props.data.allFeedbyuser.pageInfo
        //console.log(pageInfo.hasNextPage)
        /*this.setState((pageInfo)=>{
            return {hasNextPage:pageInfo.hasNextPage,cursor:pageInfo.endCursor};
        })*/

        //console.log(this.props.data.allFeedbyuser.pageInfo.hasNextPage)
        //this.setState({hasNextPage:pageInfo.hasNextPage,cursor:pageInfo.endCursor})
        const photos = this.props.data.allFeedbyuser.edges;
        console.log(photos)
        var items=[]
        
        photos.map((p,i)=>{
            if(p)
            {
            items.push(
                <Articles p={p}/>
            )}
        })

        console.log(this.state.pics)
        //const pageInfo = this.props.data.allFeedbyuser.pageInfo
        //const mu = this.props;
        //console.log(this.props)
        //console.log(photos.length)
        //console.log(photos)
        //console.log(this.state)
        //this.updateStat(pageInfo)
        //console.log(photos)
        //console.log(this.props)
        //var items=[]
        //items.push(photos.map(p=><Articles key={p.node.id} p={p} m={mu}/>))

        //var loader = <div>Loading</div>
        //var ending = <div>ending</div>
        //console.log("new")
        //console.log(this.count)
        /*
            pullDownToRefreshContent={
                <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
                }

        */
       //var item=[]
       //item.push(photos.map(p=><Articles key={p.id} p={p} m={mu} />))
       //console.log(photos)
       //console.log(window.scrollY)
       
        return(
                
                <div>
                 {/* {photos.map(p=><Articles key={p.node.id} p={p} m={mu}/>)}*/}
                {/*this.changeposition(window.scrollY)*/}
                
                {<InfiniteScroll
                    dataLength={this.state.length}
                    next={this.loadItems.bind(this)}
                    hasMore={this.state.hasNextPage}
                    loader={<h4>Loading..........</h4>}
                    //endMessage = {ending}
                    >
                    <div>
                        {items}
                    </div>
                    <div>{/*photos.map(p=><Articles click={this.props} toggle={this.props.toggle} key={p.node.id} p={p} />)*/}</div>
                </InfiniteScroll>}
            </div>
        );
    }
}





const MoreArticle = gql`query allPhotos($user:String!,$after:String!){
allFeedbyuser(first:30,username:$user,after:$after) {
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
    after:null,
    //user:props.username
    user:props.User.username
    },
}),
}


const LoadComment = gql`query loadcmt($id:ID!,$after:String!){
  photos(id:$id){
    comments(first:3,after:$after){
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

const MY_QUERY = gql`query allFeedbyuser($user:String!){
    allFeedbyuser(username:$user,first:30) {
        pageInfo{
            hasNextPage
            endCursor
          }
        edges{
            cursor
            node{
                id
                photo
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
