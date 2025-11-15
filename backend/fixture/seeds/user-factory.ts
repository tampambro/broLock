import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { Profile } from 'src/profile/profile.entity';
import { BroLock } from 'src/bro-lock/entity/bro-lock.entity';
import { LockItem } from 'src/bro-lock/entity/lock-item.entity';

export async function userFactory(
  userNumber: number,
  overrides: Partial<User> = {},
): Promise<User> {
  const user = new User();

  user.name = overrides.name ?? `user${userNumber}`;
  user.email = overrides.email ?? `user${userNumber}@mail.ru`;
  user.isMailConfirm = overrides.isMailConfirm ?? true;

  const plainPass = overrides.password ?? '123456';

  user.password = await bcrypt.hash(plainPass, 10);

  return Object.assign(user, overrides);
}

export function profileFactory(
  user: User,
  overrides: Partial<Profile> = {},
): Profile {
  const profile = new Profile();

  profile.userName = overrides.userName ?? user.name;
  profile.userPhrase = overrides.userPhrase ?? faker.company.buzzPhrase();
  profile.user = user;

  return Object.assign(profile, overrides);
}

export function broLocksFactory(
  profile: Profile,
  overrides: Partial<BroLock> = {},
): BroLock {
  const broLock = new BroLock();

  broLock.name = overrides.name ?? faker.commerce.productName();
  broLock.auther = profile.userName;
  broLock.category = overrides.category ?? faker.word.noun();

  //TODO Нужно создать таблучку с жанрами

  broLock.creator = profile;

  return Object.assign(broLock, overrides);
}

export function lockItemsFactory(
  broLock: BroLock,
  overrides: Partial<LockItem> = {},
): LockItem {
  const lockItem = new LockItem();

  lockItem.name = overrides.name ?? faker.book.title();
  lockItem.position = overrides.position;
  lockItem.check = overrides.check ?? false;

  lockItem.broLock = broLock;

  return lockItem;
}
