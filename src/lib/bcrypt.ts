import { compare, hash } from "bcrypt";

export async function comparePassword(
  plainPassword: string,
  password: string
): Promise<boolean> {
  return compare(plainPassword, password);
}

/**
 * To hash the password given
 * @param password -  password of the user
 * @returns - hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = 10;
  return hash(password, salt);
}
