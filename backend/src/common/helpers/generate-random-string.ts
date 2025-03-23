import * as crypto from 'crypto';

export function getRendomString(size = 20): string {
  return crypto.randomBytes(size).toString('hex');
}
