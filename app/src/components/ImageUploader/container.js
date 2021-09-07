import React, { useState, useEffect } from "react";
import ImageUploader from "./presenter";

const Container = (props, context) => {

	const [base64, setBase64] = useState([]);
	const [imgFile, setImgFile] = useState([]);
	const [imgVal, setImgVal] = useState("");

	useEffect(() => {
		if(props.upload >= 0) {
			props.uploader(imgFile);
		} else {
			setBase64([]);
			setImgFile([]);
		}
		
	}, [props.upload])

	const __img_change_handler__ = (event) => {
		setImgVal(event.target.value);
		const reader = new FileReader();
		const file = event.target.files[0];
		
		reader.onloadend = () => {
			if (file && reader.result) {
				setBase64([
					...base64,
					reader.result.toString()
				]);
				setImgVal("");
			}
		}

		if(file) {
			reader.readAsDataURL(file);

			setImgFile([
				...imgFile,
				file
			]);
		}
	}

    return (
		<ImageUploader
			img_change_handler		= { __img_change_handler__ }
			img_preview				= { base64 }
			img_value				= { imgVal }
		/>
	);

}

export default Container;