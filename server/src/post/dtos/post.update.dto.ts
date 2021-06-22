import { IsNotEmpty, Length, IsEmail, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import sanitizeHtml from "sanitize-html";

export class PostUpdateDTO {

    @ApiProperty()
    @IsString()
	public title: string | null;

    @ApiProperty()
    @IsString()
	public text_content: string | null; 

    @ApiProperty()
    public del_img_list: string[] | null;

    @ApiProperty()
    @IsOptional()
    public url: string[] | null;

    public updateEntity( 
        target: { entity },
        postUpdateDTO: PostUpdateDTO   
    ) {
		const { 
            title, 
            text_content,
            // del_img_list,
            // url
        } = postUpdateDTO;

		if( title )
            target.entity.title = sanitizeHtml(title);

		if( text_content )
			target.entity.text_content = sanitizeHtml(text_content);

        // if( del_img_list )
		// 	target.entity.del_img_list = sanitizeHtml(del_img_list);

        // if( url )
		// 	target.entity.url = sanitizeHtml(url);
    }
}
