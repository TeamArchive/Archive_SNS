import { Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sanitizeHtml from 'sanitize-html';

import { Friend } from '@friend/friend.entity';
import { FriendRepo } from '@friend/friend.repo';

import { AccountService } from '@account/account.service';

@Injectable()
export class FriendService {

	constructor (
		private friend_repo: FriendRepo,
		private account_service: AccountService
	) { }
	
	/**
	 * Add Friend
	 * 친구 추가
	 * 
	 * @param sender_pk
	 * @param receiver_pk 
	 * @returns if added successfully, return entity. if not return status code
	 */
	public async add(
		sender_pk: string,
		receiver_pk: string
	): Promise<Friend | number> {

		const ent = new Friend();
		ent.account_pk 	= sanitizeHtml(sender_pk);
		ent.friend_pk 	= sanitizeHtml(receiver_pk);

		/**
		 * < Check -> if sender/receiver exists >
		 */
		const receiver = this.account_service.findOne({ 
			where: { pk: ent.friend_pk }
		});
		if (!receiver)
			return 400;

		/**
		 * < Check -> whether the recipient already friend >
		 */
		const isFriend = await this.friend_repo.findOne({ 
			where: {  
				account_pk 	: ent.account_pk,
				friend_pk	: ent.friend_pk
		}});
		if (isFriend)
			return ;

		console.log(ent);

		/**
		 * < Add Friend >
		 */
		return await this.friend_repo.save( ent );
	}



	public async getAll( account_pk: string ): Promise<Friend[]> {

		return await this.friend_repo.getList( account_pk );
	}



	public async getNotAccepted( account_pk: string ): Promise<Friend[]> {

		return await this.friend_repo.getBidirectly( account_pk, true );
	}



	public async getAccepted( account_pk: string ): Promise<Friend[]> {

		return await this.friend_repo.getBidirectly( account_pk, false );
	}



	public async accept(
		accept_pk: string,
		sender_pk: string
	): Promise<Friend | number> {

		/**
		 * < Check -> is it exist and already accepted >
		 */
		const friend = await this.friend_repo.findOne({ 
			where: {  
				account_pk 	: sanitizeHtml(sender_pk),
				friend_pk	: sanitizeHtml(accept_pk)
		}});
		if (!friend)
			return 400;

		if (friend.accept)
			return 400;

		/**
		 * < Accept >
		 */
		friend.accept = true;
		await this.friend_repo.save( friend );

		const ent = new Friend();
		ent.account_pk 	= friend.friend_pk;
		ent.friend_pk 	= friend.account_pk;
		ent.accept 		= true;
		return await this.friend_repo.save( ent );
	}



	public async delete(
		sender_pk: string,
		receiver_pk: string
	): Promise<boolean | number> {
		/**
		 * < Check -> is it exist and already accepted >
		 */
		const friend = await this.friend_repo.findOne({ 
			where: {  
				account_pk 	: sanitizeHtml(sender_pk),
				friend_pk	: sanitizeHtml(receiver_pk)
		}});
		if (!friend)
			return 400;

		/**
		 * < Delete >
		 */
		const result = await this.friend_repo.remove(friend)
		if( !result )
			return false;
		
		return true;
	}

}