import * as migration_20260111_200636 from './20260111_200636';

export const migrations = [
  {
    up: migration_20260111_200636.up,
    down: migration_20260111_200636.down,
    name: '20260111_200636'
  },
];
