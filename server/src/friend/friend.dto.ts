import { IsNotEmpty, Length, IsEmail } from "class-validator";
import sanitizeHtml from 'sanitize-html';

import { Friend } from '@friend/friend.entity';

import { Account } from "@account/account.entity";
import { Image } from "@image/image.entity";

export class FriendDTO {

	@IsNotEmpty()
	public friend_pk: string;

	public static toEntity ( dto: FriendDTO ): Friend {
		const {friend_pk} = dto;
		
		const new_friend = new Friend();
		new_friend.friend_pk = sanitizeHtml(friend_pk);

		return new_friend;
	}
}
