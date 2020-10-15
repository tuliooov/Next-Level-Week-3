import Orfanato from '../models/Orfanato'
import imagensView from './imagens_views'

export default{
    render(orfanato: Orfanato){
        return {
            id: orfanato.id,
            nome: orfanato.nome,
            latitude: orfanato.latitude,
            longitude: orfanato.longitude,
            sobre: orfanato.sobre,
            instrucoes: orfanato.instrucoes,
            horario_atendimento: orfanato.horario_atendimento,
            fds_aberto: orfanato.fds_aberto,
            imagens: imagensView.renderMany(orfanato.imagens)
        }
    },
    renderMany(orfanatos: Orfanato[]){
        return orfanatos.map( orfanato => this.render(orfanato))
    }
}