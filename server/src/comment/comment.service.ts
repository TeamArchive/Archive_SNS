import { Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sanitizeHtml from 'sanitize-html';

import { Comment, Recomment } from '@comment/comment.entity';
import { CommentRepo, RecommentRepo } from '@comment/comment.repo';
import { CommentDTO, RecommentDTO } from '@comment/comment.dto';

import { Post } from '@post/post.entity';
import { PostRepo } from '@post/post.repo';

type RT = (CommentRepo | RecommentRepo);
type ET = (Comment | Recomment);

class CommentServiceImpl<RepoType extends RT, EntType extends ET> {
	protected repo;

	constructor(repo: RepoType) {
		this.repo = repo;
	}

	/**
	 * Update comment
	 * 댓글 수정 
	 * 
	 * @param writer_pk : writer's PK
	 * @param dto : DTO with comments to be edited
	 * @returns Return edited entity, if can't edit it will returning status code
	 */
	public async update(
		writer_pk: string,
		dto: CommentDTO,
	): Promise<EntType | number> {

		const test = new CommentRepo;
		test.findOne()

		const target = {
			entity: await this.repo.findOne(
				{ where: { pk: dto.comment_pk } }
			)
		}

		if (!target.entity.writer_pk)
			return 400

		else if (target.entity.writer_pk === writer_pk) {
			CommentDTO.updateEntity(target, dto);
			await this.repo.save(target.entity);
			return target.entity;
		}
		else return 403;
	}

	/**
	 * Delete Comment
	 * 댓글 삭제
	 * 
	 * @param writer_pk 
	 * @param comment_pk 
	 * @returns 
	 */
	public async delete(
		writer_pk: string,
		comment_pk: string
	): Promise<boolean | number> {

		const target = await this.repo.findOne({
			where: { pk: comment_pk }
		});

		if (!target.writer_pk)
			return 400;

		else if (target.writer_pk === writer_pk) {
			await this.repo.delete(target);
			return true;
		}
		else return false;
	}

	/**
	 * Commend list getter
	 * 댓글 목록 얻기
	 * 
	 * @param target_pk : PK of the post with comments which is want to get ( if wanna recommand, put in the commant PK instead of post PK )
	 * @param offset : 
	 * @param limit : 
	 * @param order_by :  
	 * @returns 
	 */
	public async getList(
		target_pk: string,
		offset: number,
		limit: number,
		order_by: string
	): Promise<Comment[]> {
		return await this.repo.getList(
			target_pk, offset, limit, order_by
		);
	}
}

@Injectable()
export class CommentService extends CommentServiceImpl<CommentRepo, Comment> {

	private comment_repo: CommentRepo;

	constructor(
		comment_repo: CommentRepo,
		private post_repo: PostRepo
	) {
		super(comment_repo);
		this.comment_repo = this.repo;
	}

	/**
	 * Create comment
	 * 코맨트 생성
	 * 
	 * @param writer_pk : Writer's PK
	 * @param dto : Comment DTO
	 * @returns 
	 */
	public async create(
		writer_pk: string,
		dto: CommentDTO
	): Promise<Comment | number> {

		const target: Post = await this.post_repo.findOne(dto.post_pk);
		if (!target)
			return 400;

		const ent: Comment = CommentDTO.toEntity(dto) as Comment;
		ent.writer_pk = writer_pk;

		return await this.comment_repo.save(ent);
	}

}

@Injectable()
export class RecommentService extends CommentServiceImpl<RecommentRepo, Recomment> {

	private recomment_repo: RecommentRepo;

	constructor(
		recomment_repo: RecommentRepo,
		private comment_repo: CommentRepo
	) {
		super(recomment_repo);
		this.recomment_repo = this.repo;
	}

	/**
	 * Create recomment
	 * 리코맨트 생성
	 * 
	 * @param writer_pk : Writer's PK
	 * @param dto : Recomment DTO
	 * @returns 
	 */
	public async create(
		writer_pk: string,
		dto: RecommentDTO
	): Promise<Comment | number> {

		const target: Comment = await this.comment_repo.findOne(dto.parent_pk);
		if (!target)
			return 400;

		dto.post_pk = target.post_pk;
		const ent: Recomment = RecommentDTO.toEntity(dto) as Recomment;
		ent.writer_pk = writer_pk;

		return await this.recomment_repo.save(ent);
	}

}