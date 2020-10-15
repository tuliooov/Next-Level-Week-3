
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orfanato from '../models/Orfanato'
import orfanatoView from '../views/orfanatos_view'
import * as Yup from 'yup'

export default {
    async mostrarOrfanato(request: Request, response: Response){
        const { id } = request.params
        const orfanatoRepositorio = getRepository(Orfanato) //nossa classe
        const orfanato = await orfanatoRepositorio.findOneOrFail(id, {
            relations: ['imagens']
        }) // apenas pegar
        // const orfanatos = await orfanatoRepositorio.find({
        //     //control espaço
        // }) // pegar com condicoes

        return response.json(orfanatoView.render(orfanato));
    },
    
    async mostrarOrfanatos(request: Request, response: Response){
        const orfanatoRepositorio = getRepository(Orfanato) //nossa classe
        const orfanatos = await orfanatoRepositorio.find({
            relations: ['imagens']
        }) // apenas pegar
        // const orfanatos = await orfanatoRepositorio.find({
        //     //control espaço
        // }) // pegar com condicoes

        return response.json(orfanatoView.renderMany(orfanatos));
    },

    async criar(request: Request, response: Response){
        // console.log(request.files)
        const {
            nome,
            latitude,
            longitude,
            sobre,
            instrucoes,
            horario_atendimento,
            fds_aberto,
        } = request.body
        
        const orfanatoRepositorio = getRepository(Orfanato) //nossa classe
    
        const requestImages = request.files as Express.Multer.File[] // faladno q é um array de arquivos
        
        const imagens = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            nome,
            latitude,
            longitude,
            sobre,
            instrucoes,
            horario_atendimento,
            fds_aberto: fds_aberto === 'true',
            imagens
        }


        const schema = Yup.object().shape({
            nome: Yup.string().required('Nome Obrigatorio!'),
            latitude: Yup.number().required('Latitude Obrigatorio!'),
            longitude: Yup.number().required('Longitude Obrigatorio!'),
            sobre: Yup.string().required('Sobre Obrigatorio!').max(300),
            instrucoes : Yup.string().required('Instruções Obrigatorio!'),
            horario_atendimento : Yup.string().required('Horario de Atendimento Obrigatorio!'),
            fds_aberto: Yup.boolean().required('Aberto Final de Semana Obrigatorio!'), 
            imagens: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required('Imagens Obrigatorio!')
                })
            )
        })
        console.log('2')

        const finalData = schema.cast(data)
        
        await schema.validate(data, { 
            abortEarly: false, //encontrar um campo nao valido, retornar o erro //falso pq ele quer q aparece o erro de todos nao validos
        });

        console.log('1')
        const orfanato = orfanatoRepositorio.create(data)// cria no banco
        await orfanatoRepositorio.save(orfanato)//salva no banco
    
        return response.status(201).json(orfanato)
    }
}