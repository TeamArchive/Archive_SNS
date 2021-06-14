import { IsNotEmpty, Length, IsEmail } from "class-validator";
import { Image } from "./image.entity";
import sanitizeHtml from 'sanitize-html';
import { ApiProperty } from "@nestjs/swagger";

export class ImageDTO {
	
	@ApiProperty()
	@IsNotEmpty()
	url: string;

	public toEntity(): Image {
		const { url } = this;

		const newImage = new Image;
		newImage.url = sanitizeHtml(url);

		return newImage;
	}

	public updateEntity(target) {
		const { url } = this;

		target.entity.url = sanitizeHtml(url);
	}

	public fromJson(json) {
		const { url } = json

		this.url = sanitizeHtml(url);
	}
}
