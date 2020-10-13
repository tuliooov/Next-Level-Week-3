import express from 'express'; //FRAMEWORK DO NODE DE REQUISIÇÃO E RESPOSTA

const app = express(); //INICIAR

app.get('/users', (request, response) => {
    return response.json({message:'Hello World'})
});

app.listen(3333); //PORTA DO SERVIDOR localhost:3333

// REQ / RES