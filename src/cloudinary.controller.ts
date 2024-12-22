// src/cloudinary/cloudinary.controller.ts
import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { CloudinaryService } from './cloudinary.service';
  
  @Controller('upload')
  export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}
  
    @Post()
    @UseInterceptors(FileInterceptor('file')) // Intercept 'file' field in the request
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
      try {
        const imageUrl = await this.cloudinaryService.uploadImage(file);
        return { url: imageUrl };
      } catch (error) {
        return { message: 'Failed to upload image', error };
      }
    }
  }
  