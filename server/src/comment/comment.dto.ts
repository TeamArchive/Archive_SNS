import { IsNotEmpty, Length, IsEmail, IsString, IsEmpty, IsOptional } from "class-validator";
import { Comment, ParentComment, ChildComment } from '@comment/comment.entity';
import sanitizeHtml from 'sanitize-html';

export class CommentDTO {

	@IsOptional()
	@IsString()
	@Length(36)
	public comment_pk: string;
	
	@IsNotEmpty()
	@IsString()
	public content: string

	public static toEntity( dto: CommentDTO ): Comment{
		const { content } = dto;

		const new_comment = new Comment();
		new_comment.content = sanitizeHtml(content);
		
		return new_comment;
	}
}

export class ParentCommentDTO extends CommentDTO {
	
	@IsNotEmpty()
	@Length(36)
	@IsString()
	public post_pk;

	public static toEntity( dto: ParentDTO ): ParentComment {
		const new_ent: ParentComment = super.toEntity(dto) as ParentComment;

		new_ent.post_pk = sanitizeHtml(dto.post_pk);

		return new_ent;
	}

}