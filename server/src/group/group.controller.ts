import { Body, Controller, Get, Post, Delete, Put, Req, Param, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { ChatGroupService, PostGroupService } from '@group/group.service';
import { GroupDTO, GroupParticipantDTO } from '@group/group.dto';

import { JwtAuthGuard, LocalAuthGuard } from '@auth/auth.guard';

// Service Type
type ST = (ChatGroupService | PostGroupService)

@ApiBearerAuth('access-token')
abstract class GroupController<T extends ST> {
	
	protected group_service: T;

	constructor (group_service: T) {
		this.group_service = group_service;
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	public async search ( 
		@Query('q') query: string, 
		@Req() req
	) {
		const account 	= req.user;
		const result	= this.group_service.search(query);

		// @TODO : Own Group Search

		return { data: result };
	}

	@Post('/create')
	@UseGuards(JwtAuthGuard)
	public async create( 
		@Body() group_dto: GroupDTO,
		@Req() req, 
	) {
		const account 	= req.user;
		const result 	= await this.group_service.create( account.pk, group_dto );

		return { data: result };
	}

	@Put('/update')
	@UseGuards(JwtAuthGuard)
	public async update(
		@Body() dto: GroupDTO,
		@Req() req,
	) {
		const account 	= req.user;
		const result	= await this.group_service.update( account.pk, dto );

		return { data: result };
	}

	@Post('/invite')
	@UseGuards(JwtAuthGuard)
	public async invite(
		@Body() group_dto: GroupDTO,
        @Req() req,
    ){
        const account 	= req.user;
        const result 	= await this.group_service.invite( account.pk, group_dto );
        
		return { data: result };
    }

	@Delete('/exit/:group_pk')
	@UseGuards(JwtAuthGuard)
	public async exit(
		@Param("group_pk") group_pk: string,
		@Req() req,
	) {
		const account = req.user;
		const result = await this.group_service.exit( {
			group_pk: group_pk,
			participant_pk: account.pk,
		} as GroupParticipantDTO );

		return { data: result };
	}

	@Put('/rank')
	@UseGuards(JwtAuthGuard)
	public async updateRank(
		@Body() dto: GroupParticipantDTO,
		@Req() req,
	) {
		const account	= req.user;
		const result 	= this.group_service.updateRank(account.pk, dto);

		return { data: result };
	}

}

@Controller('post_group')
export class PostGroupControlller extends GroupController<PostGroupService> {

	constructor(group_service : PostGroupService) {
		super(group_service);
	}

	@Delete()
	@UseGuards(JwtAuthGuard)
    async delete(
		@Param("group_pk") group_pk: string,
        @Req() req,
    ){
        const account 	= req.user;
        const result 	= await this.group_service.delete({
			participant_pk: account.pk, 
			group_pk: group_pk 
		} as GroupParticipantDTO);
        
		return { data: result };
    }

}

@Controller('chat_group')
export class ChatGroupControlller extends GroupController<ChatGroupService> {

	constructor(group_service : ChatGroupService) {
		super(group_service);
	}

}