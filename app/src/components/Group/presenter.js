import React from 'react';
import PropTypes from "prop-types";
import './styles.css'

export const GroupView = props => (
    <React.Fragment>

    </React.Fragment>
)

const GroupHome = props => (
    <div className = "groupHome">
        <br/>
        <h1> Group Page </h1>

        <div>
            <div>
                <input
                    type = "button"
                    name = "groupFind"
                    value = "Find" />
            </div>
            

            <div>
                <input
                    type = "button"
                    name = "groupInvite"
                    value = "Invite" />
            </div>
            
        </div>

        <form
            className=""
            onSubmit={props.Create_handler}
            method="post">
            <input
                name="Group_title"
                placeholder="그룹 제목을 정해주세요."
                value={props.Group_title}
                onChange={props.title_input_handler}/>
        {/* 03c50ab4-1081-44e5-bcbb-865858795c17 */}
            <input
                name="User_Pk"
                value={props.User_PK}
                onChange={props.User_input_handler}/>
                
            <input
                type = "submit"
                value = "Create" />
            </form>
        { props.draw_handler() }
    </div>  
);

GroupHome.propTypes = {
    Create_handler        : PropTypes.func.isRequired,
    User_input_handler    : PropTypes.func.isRequired,
    title_input_handler   : PropTypes.func.isRequired
}

export default GroupHome;