// @TODO : Modify

import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	OneToMany,
	JoinColumn,
	ManyToOne,
	ManyToMany,
	JoinTable
} from "typeorm";
import { IsNotEmpty } from "class-validator";

// @TODO : Import Module

/**
 * Account Entity
 */

@Entity({ name: "user" })
export class User {
	
	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@IsNotEmpty()
	@Column({ name: "email", length: 64 })
	email: string;

	@IsNotEmpty()
	@Column({ name: "password" })
	password: string;

	@IsNotEmpty()
	@Column({ name: "name", length: 64 })
	name: string;

	@Column({ name: "profile_image", length: 36, nullable: true })
	profile_image_pk: string;

	@OneToOne( (type) => Image, { nullable: true } )
	@JoinColumn({ name: "profile_image" })
	profile_image: Image | null;

	@OneToMany(
		type => GroupParticipant, 
		group_participant => group_participant.participant,
		{ cascade: true }
	)
	own_group: GroupParticipant[];

	@Column({ name: "status_msg", nullable: true })
	status_msg: string;

	@Column({ name: "refresh_token", nullable: true, select: false })
	refresh_token: string;

	async check_password(target: string): Promise<boolean> {
		return (this.password == target);
	}
}