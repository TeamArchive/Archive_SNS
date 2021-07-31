import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, Session, UnauthorizedException, UseGuards} from '@nestjs/common';
import { ImageDTO } from '../image/image.dto';
import { JwtAuthGuard, LocalAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostDTO } from './dtos/post.dto';
import { PostListDTO } from './dtos/postList.dto';
import { OwnListDTO } from './dtos/postOwnList.dto';

@Controller('/post')
export class PostController {

    constructor( private postService : PostService ) {}
    
    // @UseBefore(ProfileImageMulter.single('image'))
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async CreatePost(
        @Body() postDTO: PostDTO,
        @Req() req,
    ){
        console.log("postDTO : ", postDTO);
        console.log("req : ", req.user);
        console.log("req : ", req.files);


        // const path = req.files.map(img => img.path);

        // const img_dto = [];
        // path.map(img_path => {
        //     const new_dto = new ImageDTO;
        //     new_dto.url = img_path;
        //     img_dto.push(new_dto);
        // });
        
        const createPost_result = await this.postService.CreatePost(
            req.user.pk, 
            postDTO, 
            // img_dto
        );

        return { data : createPost_result };
    }

    // @ApiBearerAuth('access-token')
    // @UseGuards(JwtAuthGuard)
    // @Put('/:post_pk')
    // async UpdatePost(
    //     @Param("post_pk") post_pk: string,
    //     @Req() req,    // req.user = pk, email
    //     @Body() postDTO: PostDTO,
    //     @Body() body
    // ){
    //     console.log("postDTO :", postDTO);
    //     console.log("body: ", body);
    //     const del_img_list = body.del_img_list

    //     let ImgDTO: ImageDTO[];
        
    //     for(let i = 0; i < body.url.Length; i++) {
    //         const temp_img_dto = new ImageDTO;
    //         temp_img_dto.url = body.url;

    //         ImgDTO.push(temp_img_dto);
    //     }

    //     const UpdatePost_Result = await this.postService.UpdatePost(
    //         req.user.pk,
    //         post_pk,
    //         postDTO,
    //         ImgDTO,
    //         del_img_list
    //     );

    //     return { data : UpdatePost_Result };
    // }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @Delete('/:post_pk')
    async DeletePost(
        @Param("post_pk") post_pk: string,
        @Req() req,    // req.user = pk, email
    ){
        return { data : await this.postService.DeletePost( req.user.pk, post_pk ) };
    }

    @Get("/:post_pk")
    async GetSinglePost(
        @Param("post_pk") post_pk: string,
    ){
        return { data : await this.postService.GetSinglePost( post_pk ) };
    }

    @Post("/list")
    async GetPostList(
        @Body() postListDTO: PostListDTO,
    ){
        return { data : await this.postService.GetPostList( postListDTO ) };
    }

    @Get("/list/:writer_pk")
    async GetOwnPost(
        @Param('writer_pk') writer_pk: string,
        @Body() ownListDTO: OwnListDTO,
    ){
        return { data : await this.postService.GetOwnPost( writer_pk, ownListDTO ) };
    }
}