import React from 'react';
import './styles.css'

// center
import Post from "../Post";
import PostList from "../PostList";

//right
import Group from "../Group";

const Home = (props) => (
    <React.Fragment>
        {/* Top-bar-form */}
        <div className='Top-bar'>
                <img className='logo' src="logo.svg" alt='logo'/>

                <input 
                    className='search-input'
                    placeholder='Search'
                    />

                <div className='action_form'>
                    <button className='action_btn'>Home</button>
                    <button className='action_btn'>Profile</button>
                    <button className='action_btn'>Group</button>
                </div> 

                <div className='user_action_form'>
                    <button
                        className="action_btn"
                        type = 'submit'
                        onClick = {props.logout_handler}>
                            Logout
                    </button>
                </div>
        </div>

        {/* contnet-form */}
        <div className='letf_content_form'>
            {/* Profile-form */}
            <div className='Profile-form'>
                <div className='Profile-user-img-form'>
                    프로필 이미지 자리
                </div>

                <div className='Profile-action-btns'>
                    <button></button>
                </div>
            </div>

            {/* center-form */}
            <div className='center-form'>
                <Post />
                <PostList />
            </div>

            <div className='right_content_form'>
                <Group />
            </div>
        </div>
    </React.Fragment>
);  

export default Home;