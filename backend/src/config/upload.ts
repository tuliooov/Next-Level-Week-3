import { request } from 'express';
import multer from 'multer' //biblioteca de imagens
import path from 'path'; // do node, para andar entre as pastas

export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName);
        },
    })
}