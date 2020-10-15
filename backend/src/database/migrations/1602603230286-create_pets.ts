import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPets1602603230286 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'pets',
			columns: [
				{
					name: 'id',
					type: 'integer',
					unsigned: true,
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment',
				},
				{
					name: 'name',
					type: 'varchar',
				},
				{
					name: 'latitude',
					type: 'decimal',
					scale: 10,
					precision: 2,
				},
				{
					name: 'longitude',
					type: 'decimal',
					scale: 10,
					precision: 2,
				},
				{
					name: 'about',
					type: 'text',
				},
				{
					name: 'big',
					type: 'boolean',
					default: false,
				},
				{
					name: 'puppy',
					type: 'boolean',
					default: false,
				},
				{
					name: 'userName',
					type: 'varchar',
				},
				{
					name: 'userNumber',
					type: 'integer',
				},
			],
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('pets')
	}
}

