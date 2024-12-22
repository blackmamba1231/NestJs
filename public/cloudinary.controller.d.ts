import { CloudinaryService } from './cloudinary.service';
export declare class CloudinaryController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
        message?: undefined;
        error?: undefined;
    } | {
        message: string;
        error: any;
        url?: undefined;
    }>;
}
