import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
    ApiTags,
    ApiOperation,
    ApiConsumes,
    ApiBody,
    ApiResponse,
} from '@nestjs/swagger';
import { UploadsService } from './uploads.service';
import { UploadResponseDto } from './dto/upload.dto';

@ApiTags('Uploads')
@Controller()
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) { }

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
            limits: {
                fileSize: 5 * 1024 * 1024, // 5MB
            },
        }),
    )
    @ApiOperation({ summary: 'Upload a single file' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'File uploaded successfully',
        type: UploadResponseDto,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
    ): Promise<UploadResponseDto> {
        return this.uploadsService.uploadFile(file);
    }

    @Post('multiple')
    @UseInterceptors(
        FilesInterceptor('files', 10, {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
            limits: {
                fileSize: 5 * 1024 * 1024, // 5MB per file
            },
        }),
    )
    @ApiOperation({ summary: 'Upload multiple files (max 10)' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Files uploaded successfully',
        type: [UploadResponseDto],
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async uploadMultipleFiles(
        @UploadedFiles() files: Express.Multer.File[],
    ): Promise<UploadResponseDto[]> {
        return this.uploadsService.uploadMultipleFiles(files);
    }
}
