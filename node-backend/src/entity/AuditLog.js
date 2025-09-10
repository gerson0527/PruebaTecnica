const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'AuditLog',
  tableName: 'audit_logs',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    entity: {
      type: 'varchar',
      nullable: false,
    },
    entityId: {
      type: 'uuid',
      name: 'entity_id',
      nullable: true,
    },
    action: {
      type: 'varchar',
      nullable: false,
    },
    userId: {
      type: 'uuid',
      name: 'user_id',
      nullable: true,
    },
    diffJson: {
      type: 'json',
      name: 'diff_json',
      nullable: true,
    },
    ipAddress: {
      type: 'varchar',
      name: 'ip_address',
      nullable: true,
    },
    createdAt: {
      type: 'timestamp',
      name: 'created_at',
      createDate: true,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'user_id' },
      onDelete: 'SET NULL',
    },
  },
});
