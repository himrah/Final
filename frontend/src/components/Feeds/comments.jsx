import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReplayComment from './Reply'

class Comments extends React.Component {
    render(){
        TimeAgo.locale(en)
        const timeAgo = new TimeAgo('en-US')

        var ctime = this.props.cmt.commentTime
        let reply = this.props.cmt.replycomment ? this.props.cmt.replycomment.edges : []
        return(
            <div className="_cmt_box">
                    <span className="_uname">
                        <Router>
                        {
                           <Link to={this.props.cmt.commentBy.username} key={this.props.cmt.commentBy.id}><span style={{color:'black',fontWeight:'bold',marginRight:'3px'}}>{this.props.cmt.commentBy.username}</span></Link>
                        }
                        </Router>
                        <span className="_cmt" style={{fontweight:'normal'}}>
                            {this.props.cmt.comment}
                        </span>
                        <span className="_cmt_time" style={{color:'rgb(83, 83, 83)',fontSize:'12px',fontStyle:'inherit',marginLeft:'2px'}}>
                        {/* :- {ctime.format(new Date(de))}*/}
                        <span>:- {timeAgo.format(new Date(ctime)-60*1000,'time')}</span>
                        </span>
                        <div className="reply">
                        {
                            reply.map(c=><ReplayComment key={c.node.id} cmt={c}  />)
                        }
                        </div>
                    </span>
            </div>
        )
    }
}

export default Comments;