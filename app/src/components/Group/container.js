import React, { useState }  from "react";
import GroupHome from "./presenter";

const Container = (props, content) => {

    const [groupInfo, setGroupInfo] = useState({
        Group_title   : '',
        User_Pk       : '',
    });

    const { Group_title, User_Pk } = groupInfo;

    const title_input_handler = event => {
        const { value, name } = event.target;
        setGroupInfo({
            ...groupInfo,
            [name]: value
        });
    };

    const User_input_handler = event => {
        const { value, name } = event.target;
        setGroupInfo({
            ...groupInfo,
            [name]: value
        });
    };

    const Create_handler = event => {
        console.log('create group');
        event.preventDefault();
        props.groupCreate(Group_title, User_Pk);
    }

    const Invite_handler = event => {

    }

    const draw_handler = () => {

    }

    return (
        <GroupHome 
            title_input_handler      = {title_input_handler}
            User_input_handler       = {User_input_handler}
            Create_handler           = {Create_handler}
            Invite_handler           = {Invite_handler}
            draw_handler             = {draw_handler}
            Group_title              = {Group_title}
            User_Pk                  = {User_Pk}
        />
    );
}

export default Container;