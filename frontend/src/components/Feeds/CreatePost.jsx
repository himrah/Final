import React, { Component } from 'react'
import './createpost.css'
import image from '../Images/image.png'
import video from '../Images/video.png'
import attach from '../Images/attach.png'
import a from '../temp/a.jpg';
import b from '../temp/b.jpg';
import c from '../temp/c.jpg';
import d from '../temp/d.jpg';
import e from '../temp/e.jpg';
import axios from  'axios'

class CreatePost extends Component {

    constructor(props){
        super(props)
        this.state = {
            image_link:[],
            image_link1:'',
            post_btn:'none',
            caption:[],
            img_link:[],

        }
        this.handlesubmit = this.handlesubmit.bind(this)
    }

    autosize(){
        var el = this;
        setTimeout(function(){
          el.style.cssText = 'height:auto; padding:0';
          el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
      }


    componentDidMount=()=>{
        var textarea = document.querySelector('textarea');
        textarea.addEventListener('keydown',this.autosize);

    }
    uploaders(files,cap)
    {
        //console.log(this.state.caption)
        files.map((file,i)=>{
            //console.log(file)
            //console.log(cap[i])
            const formData = new FormData()
            formData.append("original_photo",file,file.name)

            //formData.append("original_photo",this.state.image_link1,this.state.image_link1.name)
            formData.append("caption",cap[i])
            //console.log(formData)
            var url="http://localhost:8000/api/post/"
            const token = localStorage.getItem('token')
            //console.log(token)
            
            axios.defaults.headers.common['Authorization']=`JWT ${token}`
            axios.post(url,formData).then(response=>{
                console.log(response)
            }).catch(error=>{
                console.log(error)
            })
        })
    }

    postimage(e){
        e.preventDefault()

        //console.log(this.state.image_link1)

        //const formData = new FormData()
        console.log(this.state.image_link)
        //this.uploaders(this.state.image_link)
        var cp=document.getElementsByName("post_caption")
        //console.log(cp)
        var cap = []
        Array.from(cp).map(i=>{
            cap.push(i.value)
            /*this.setState({
                caption:[...this.state.caption,"i.value"]
            })*/
            //console.log(i.value)
        })
        //console.log(cap)
        //this.setState({caption:["xyz","abc"]})
        this.uploaders(this.state.image_link,cap)
        //formData.append("original_photo",this.state.image_link1,this.state.image_link1.name)
        //formData.append("caption",this.state.caption)
        //console.log(formData)
        //var url="http://localhost:8000/api/post/"
        //const token = localStorage.getItem('token')
        //console.log(token)
        
        //axios.defaults.headers.common['Authorization']=`JWT ${token}`
        //axios.post(url,formData)

    }


    handlesubmit(e){
        var files = e.target.files[0]
        var list=[]
        var original=[]
        for(var i=0;i<e.target.files.length;i++)
        {
            list.push(URL.createObjectURL(e.target.files[i]))
            original.push(e.target.files[i])
        }
    
        this.setState({img_link:list,image_link:original,post_btn:"initial",image_link1:e.target.files[0]})


        console.log(this.state.image_link)
    }
    updatecaption(e){
        //console.log(e.target.value)
        //this.setState({caption:e.target.value})
    }
  render() {

    //console.log(this.props)
    return (
      <article className="article _pst">
      <form onSubmit={this.postimage.bind(this)}>
          <header className="c">
              <div className="_cp">
                <h4>Create Post</h4>
                </div>
          </header>
            <div className="postform">
                {/*<form id="createpost">
                    <textarea className="form-control" placeholder="write something" name="post" onChange={this.updatecaption.bind(this)}/>
                </form>*/}
                </div>

            <div className="user-post">
                <div className="_p">
                    {/*<img src={this.state.image_link} id="show_image" alt="uploading"/>*/}
                    {
                        this.state.img_link.map(i=>
                        <div className="post_">
                        <form id="createpost">
                            <textarea className="form-control" placeholder="write something" name="post_caption" onChange={this.updatecaption.bind(this)}/>
                        </form>
                            <img src={i} className="show_image" alt="upload"/>
                        </div>
                        )

                    //<img src={a} id="show_image" alt="upload"/>
                        }


                {/*
                    <div className="post_">
                        <div  style={{'background':`url(${b})`}} className="show_image" alt="upload"/>
                    </div>
                    <div className="post_">
                    <div  style={{'background':`url(${c})`}} className="show_image" alt="upload"/>
                    </div>
                    <div className="post_">
                    <div  style={{'background':`url(${d})`}} className="show_image" alt="upload"/>
                    </div>
                    <div className="post_">
                    <div  style={{'background':`url(${a})`}} className="show_image" alt="upload"/>
                    </div>
                  */}
                  {/*
                  <div className="post_">
                    <img src={a} className="show_image" alt="upload" />
                  </div>
                  <div className="post_">
                    <img src={b} className="show_image" alt="upload" />
                  </div>
                  <div className="post_">
                    <img src={c} className="show_image" alt="upload" />
                  </div>
                  <div className="post_">
                    <img src={d} className="show_image" alt="upload" />
                  </div>*/}
                </div>
            </div>


            <div className="_post_icon">
                <div className="fl_rw">
                    <div className="top_p">
                        <label>
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
