import React ,{ Component } from 'react';
import { Link } from "react-router-dom";
import '../static/logincss.css'
class Registration extends Component{
    render(){
        return(
    <div className="main-login">
    <section className="section-login">
    <div className="login_box">
            <form method="post" id="reg">
                <div className="grp">
                    <span id="usererror" className="lbl"></span>
                </div>
                <input type="text" name="first_name" placeholder="First Name" className="form-control"/>
                <input type="text" name="last_name" placeholder="Last Name" className="form-control"/>
                <div className="grp">
                    <div className="frmc">
                    <input type="text" name="email" placeholder="Email" className="form-control"/>
                    </div>
                    <span id="emailerror" className="lbl"></span>
                </div>
                <input type="password" name="password1" placeholder="Password" className="form-control"/>
                <input type="password" name="password2" placeholder="Repeat Password" className="form-control"/>
                    <input type="submit" value="Sign Up" id="signupbtn" className="btn" />
                    <div style={{'textAlign':'center','marginTop':'5px'}}>
                    <span><Link to="/login">Already Memeber</Link></span>
                    </div>
        </form>
        </div>
        </section>
        </div>
        )
    }
}
export default Registration