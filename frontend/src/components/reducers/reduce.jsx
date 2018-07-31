//import * as raction from '../actions/reduceaction'

//import {initialState} from '../actions/actions'

/*export const reducer=(state=initialState,action)=>{
    switch(action.type){
        case 'none':
            state.toggle = action.toggle
            break;
            //return {...state,toggle:'initial'}
            //return Object.assign({},state,{toggle:'initial'})
        case 'initial':
            state.toggle = action.toggle
            break;
            //return {...state,toggle:'none'}
            //return Object.assign({},state,{toggle:'none'})
        default :
            return state.toggle
    }
    //return state;
}*/

import { combineReducers } from 'redux'
import {Change_Gallery,Change_Toggle,Change_User,Change_pos} from '../actions/actions'


const User = (state='',action)=>{
    switch(action.type){
//        case Change_User: return action.value
        case Change_User:
        //let nstate = {...state}
        //console.log(nstate)
        //return {
            
            //first_name:action.value.first_name,
            //last_name:action.value.last_name
            /*User:{
                ...state.User,
                first_name:action.value.first_name,
                last_name:action.value.last_name    
            }*/
            //...state,
            //first_name:action.value.first_name
/*            byname:[...state.byname],
            User:{
                ...state.User,
                [action.byname]:action.value
            }*/

        //}
        
        let nstate = {...state}
        //console.log(nstate)
        //console.log(action)
        if(action.value.user_id){
            nstate.user_id = action.value.user_id
        }
        if(action.value.username){
            
            nstate.username = action.value.username    
        }
        //nstate.username = action.value.username
        if(action.value.first_name!==nstate.first_name){
            //console.log(action.value.first_name)
            nstate.first_name = action.value.first_name
        }
        //nstate.first_name = action.value.first_name
        
        if(action.value.last_name!==nstate.last_name){
            
            //console.log(action.value.last_name)
            nstate.last_name = action.value.last_name?action.value.last_name:""
            //nstate.last_name = "abc"
            //nstate.last_name = (action.value.last_name)?action.value.last_name:undefined
        }

        if(action.value.about!==nstate.last_name){
            nstate.about = action.value.about?action.value.about:""
        }

        if(action.value.website!==nstate.website){
            nstate.website = action.value.website?action.value.website:""
        }
        
        if(action.value.twitter!==nstate.twitter){
            nstate.twitter = action.value.twitter?action.value.twitter:""
        }
         
        if(action.value.instagram!==nstate.instagram){
            nstate.instagram = action.value.instagram?action.value.instagram:""
        }

        if(action.value.fb!==nstate.fb){
            nstate.fb = action.value.fb?action.value.fb:""
        }                
        if(action.value.dob!==nstate.dob){
            nstate.dob = action.value.dob?action.value.dob:""
        }
        
        /*nstate.user_id = action.value.user_id
        nstate.last_name = action.value.last_name
        nstate.about = action.value.about
        nstate.website = action.value.website
        nstate.twitter = action.value.twitter
        nstate.fb = action.value.fb
        nstate.instagram = action.value.instagram*/

        /*{
            username:'',
            user_id:'',
            first_name:'',
            last_name:'',
            about:'',
            website:'',
            twitter:'',
            fb:'',
            instagram:''
        }*/
        //console.log(nstate)
        return nstate
        //return action.value
        
        default: return state
        //case Change_User:
        
        //let nstate = {...state}
        //console.log(nstate)
        //return action.value
        //default : return state;
    
}
}

const Toggle = (state='',action)=>{
    switch(action.type){
        case Change_Toggle: return action.value
            //break;
            //console.log(action.value.newstate)
        //case 'another': return action.toggle
        default:
            return state
    }
}

const Position = (state='',action)=>{
    switch(action.type){
        case Change_pos:return action.value
        default : return state
    }
}
const Gallery = (state={},action)=>{
  switch (action.type) {
    case Change_Gallery:return action.value
    default: return state
  }
}
//var allreducer = combineReducers({Gallery:Gallery,Toggle:Toggle})


const allreducer = combineReducers(
    {  Gallery:Gallery,
      Toggle:Toggle,
      User:User,
      Position:Position
    }
    )


export default allreducer
//export default reducer;
