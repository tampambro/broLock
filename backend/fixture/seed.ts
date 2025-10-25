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

async function run() {
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

    console.log(logColor, 'Truncate complete.');
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.error('Truncate faild.');
    throw err;
  } finally {
    await queryRunner.release();
  }

  try {
    await AppDataSource.manager.transaction(async em => {
      // Create users
      const users: User[] = [];
      const EXISTING_USERS = await em.find(User, { where: {} });

      if (EXISTING_USERS.length < 5) {
        for (let i = 0; i < 5; i++) {
          const user = await userFactory();
          await em.save(user);
          users.push(user);
        }

        console.log(logColor, 'Created 5 users.');
      } else {
        users.push(...EXISTING_USERS);
        console.warn('Found existing users, skipped creating new ones.');
      }

      // Create profiles for users
      const profiles: Profile[] = [];

      for (const user of users) {
        profiles.push(profileFactory(user));
      }

      await em.save(profiles);

      console.log(logColor, 'Profiles created.');

      // Create broLocks for profiles
      const broLocks: BroLock[] = [];

      for (const profile of profiles) {
        for (let i = 0; i < 3; i++) {
          broLocks.push(broLocksFactory(profile));
        }
      }

      await em.save(broLocks);

      // Create lockItem for broLock
    });
  } catch (err) {

  }
}
