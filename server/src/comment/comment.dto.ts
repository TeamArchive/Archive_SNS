import { IsNotEmpty, Length, IsEmail, IsString, IsEmpty, IsOptional } from "class-validator";
import { Comment, Recomment } from '@comment/comment.entity';
import sanitizeHtml from 'sanitize-html';

export class CommentDTO {

	@IsOptional()
	@IsString()
	@Length(36)
	public comment_pk: string;
	
	@IsNotEmpty()
	@IsString()
	public content: string

	@IsOptional()
	@Length(36)
	@IsString()
	public post_pk: string;

	public static toEntity( dto: CommentDTO ): Comment{
		const { content, post_pk } = dto;

		const new_comment = new Comment();
		new_comment.content = sanitizeHtml(content);
		new_comment.post_pk = sanitizeHtml(post_pk);
		
		return new_comment;
	}
	
	public static updateEntity( 
		target: { entity: Comment },  
		dto: CommentDTO
	) {
		const { content } = dto;

		if(content) 
			target.entity.content = sanitizeHtml(content);
	}

}

export class RecommentDTO extends CommentDTO {

	@IsNotEmpty()
	@Length(36)
	@IsString()
	public parent_pk: string;

	public static toEntity( dto: RecommentDTO ): Recomment {
		const new_comment = super.toEntity(dto) as Recomment;
		new_comment.parent_pk = dto.parent_pk;

		return new_comment;
	}

}