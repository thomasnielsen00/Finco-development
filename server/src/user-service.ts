import pool from './mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type User = {
  user_id: number;
  username: string;
  password: string;
  email: string;
  risk_willingness: string;
  monthly_savings_amount: string;
};

class UserService {
  /**
   * Get user with given id.
   */
  get(user_id: number) {
    return new Promise<User | undefined>((resolve, reject) => {
      pool.query(
        'SELECT * FROM user WHERE user_id = ?',
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as User);
        }
      );
    });
  }

  /**
   * Get all users.
   */
  getAll() {
    return new Promise<User[]>((resolve, reject) => {
      pool.query('SELECT * FROM user', [], (error, results: RowDataPacket[]) => {
        if (error) return reject(error);

        resolve(results as User[]);
      });
    });
  }

  /**
   * Create new user having the given username, password, email, risk_willingness, monthly_savings_amount.
   *
   * Resolves the newly created users id.
   */
  create(
    username: string,
    password: string,
    email: string,
    risk_willingness: string,
    monthly_savings_amount: string
  ) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO user SET username=?, password=?, email=?, risk_willingness=?, monthly_savings_amount=?',
        [username, password, email, risk_willingness, monthly_savings_amount],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        }
      );
    });
  }

  /**
   * Delete task with given id.
   */
  delete(user_id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'DELETE FROM user WHERE user_id = ?',
        [user_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows == 0) reject(new Error('No row deleted'));

          resolve();
        }
      );
    });
  }
}

const userService = new UserService();
export default userService;
