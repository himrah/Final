import React from 'react';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import Left from './Left';
//import Right from './Right';



//import Async from 'react-code-splitting'
//import Middle from './Middle';

import Loadable from 'react-loadable'
import Loading from '../loading'
//import Main from './Main'
//import { Comb } from './Comb';

//const Profile = () => <Async load={import('./Profile')}/>

//const Main = () => <Async load={import('./Comb')}/>
//const Loading = () => <div>Loading...</div>;

const Right = Loadable({
    loader: () => import('./Right'),
    loading : Loading
})

const Left = Loadable({
    loader: () => import('./Left'),
    loading : Loading
})

const Middle = Loadable({
    loader: () => import('./Middle'),
    loading : Loading
})
//const Left = () => <Async load={import('./Left')}/>
//const Right = () => <Async load={import('./Right')}/>
//const Middle = () => <Async load={import('./Middle')}/>

class Main extends React.Component{
    
    render(){        
        /*var flag
        var border_class = function(){
            var ww = document.body.clientWidth;
            if(ww<1100){
                flag=true
                $('.home_section').addClass('home_section_small');
                $('.left').hide()
                $('.right').hide()
            }
                else{
                    $('.home_section').removeClass('home_section_small');
                    $('.left').show()
                    $('.right').show()
            }
        }

            $(window).resize(function(){
                border_class();
              });            
              border_class();*/
        return(
            <main className="main">    
                <section className="home_section">
                <Left />
                <Middle />
                <Right />
                </section>
            </main>
        )
    }
}
export default Main;