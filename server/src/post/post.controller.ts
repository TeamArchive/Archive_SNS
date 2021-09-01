import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, Session, UnauthorizedException, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import { ImageDTO } from '../image/image.dto';
import { JwtAuthGuard, LocalAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostDTO } from './dtos/post.dto';
import { PostListDTO } from './dtos/postList.dto';
import { OwnListDTO } from './dtos/postOwnList.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '@root/middleware/multerOptions';
import UploadService from '@root/image/upload.service';

@Controller('/post')
export class PostController {

    constructor( 
        private postService: PostService,
        private uploadService: UploadService
    ) {}
    
    /**
     * 게시물을 작성한다.
     * @param postDTO 
     * @param req 
     * @param files 
     * @returns 
     */
    // FilesInterceptor 첫번째 매개변수: formData의 key값,
    // 두번째 매개변수: 파일 최대 갯수
    @ApiBearerAuth('access-token')
    @UseInterceptors(FilesInterceptor('images', null, multerOptions))    
    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async CreatePost(
        @Body() postDTO: PostDTO,
        @Req() req, // req.user = pk, email
        @UploadedFiles() files: File[]
    ){
        const uploadedFiles: string[] = this.uploadService.uploadFiles(files);
        console.log("uploadedFiles : ", uploadedFiles);
        
        const img_dto = [];
        uploadedFiles.map(img_path => {
            const new_dto = new ImageDTO;
            new_dto.url = img_path;
            img_dto.push(new_dto);
        });
        
        const createPost_result = await this.postService.CreatePost(
            req.user.pk, 
            postDTO, 
            img_dto
        );

        return { data : createPost_result };
    }

    /**
     * 게시물을 수정한다.
     * @param post_pk 
     * @param req 
     * @param postDTO 
     * @param del_img_list 
     * @param files 
     * @returns 
     */
    @ApiBearerAuth('access-token')
    @UseInterceptors(FilesInterceptor('images', null, multerOptions))
    @UseGuards(JwtAuthGuard)
    @Put('/:post_pk')
    async UpdatePost(
        @Param("post_pk") post_pk: string,
        @Req() req,    // req.user = pk, email
        @Body() postDTO: PostDTO,
        @Body() del_img_list: string[],
        @UploadedFiles() files: File[]
    ){
        console.log("body: ", files);
        const uploadedFiles: string[] = this.uploadService.uploadFiles(files);
        console.log("uploadedFiles :", uploadedFiles);
        
        const ImgDTO = [];
        for(let i = 0; i < uploadedFiles.length; i++) {
            const temp_img_dto = new ImageDTO;
            temp_img_dto.url = uploadedFiles[i];
            console.log("testtest : ", temp_img_dto.url)
            ImgDTO.push(temp_img_dto);
        }

        const UpdatePost_Result = this.postService.UpdatePost(
            req.user.pk,
            post_pk,
            postDTO,
            ImgDTO,
            del_img_list
        );

        return { data : UpdatePost_Result };
    }

    /**
     * 게시물을 삭제한다.
     * @param post_pk 
     * @param req 
     * @returns 
     */
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