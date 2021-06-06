import multer from 'multer';
import path from 'path';

const ImagefileFilter = (req, file, callback) => {
	const ext = path.extname(file.originalname);

	if (
		ext !== '.png' && 
		ext !== '.jpg' && 
		ext !== '.gif' && 
		ext !== '.jpeg'
	) {
		return callback(new Error('Only images are allowed'));
	}

	callback(null, true)
}

export const PostImageMulter = multer({
	dest: 'upload/Images/Post',
	fileFilter: ImagefileFilter
});

export const ProfileImageMulter = multer({
	dest: 'upload/Images/Profiles',
	fileFilter: ImagefileFilter
});
