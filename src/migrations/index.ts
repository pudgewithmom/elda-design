import * as migration_20260805_120011_initial_schema from './20260805_120011_initial_schema';

export const migrations = [
  {
    up: migration_20260805_120011_initial_schema.up,
    down: migration_20260805_120011_initial_schema.down,
    name: '20260805_120011_initial_schema'
  },
];
