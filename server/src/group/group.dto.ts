import { IsNotEmpty, Length, IsEmail, IsEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import sanitizeHtml from 'sanitize-html';
import { ApiProperty } from '@nestjs/swagger';

import { Group } from './group.entity';
import { GroupParticipant } from '@group/group.entity';

export class GroupDTO {
	
	@ApiProperty()
	@IsOptional()
	@Length(36)
	@IsString()
	public group_pk: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	public title:string;

	@ApiProperty()
	@IsNotEmpty()
	@IsArray()
	public member_pk_list: string[];

	@ApiProperty()
	@IsOptional()
	public lowest_rank: number;

	@ApiProperty()
	@IsOptional()
	public highest_rank: number;

	public static toEntity ( dto: GroupDTO ): Group {
		const { title, lowest_rank, highest_rank } = dto;
		
		const new_group = new Group();
		new_group.title = sanitizeHtml(title);
		new_group.lowest_rank = lowest_rank;
		new_group.highest_rank = highest_rank;

		return new_group;
	}

	public static updateEntity( 
		target: { entity: Group },  
		dto: GroupDTO
	) {
		const { 
			title,
			lowest_rank, 
			highest_rank, 
		} = dto;

		if(title) 
			target.entity.title = sanitizeHtml(title);

		if(lowest_rank) 
			target.entity.lowest_rank = lowest_rank;

		if(highest_rank) 
			target.entity.highest_rank = highest_rank
	}
	
}

export class GroupParticipantDTO {

	@ApiProperty()
	@Length(36)
	@IsString()
	public participant_pk: string;

	@ApiProperty()
	@Length(36)
	@IsString()
	public group_pk: string;

	@ApiProperty()
	@IsOptional()
	public rank: number;

}