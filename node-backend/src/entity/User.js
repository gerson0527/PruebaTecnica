const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    username: {
      type: 'varchar',
      unique: true,
    },
    passwordHash: {
      type: 'varchar',
      name: 'password_hash',
    },
    nombre: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    role: {
      type: 'varchar',
      default: 'user',
    },
    isActive: {
      type: 'boolean',
      name: 'is_active',
      default: true,
    },
    professionalLicense: {
      type: 'varchar',
      name: 'professional_license',
      nullable: true,
    },
    specialty: {
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
