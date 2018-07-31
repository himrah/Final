import React from 'react';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Left extends React.Component{
    render(){
        //var flag
        var border_class = function(){
            var ww = document.body.clientWidth;
            if(ww<1100){
            }
                else{
                    //flag=false
                    //$('.home_section').removeClass('home_section_small');
                    //$('.left').show()
                    //$('.right').show()
            }
        }
      
        return(     
                <div className="left">
                    <div className="left-content">
                        left content
                    </div>
                </div>                
        )
    }
}
export default Left;