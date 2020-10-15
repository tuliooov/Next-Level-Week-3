import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

interface ValidationErrors {
    [key: string]: string[]; 
}
const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    console.log(4)
    if(error instanceof ValidationError){ // se for um erro de validação
        let errors: ValidationErrors = {}
        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        })
        console.error(error);


        return response.status(400).json({message: "Validação Errada", errors})
    }

    console.error(error);
    return response.status(500).json({message: 'Erro no servidor!'})
}

export default errorHandler;