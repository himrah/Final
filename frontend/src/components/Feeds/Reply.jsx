import React from 'react'
import { Link } from 'react-router-dom'

class ReplayComment extends React.Component{
    render(){
        return(
            <span className="_uname">
                <span className="_cmt">{this.props.cmt.node.comment} </span>
                <Link to={this.props.cmt.node.commentBy.username}>
                    <span style={{color:'black',fontWeight:'bold',marginRight:'3px'}}>
                        {this.props.cmt.node.commentBy.firstName}
                    </span>
                </Link>
            </span>
        )
    }
}
export default ReplayComment;