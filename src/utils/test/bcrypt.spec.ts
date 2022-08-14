import { hashPassword, comparePassword } from '../bcrypt';

describe('Bcrypt', () => {
  describe('hashPassword', () => {
    it('should return a hashed password', async () => {
      const password = 'testPassword';
      const hashedPassword = await hashPassword(password);
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
    });
  });

  describe('comparePassword', () => {
    it('should return true if passwords match', async () => {
      const password = 'testPassword';
      const hashedPassword = await hashPassword(password);
      expect(await comparePassword(password, hashedPassword)).toBe(true);
    });

    it('should return false if passwords do not match', async () => {
      const password = 'testPassword';
      const hashedPassword = await hashPassword(password);
      expect(await comparePassword('wrongPassword', hashedPassword)).toBe(
        false,
      );
    });
  });
});
