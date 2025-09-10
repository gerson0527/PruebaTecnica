const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Observation',
  tableName: 'observations',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    encounterId: {
      type: 'uuid',
      name: 'encounter_id',
      nullable: false,
    },
    categoria: {
      type: 'varchar',
      nullable: false,
    },
    valor: {
      type: 'varchar',
      nullable: false,
    },
    unidad: {
      type: 'varchar',
      nullable: true,
    },
    fecha: {
      type: 'timestamp',
      nullable: false,
    },
    createdAt: {
      type: 'timestamp',
      name: 'created_at',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      name: 'updated_at',
      updateDate: true,
    },
  },
  relations: {
    encounter: {
      type: 'many-to-one',
      target: 'Encounter',
      joinColumn: { name: 'encounter_id' },
      onDelete: 'CASCADE',
    },
  },
});
