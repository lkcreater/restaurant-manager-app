import { z } from 'zod';

export const uploadFileSchema = z.object({
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.string(),
    size: z.number(),
    destination: z.string().optional(),
    filename: z.string().optional(),
    path: z.string().optional(),
});

export type UploadFileDto = z.infer<typeof uploadFileSchema>;

export class UploadResponseDto {
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
    path: string;
}
