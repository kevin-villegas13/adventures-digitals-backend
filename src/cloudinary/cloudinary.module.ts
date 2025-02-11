import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary-provier';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
