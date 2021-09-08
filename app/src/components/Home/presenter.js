import React from 'react';
import './styles.css'

// center
import Post from "../Post";
import PostList from "../PostList";

//right
import Group from "../Group";

const Home = (props) => (
    <div className="Home_form">
        <div className='letf_content_form'>
            <div className='Profile-form'>
                <div className='Profile-user-img-form'>
                    프로필 이미지 자리
                </div>

                <div className='Profile-action-btns'>
                </div>
            </div>
        </div>
        
        <div className='center-form'>
            <Post />
            <PostList />
        </div>

        <div className='right_content_form'>
            <Group />
        </div>
    </div>
);  

export default Home;