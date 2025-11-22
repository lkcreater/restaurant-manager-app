import { Injectable, BadRequestException } from '@nestjs/common';
import { UploadResponseDto } from './dto/upload.dto';

@Injectable()
export class UploadsService {
    async uploadFile(file: Express.Multer.File): Promise<UploadResponseDto> {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        return {
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            path: file.path,
        };
    }

    async uploadMultipleFiles(
        files: Express.Multer.File[],
    ): Promise<UploadResponseDto[]> {
        if (!files || files.length === 0) {
            throw new BadRequestException('No files uploaded');
        }

        return files.map((file) => ({
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            path: file.path,
        }));
    }
}
