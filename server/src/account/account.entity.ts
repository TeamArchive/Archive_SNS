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
	JoinTable,
	BeforeInsert,
	BeforeUpdate
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import * as bcrypt from 'bcrypt';
// import { GroupParticipant } from "src/group/group.entity";
import { Image } from '../image/image.entity'
import { InternalServerErrorException } from "@nestjs/common";

@Entity({ name: "account" })
export class Account {
	
	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@IsNotEmpty()
	@Column({ name: "name", length: 64 })
	name: string;

	@IsNotEmpty()
	@Column({ name: "email", length: 64 })
	email: string;

	@Column({ name: "password", nullable: true })
	password: string;

	@Column({ name: "profile_image", length: 36, nullable: true })
	profile_image_pk: string | null;

	@OneToOne((type) => Image, { 
		nullable: true, 
		cascade: true,
		onDelete: "CASCADE"
	})
	@JoinColumn({ name: "profile_image" })
	profile_image: Image | null;

	// @Column({ name: "profile_img_url", nullable: true })
	// profile_img_url: string | null;

	// @OneToMany(
	// 	type => GroupParticipant, 
	// 	group_participant => group_participant.participant,
	// 	{ cascade: true }
	// )
	// own_group: GroupParticipant[];

	@Column({ name: "status_msg", nullable: true })
	status_msg: string;

	@Column({ name: "refresh_token", nullable: true })
	refresh_token: string;

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword(): Promise<void> {
		if (this.password) {
			try {
				this.password = await bcrypt.hash(this.password, 10);
			} catch (e) {
				console.log(e);
				throw new InternalServerErrorException();
			}
		}
	}

	async checkPassword(aPassword: string): Promise<boolean> {
		try {
			const compare_result = await bcrypt.compare(aPassword, this.password);
			console.log('aPassword :', aPassword,' this.password : ', this.password)
			console.log(compare_result);

			return compare_result;
		} catch (e) {
			console.log(e);
			throw new InternalServerErrorException();
		}
	}
}

