import React, { Component } from 'react';
import {Toggle,Gallery,User,Position} from '../actions/actions'

export const mapStateToProps = state =>{
    //console.log(state)
    return {
        Toggle:state.Toggle,
        Gallery:state.Gallery,
        User : state.User,
        Position:state.Position
    }
}

export const mapDispatchToProps=dispatch=>{
    return {
        onStClick:st=>{
            dispatch(Toggle(st))
        },
        onGallery:st=>{
            dispatch(Gallery(st))
        },
        UpdateUser:user=>{
            dispatch(User(user))
        },
        UpdatePosition:position=>{
            dispatch(Position(position))
        }
    }
}
