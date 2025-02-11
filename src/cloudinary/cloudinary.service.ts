import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from 'src/common/response/type/cloudinary-response';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    try {
      const readableStream = Readable.from(file.buffer);

      const uploadPromise = new Promise<CloudinaryResponse>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'uploads',
              resource_type: 'auto',
            },
            (error, result) => {
              if (error) {
                reject(
                  new InternalServerErrorException(
                    `Cloudinary error: ${error.message}`,
                  ),
                );
              } else {
                resolve(result as CloudinaryResponse);
              }
            },
          );

          readableStream.pipe(uploadStream);
        },
      );

      return await uploadPromise;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error uploading file to Cloudinary: ${error.message}`,
      );
    }
  }
}
