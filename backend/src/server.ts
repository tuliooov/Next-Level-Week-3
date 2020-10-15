import express from 'express'; //FRAMEWORK DO NODE DE REQUISIÇÃO E RESPOSTA
import 'express-async-errors'   
import path from 'path'
import cors from 'cors'
import './database/connection.ts'
import routes from './routes'
import errorHandler from './errors/handler'
const app = express(); //INICIAR

// app.use(cors({
//     origin: 
// }))
app.use(cors())
app.use(express.json());
app.use(routes); // inicia as opcoes de funcoes
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)
 
app.listen(3333); //PORTA DO SERVIDOR localhost:3333