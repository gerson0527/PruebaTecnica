const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Diagnosis',
  tableName: 'diagnoses',
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
    cie10Code: {
      type: 'varchar',
      name: 'cie10_code',
      nullable: false,
    },
    descripcion: {
      type: 'varchar',
      nullable: false,
    },
    principal: {
      type: 'boolean',
      nullable: false,
      default: false,
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
