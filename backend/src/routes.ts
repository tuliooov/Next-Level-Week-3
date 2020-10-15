
import { Router } from 'express'
import multer from 'multer'

import uploadigConfig from './config/upload'
import OrfanatosController from './controllers/OrfanatosController'

const routes = Router()
const upload = multer(uploadigConfig)


//MVC
// Model - Representatividade
// Views - Como é visualizada
// Controllers - Logica das rotas

routes.post('/criar-orfanatos', upload.array('imagens'), OrfanatosController.criar);
routes.get('/mostrar-orfanato/:id', OrfanatosController.mostrarOrfanato);
routes.get('/mostrar-todos-orfanatos', OrfanatosController.mostrarOrfanatos);

export default routes