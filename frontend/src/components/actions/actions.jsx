//export const ABC = "none"

/*export const initialState = {
    type:'initial',
    toggle : 'none',
}*/
export const Change_Gallery = "gallery:UpdateGallery"
export const Change_Toggle = "gallery:UpdateToggle"
export const Change_User = "User:UpdateUser"
export const Change_pos = "Position:Change"
export const Toggle =(newstate)=> {
    return{
        type:Change_Toggle,
        value:
        {
            toggle:newstate.toggle
        }
    }
}

export const Position = (newstate)=>{
    return{
        type:Change_pos,
        value:
        {
            article:newstate.article
        }
    }
}
export const Gallery =(newstate)=> {
    return{
        type:Change_Gallery,
        value:
        {
            grid:newstate.grid,
            width:newstate.width
        },
    }
}

export const initialState = {
  Gallery:
    {
      grid:3,
      width:'300px'
    },
  Toggle:'none'
}

export const User = (newstate)=>{
    return{
        value:
        {
            username:newstate.username,
            user_id : newstate.user_id,
            first_name:newstate.first_name,
            last_name:(newstate.last_name),
            about:newstate.about,
            dob:newstate.dob,
            website:newstate.website,
            twitter:newstate.twitter,
            fb:newstate.fb,
            instagram:newstate.instagram
        },
        type:Change_User
    }
}
