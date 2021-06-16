import { Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sanitizeHtml from 'sanitize-html';

import { ParentComment, ChildComment } from '@comment/comment.entity';
import { ParentCommentRepo, ChildCommentRepo } from '@comment/comment.repo';
import { CommentDTO, ParentCommentDTO } from '@comment/comment.dto';

import { AccountService } from '@account/account.service';

import { PostGroupService } from '@root/group/group.service';

type RT = (ParentCommentRepo | ChildCommentRepo);
type ET = (ParentComment | ChildComment);

class CommentService<
	RepoType extends RT,
	EntType extends ET
> {
	protected comment_repo;

	constructor(
		comment_repo: RepoType,
	) {
		this.comment_repo = comment_repo;
	}

	/**
	 * Update Comment Service
	 * 
	 * @param writer_pk : writer's PK
	 * @param comment_pk : comment's PK
	 * @param comment_dto : Update comment DTO
	 */
	public async UpdateComment(
		writer_pk : string,
		comment_dto : CommentDTO,
	) : Promise<EntType> 
	{
		const test = new ParentCommentRepo;
		test.findOne()

		const target = {
			entity: await this.comment_repo.findOne(
				{ where: {pk: comment_dto.comment_pk}}
			)
		}
		
		if( target.entity?.writer_pk === writer_pk ) {
			comment_dto.updateEntity(target);
			await this.comment_repo.save(target.entity);
			return target.entity;
		}
		
		return null;
	}

	/**
	 * Delete Post Service
	 * 
	 * @param writer_pk : Writer's PK
	 * @param comment_pk : Comment's PK
	 */
	public async DeleteComment(
		writer_pk : string,
		comment_pk : string
	): Promise<boolean> 
	{
		const target = await this.comment_repo.findOne({ 
			where: {pk: comment_pk}
		});

		if( target?.writer_pk === writer_pk ) {
			await this.comment_repo.delete(target);
			return true;
		}

		return false;
	}
}

@Injectable()
export class  extends CommentService< ParentCommentRepo, ParentComment> {

	constructor(
		private post_group_service: PostGroupService,
		comment_repo : ParentCommentRepo,
	) {
		super(comment_repo);
	}

	/**
	 * Create Comment Service
	 * 
	 * @param writer_pk : Writer's PK
	 * @param post_pk : post's PK which want to post a comment
	 * @param comment_dto : Create comment DTO
	 */
	public async CreateComment(
		writer_pk : string,
		group_pk: string,
		dto : ParentCommentDTO
	) : Promise<{comment: ParentComment}> {

		const comment_ent : ParentComment = CommentDTO.toEntity(dto) as ParentComment;

		comment_ent.writer_pk 	= writer_pk;

		const comment_result = await this.comment_repo.save(comment_ent);

		const recivers = await this.post_group_service.getRecivers(writer_pk, group_pk);

		return comment_result,
	}

	public async GetPostComment(
		post_pk: string,
		offset: number,
		limit: number,
		order_by: string
	) {
		return await this.comment_repo
			.GetComment(post_pk, offset, limit, order_by);
	}

}