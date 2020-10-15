import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Imagens from './Imagens'
@Entity('orfanatos')
export default class Orfanato{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nome: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    sobre: string;

    @Column()
    instrucoes: string;

    @Column()
    horario_atendimento: string;

    @Column()
    fds_aberto: boolean;

    @OneToMany(() => Imagens , imagem => imagem.orfanato, {
        cascade: ['insert', 'update'] 
    })
    @JoinColumn({ name: 'orfanato_id' })
    imagens: Imagens[];
}