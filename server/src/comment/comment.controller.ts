import { Body, Controller, Get, Post, Delete, Put, Req, Param, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { Comment, Recomment } from '@comment/comment.entity';
import { CommentService, RecommentService } from '@comment/comment.service';
import { CommentDTO, RecommentDTO } from '@comment/comment.dto';

import { JwtAuthGuard } from '@auth/auth.guard';

@Controller('comment')
@ApiBearerAuth('access-token')
export class CommentController {

	constructor(
		private comment_service: CommentService,
		private recomment_service: RecommentService
	) { }

	@Post(':post_pk')
	@UseGuards(JwtAuthGuard)
	public async createComment(
		@Param("post_pk") target_post_pk: string,
		@Body() dto: CommentDTO,
		@Req() req,
	) {
		const account = req.user;
		dto.post_pk = target_post_pk

		const result = await this.comment_service.create(account.pk, dto);

		return { data: result };
	}

	@Post(':comment_pk/re')
	@UseGuards(JwtAuthGuard)
	public async createRecomment(
		@Param("comment_pk") comment_pk: string,
		@Body() dto: RecommentDTO,
		@Req() req,
	) {
		const account = req.user;
		dto.parent_pk = comment_pk;

		const result = await this.recomment_service.create(account.pk, dto);

		return { data: result };
	}



	@Get(':post_pk')
	@UseGuards(JwtAuthGuard)
	public async getCommentList(
		@Param("post_pk") target_post_pk: string,
		@Query('offset') offset: number,
		@Query('limit') limit: number,
		@Query('order_by') order_by: string,
		@Req() req,
	) {
		const account = req.user;

		const result = await this.comment_service.getList(
			target_post_pk, offset, limit, order_by
		);

		return { data: result };
	}

	@Get(':comment_pk/re')
	@UseGuards(JwtAuthGuard)
	public async getRecommentList(
		@Param("comment_pk") comment_pk: string,
		@Query('offset') offset: number,
		@Query('limit') limit: number,
		@Query('order_by') order_by: string,
		@Req() req,
	) {
		const account = req.user;

		const result = await this.recomment_service.getList(
			comment_pk, offset, limit, order_by
		);

		return { data: result };
	}



	@Put(':comment_pk')
	@UseGuards(JwtAuthGuard)
	public async update(
		@Param("comment_pk") target_comment_pk: string,
		@Body() dto: CommentDTO,
		@Req() req,
	) {
		const account = req.user;
		dto.comment_pk = target_comment_pk;

		const result = await this.comment_service.update(
			account.pk, dto
		);

		return { data: result };
	}

	@Delete(':comment_pk')
	@UseGuards(JwtAuthGuard)
	async delete(
		@Param("comment_pk") comment_pk: string,
		@Req() req,
	) {
		const account = req.user;

		const result = await this.comment_service.delete(
			account.pk, comment_pk
		);

		return { data: result };
	}

}