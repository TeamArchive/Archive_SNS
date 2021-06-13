import { IsNotEmpty, Length, IsEmail, IsEmpty, IsString, IsArray, IsOptional } from 'class-validator';
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
	public highest_rank: number;

	@ApiProperty()
	@IsOptional()
	public lowest_rank: number;

	public toEntity(): Group {
		const { title } = this;
		const new_group = new Group();
		new_group.title = title;

		return new_group;
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