import React, { useState, useEffect }  from "react";
import PropTypes from "prop-types";
import PostList_form from "./presenter"

const Container = (props, context) => {
	
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
            console.log("\n postList run ... \n\n");
			props.postList(0, 99, "post.createdAt");
		}
	}, [props.post_list]);

	const {loading} = state;

	const render = () => {
		if(loading) {
			return ( <p>loading...</p> )
		}
		else {
			console.log(props.post_list);
			
			return (
				<>
					{ props.post_list.map(elem => 
						<PostList_form 
							user_info 	= {elem.writer.name}
							Post_time	= {elem.createAt}
							Post_pk		= {elem.pk}
							Post_title 	= {elem.title}
							Post_text	= {elem.text_content}
							delete_handler	= {() => props.deletePost(elem.pk)}
						/>
					)}
				</>
			)
		}
	}

	return (
		<div>
			{render()}
		</div>
	);
}

Container.propTypes = {
	postList 			: PropTypes.func.isRequired,
};

export default Container;

