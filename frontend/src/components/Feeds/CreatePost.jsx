import React, { Component } from 'react'
import './createpost.css'
import image from '../Images/image.png'
import video from '../Images/video.png'
import attach from '../Images/attach.png'

import axios from  'axios'

class CreatePost extends Component {

    constructor(props){
        super(props)
        this.state = {
            image_link:'',
            image_link1:'',
            post_btn:'none'
        }
        this.handlesubmit = this.handlesubmit.bind(this)
    }

    autosize(){
        var el = this;
        setTimeout(function(){
          el.style.cssText = 'height:auto; padding:0';
          // for box-sizing other than "content-box" use:
          // el.style.cssText = '-moz-box-sizing:content-box';
          el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
      }


    componentDidMount=()=>{
        var textarea = document.querySelector('textarea');
        textarea.addEventListener('keydown',this.autosize);

    }

    postimage(e){
        e.preventDefault()
        
        console.log(this.state.image_link1)
        const formData = new FormData()
        formData.append("original_photo",this.state.image_link1,this.state.image_link1.name)
        console.log(formData)
        var url="http://localhost:8000/api/post/"

        const token = localStorage.getItem('token')

        console.log(token)
        const defaultOptions = {
            headers: {
                Authorization: token ? `Token ${token}` : '',
            },
        };
        axios.defaults.headers.common['Authorization']=`JWT ${token}`


        axios.post(url,formData)

        /*
        var files = e.target.files[0]
        var form = new FormData()
        form.append("file",files)
        var url="http://localhost:8000/api/post/",
        conifg={
        headers :{
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': 'multipart/form-data;'
        }
        }

        axios.post(url,form,conifg).then(
            console.log("here")
        )*/


    }


    handlesubmit(e){
        
        
        //console.log(e.target.files)
        
        var files = e.target.files[0]
        this.setState({image_link:URL.createObjectURL(files),post_btn:"initial",image_link1:e.target.files[0]})


        /*for(var i=0;i<e.target.files.length;i++){
            console.log(i)
            this.setState({
                image_link:[...this.state.image_link,URL.createObjectURL(e.target.files[i])]
            })
        }*/

        console.log(this.state.image_link)
    }
  render() {

    console.log(this.props)
    return (
      <article className="article _pst">
      <form onSubmit={this.postimage.bind(this)}>
          <header className="c">
              <div className="_cp">
                <h4>Create Post</h4>
                </div>
          </header>
            <div className="postform">
                <form id="createpost">
                    <textarea className="form-control" placeholder="write something" name="post"/>
                </form>
                </div>


            <div className="user-post">
                <div className="_p">
                    <img src={this.state.image_link} id="show_image" alt="uploading"/>
                </div>
            
            </div>


            <div className="_post_icon">
                <div className="fl_rw">
                    <div className="top_p">
                        <label for="input-image">
                        <img src={image} className="alogo" alt="image"/>
                        </label>
                        <input type="file" id="input-image" accept=".jpg, .jpeg, .png, .mp4" multiple="multiple" onChange={this.handlesubmit}/>
                    </div>
                    <div className="top_p">
                        <img src={video} className="alogo" alt="video" />
                    </div>
                    
                    <div className="top_p">
                    <img src={attach} className="alogo" alt="attachment" />
                    </div>
                </div>   
            </div>
            <input type="submit" className="btn" name="post" value="Post" style={{display:this.state.post_btn}}/>
        </form>
      </article>
    )
  }
}
export default CreatePost;
