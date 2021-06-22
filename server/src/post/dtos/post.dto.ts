import { Post } from "../post.entity";
import sanitizeHtml from 'sanitize-html';

export class PostDTO {

	public title: string;

	public text_content: string; 

	public toEntity(): Post {
		const { title, text_content } = this;
		const newPost = new Post();
		
		newPost.title = sanitizeHtml(title);
		newPost.text_content = sanitizeHtml(text_content);

		return newPost;
	}

	public updateEntity(target) {
		const { title, text_content } = this;

		if( title )
			target.entity.title = sanitizeHtml(title);

		if( text_content )
			target.entity.text_content = sanitizeHtml(text_content);
	}

	public fromJson(json) {
		const { title, text_content } = json

		this.title = sanitizeHtml(title);
		this.text_content = sanitizeHtml(text_content);
	}
}
