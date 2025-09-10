const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Encounter',
  tableName: 'encounters',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    patientId: {
      type: 'uuid',
      name: 'patient_id',
      nullable: false,
    },
    tipo: {
      type: 'varchar',
      nullable: false,
    },
    fecha: {
      type: 'timestamp',
      nullable: false,
    },
    motivo: {
      type: 'varchar',
      nullable: true,
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
    patient: {
      type: 'many-to-one',
      target: 'Patient',
      joinColumn: { name: 'patient_id' },
      onDelete: 'CASCADE',
    },
  },
});
