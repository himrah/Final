import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from "react-router-dom"; 
import './Nav.css';
import { Helmet } from 'react-helmet'
import Loadable from 'react-loadable'
import './in.css'
//import $ from 'jquery'
import Loading from '../loading'
import notify from  './Images/notify.png' 
import profile from  './Images/profile.png'
import msg from  './Images/msg.png'
import logout from  './Images/logout.png'
import { mapStateToProps,mapDispatchToProps } from './others/MapsProps'
import {connect} from 'react-redux' 

const Main = Loadable({
    loader: () => import('./Main'),
    loading : Loading
})


const Interest = Loadable({
    loader: () => import('./Interest'),
    loading : Loading
})


const Profile = Loadable({
    loader:() => import('./Profile'),
    loading : Loading
})


const Msg = Loadable({
    loader:() => import('./Msg'),
    loading : Loading
})



//const Registration = () => <Async load={import('./Registration')}/>
const Registration = Loadable({
    loader:() => import('./Registration'),
    loading : Loading
})



class Logout extends React.Component{
    render(){
        //localStorage.setItem('token','null')
        //localStorage.removeItem('token')
        localStorage.removeItem('token')
        return(
            window.location.replace('/')
        )
    }
}


class Nav extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            /*inputcomment : '',
            keyset : '',
            comments : [],
            cmt_endcursor:'',
            hasNextPage:'',
            id:'',*/
            show:'initial',
            pcontent:'op'
            //hasNextPage : this.props.pageInfo.hasNextPage,
            //cursor : this.props.pageInfo.endCursor,
            //uid : localStorage.token
        }
        //this.updateInput = this.updateInput.bind(this);
        //this.handleClick = this.handleClick.bind(this);
    }    
    
    logout(){
        localStorage.removeItem('token')
        window.location.replace('/')
    }
    
    render(){
        //var token=localStorage.getItem('token')
        
        var token=true
        const style={
            'height':'20px',
            'maxWidth':'20px',
            'minWidth':'20px'
        }
        //const customHistory = createBrowserHistory()
        console.log(this.props)
        //console.log(this.props.toggle)

        const location={
            pathname:'/ajay',
            state:{fromDashboard:true}
        }


        return(
            
                <Router ignoreScrollBehavior>
                    <span className="m_con">  
                        <Helmet>
                            <title>NiXiS</title>
                        </Helmet>
                    <nav className="nav">
                        <div className="navdiv">
                            <div className="brand">
                                <span className="header_font">            
                                    <Link to="/"><span style={{color:'red'}}>NiXiS</span> </Link>
                                </span>
                            </div>
                        
                            { token ? (
                            <div className="profile_info _on_top">         
                            {/*<span className="top_p"><Link to='/'><span className="homeT"></span></Link></span>*/}
                            
                        {/*<span className="top_p"><Link to='/ajay'><img className="logo" style={style} src={profile} alt="sdf"  /> </Link></span>*/}
                            
                            <span className="top_p">
                            <Link to={location}><img className="logo" style={style} src={profile} alt="sdf"  /> </Link>
                            
                            
                            </span>
                            <span className="top_p"><Link to="/message"><img src={msg} alt="sdf" className="logo" style={style} /> </Link></span>
                            <span className="top_p"><Link to="/notify/"><img src={notify} alt="sdf" className="logo" style={style} /> </Link></span>
                            <span className="top_p"><Link to="#" onClick={this.logout} ><img src={logout} alt="sdf" className="logo" style={style} /> </Link></span>
                            </div>
                            ): (
                                <div className="profile_info">                    
                                <span className="top_p"><Link to="/login">Login</Link></span>
                                </div>
                            )

                        }

                        </div>
                    </nav> 
                    
                <Switch>            
                
                <Route name="home" exact path="/" component={Main} />
                <Route name="messaging" path="/message/" component={Msg} />
                <Route name="profile" path="/:userName/" component={Profile} />
                
                </Switch>
                    
        


                
                <div className="dropdown">
                    <div className="dropdown-content" style={{display:'none'}}>
                            <div>Share External</div>
                            <div>Full size image</div>
                            <div>Copy Link</div>
                            <div>Report</div>
                    </div>    
                </div>
                <nav className="btm_nav">
                        <div className="btm_navdiv">
                        { token ? (
                            <div className="profile_info _on_bottom">
                            <span className="top_p" style={{color:'black',fontFamily: 'BLKCHCRY',fontSize:'30px'}}><Link to="/">N</Link></span>
                            <span className="top_p"><Link to='/ajay'><img className="logo" style={style} src={profile} alt="sdf"  /> </Link></span>
                            <span className="top_p"><Link to="/message"><img src={msg} alt="sdf" className="logo" style={style} /> </Link></span>
                            <span className="top_p"><Link to="/notify/"><img src={notify} alt="sdf" className="logo" style={style} /> </Link></span>
                            <span className="top_p"><Link to="#" onClick={this.logout} ><img src={logout} alt="sdf" className="logo" style={style} /> </Link></span>
                            </div>
                            ): (
                                <div className="profile_info">                    
                                <span className="top_p"><Link to="/login">Login</Link></span>
                                </div>
                            )

                        }
                        </div>
                    </nav>
            </span>   
            </Router>
        )
    }
}
export default Nav
//export default connect(mapStateToProps,mapDispatchToProps)(Nav);