import {Column, MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602699338687 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: 'imagens',
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
                        name: 'path',
                        type: 'varchar',
                    },
                    {
                        name: 'orfanato_id',
                        type: 'integer',
                    }
                ],
                foreignKeys: [
                    {
                        name: 'ImagemOrfanato',
                        columnNames: ['orfanato_id'],
                        referencedTableName: 'orfanatos',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: '',
                    }
                ]
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('imagens')
    }

}
