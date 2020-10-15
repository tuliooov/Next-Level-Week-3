import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrfanatos1602695317502 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orfanatos',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true, //sempre positiva
                    isPrimary: true,
                    isGenerated: true, //gerar essa coluna automaticamente
                    generationStrategy: 'increment' //gerada automaticamente incremental //aumenta id 1, 2,  3...
                },
                {
                    name: 'nome',
                    type: 'varchar',
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10, //numeros dps da virgula
                    precision: 2, //numeros antes da virgual
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10, //numeros dps da virgula
                    precision: 2, //numeros antes da virgual
                },
                {
                    name: 'sobre',
                    type: 'text',
                },
                {
                    name: 'instrucoes',
                    type: 'text',
                },
                {
                    name: 'horario_atendimento',
                    type: 'varchar',
                },
                {
                    name: 'fds_aberto',
                    type: 'boolean',
                    default: false,
                }

            ]
        }));
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orfanatos')
    }

}
