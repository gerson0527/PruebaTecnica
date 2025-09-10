const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Patient',
  tableName: 'patients',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    nombre: {
      type: 'varchar',
      nullable: false,
    },
    apellido: {
      type: 'varchar',
      nullable: false,
    },
    fechaNacimiento: {
      type: 'date',
      name: 'fecha_nacimiento',
      nullable: false,
    },
    sexo: {
      type: 'varchar',
      nullable: false,
    },
    direccion: {
      type: 'varchar',
      nullable: true,
    },
    telefono: {
      type: 'varchar',
      nullable: true,
    },
    email: {
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
});
