import { Body, Controller, Get, Post, Delete, Put, Req, Param, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { Friend } from '@friend/friend.entity';
import { FriendRepo } from '@friend/friend.repo';
import { FriendService } from '@friend/friend.service';

import { JwtAuthGuard } from '@auth/auth.guard';

@Controller('friend')
@ApiBearerAuth('access-token')
export class FriendController {

	constructor (private friend_service : FriendService) { }

	@Get()
	@UseGuards(JwtAuthGuard)
	public async getAll( 
		@Query('accept') accept: boolean | null,
		@Req() req,
	) {
		const account = req.user;
		let result = undefined;

		if(accept) {
			if (accept === true)
				result = await this.friend_service.getAccepted( account.pk );
			else
				result = await this.friend_service.getNotAccepted( account.pk );
		}
		else {
			result = await this.friend_service.getAll( account.pk );
		}

		return { data: result };
	}

	@Post('/add')
	@UseGuards(JwtAuthGuard)
	public async add(
		@Param("target_pk") target_pk: string,
		@Req() req,
	) {
		const account 	= req.user;
        const result 	= await this.friend_service.add( account.pk, target_pk );
        
		return { data: result };
	}

	@Put('/accpet/:target_pk')
	@UseGuards(JwtAuthGuard)
	public async accpt(
		@Param("target_pk") target_pk: string,
        @Req() req,
    ){
        const account 	= req.user;
        const result 	= await this.friend_service.accept( account.pk, target_pk );
        
		return { data: result };
    }

	@Delete(':target_pk')
	@UseGuards(JwtAuthGuard)
    async delete(
		@Param("target_pk") target_pk: string,
        @Req() req,
    ){
		const account 	= req.user;
        const result 	= await this.friend_service.delete( account.pk, target_pk );
        
		return { data: result };
    }

}