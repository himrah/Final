import React, { Component } from 'react'
import './createpost.css'
import image from '../Images/image.png'
import video from '../Images/video.png'
import attach from '../Images/attach.png'

class CreatePost extends Component {
  render() {
    return (
      <article className="article _pst">
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
                    

                </div>
            
            </div>



            <div className="_post_icon">
                <div className="fl_rw">
                    <div className="top_p">
                        <label for="input-image">
                        <img src={image} className="alogo" alt="image"/>
                        </label>
                        <input type="file" id="file_input" id="input-image" accept=".jpg, .jpeg, .png, .mp4" multiple="multiple"/>
                    </div>
                    <div className="top_p">
                        <img src={video} className="alogo" alt="video" />
                    </div>
                    
                    <div className="top_p">
                    <img src={attach} className="alogo" alt="attachment" />
                    </div>
                </div>   
            </div>

      </article>
    )
  }
}
export default CreatePost;
