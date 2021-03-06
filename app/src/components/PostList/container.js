import React, { useState, useEffect }  from "react";
import PropTypes from "prop-types";

import PostList from "./presenter"
import Modal from "../Modals/modal";

const Container = (props, context) => {

	const [ modalOpen, setModalOpen ] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
	
	const [state, setState] = useState({
		loading : true,
	});

	useEffect(() => {
		if(props.post_list != undefined) {
			setState({
				loading: false,
			});
		}
		else {
			props.postList(0, 99, 0);
		}
	}, [props.post_list]);

	const {loading} = state;

	const render = () => {
		if(loading) {
			return ( <p>loading...</p> )
		}
		else {
			return (
				<React.Fragment>
					{ props.post_list.map((elem, index) => 
						<PostList
							modalOpen	= {modalOpen}
							openModal 	= {openModal}
							closeModal	= {closeModal} 
							key	= {index}
							Post_pk		= {elem.pk}
							Post_writer = {elem.writer.name}
							Post_title 	= {elem.title}
							Post_text	= {elem.text_content}
							delete_handler	= {() => props.deletePost(elem.pk)}
						/>
					)}
				</React.Fragment>
			)
		}
	}

	return (
		<React.Fragment>
			{render()}
		</React.Fragment>
	);
}

Container.propTypes = {
	postList 			: PropTypes.func.isRequired,
};

export default Container;

