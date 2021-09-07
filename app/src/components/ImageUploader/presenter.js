import React from 'react';

const ImageUploader = (props, context) => (

	<div className="ImgUploaderFrom" >
		<div className="ImgPreview">
			{
				props.img_preview.map(elem => (
					<img src={elem} />))
			}
		</div>

		<input
			className = "file_upload-btn"
			type="file"
			accept='image/jpg, impge/png, image/jpeg, image/gif'
			name="img" 
			value={props.img_value}
			onChange={props.img_change_handler} />
	</div>
);

export default ImageUploader;