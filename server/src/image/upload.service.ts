import { Injectable } from "@nestjs/common";
import { createImageURL } from "@middleware/multerOptions";

@Injectable()
export default class UploadService {

    /**
     * 여러 파일을 저장한다.
     * @param files 
     * @returns 
     */
    public uploadFiles(files: File[]): string[] {
        const generatedFiles: string[] = [];

        for (const file of files) {
            generatedFiles.push(createImageURL(file));
            // http://localhost:8080/public/파일이름 형식으로 저장이 됩니다.
        }

        return generatedFiles;
    }


}