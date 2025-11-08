import { AppDataSource } from './data-source';
import {
  userFactory,
  profileFactory,
  broLocksFactory,
  lockItemsFactory,
} from './seeds/user-factory';
import { User } from 'src/user/user.entity';
import { Profile } from 'src/profile/profile.entity';
import { BroLock } from 'src/bro-lock/entity/bro-lock.entity';
import { LockItem } from 'src/bro-lock/entity/lock-item.entity';

var logColor = '\x1b[44m%s\x1b[0m';
var successLogColor = '\x1b[42m%s\x1b[0m';
var errLogColor = '\x1b[41m%s\x1b[0m';
var warnLogColor = '\x1b[43m%s\x1b[0m';

async function run() {
  console.warn(warnLogColor, 'Seed start');

  if (process.env.NODE_ENV === 'prod') {
    console.error('Refusing to run seeds in prodauction.');
    process.exit(1);
  }

  await AppDataSource.initialize();

  console.log(logColor, 'DataSource initialized for seeding');

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();
    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0;');

    const tables = AppDataSource.entityMetadatas
      .map(meta => meta.tableName)
      .filter(name => !['migrations', 'typeorm_migrations'].includes(name));

    for (const table of tables) {
      await queryRunner.query(`TRUNCATE TABLE ${table};`);
    }

    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1;');
    await queryRunner.commitTransaction();

    console.log(successLogColor, 'Truncate complete.');
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.error(errLogColor, 'Truncate faild.');
    throw err;
  } finally {
    await queryRunner.release();
  }

  try {
    await AppDataSource.manager.transaction(async em => {
      // Create users
      console.log(logColor, 'Creating users');

      const users: User[] = [];
      const EXISTING_USERS = await em.find(User, { where: {} });

      if (EXISTING_USERS.length < 5) {
        for (let i = 0; i < 5; i++) {
          const user = await userFactory(i);
          await em.save(user);
          users.push(user);
        }

        console.log(successLogColor, 'Created 5 users');
      } else {
        users.push(...EXISTING_USERS);
        console.warn(
          warnLogColor,
          'Found existing users, skipped creating new ones',
        );
      }

      // Create profiles for users
      console.log(logColor, 'Creating profiles');

      const profiles: Profile[] = [];

      users.forEach(user => {
        profiles.push(profileFactory(user));
      });

      await em.save(profiles);

      console.log(successLogColor, 'Profiles created');

      // Create broLocks for profiles
      console.log(logColor, 'Creating broLocks for profiles');

      const broLocks: BroLock[] = [];

      profiles.forEach(profile => {
        for (let i = 0; i < 3; i++) {
          broLocks.push(broLocksFactory(profile));
        }
      });

      await em.save(broLocks);

      console.log(successLogColor, 'BroLocks created');

      // Create lockItem for broLock
      console.log(logColor, 'Creating lockItems for broLock');

      const lockItems: LockItem[] = [];

      broLocks.forEach(broLock => {
        for (let i = 0; i < 5; i++) {
          lockItems.push(lockItemsFactory(broLock, { position: i + 1 }));
        }
      });

      await em.save(lockItems);

      console.log(successLogColor, 'LockItems created');
    });

    console.log(successLogColor, 'Fixture setup successful');
  } catch (err) {
    console.error(errLogColor, 'Seeding failed:', err);
  } finally {
    await AppDataSource.destroy();
  }
}

run().catch(err => {
  console.error(errLogColor, 'Seed runner error!', err);
  process.exit(1);
});
