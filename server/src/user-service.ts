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

export type Investment = {
  investment_id: number;
  amount: number;
  investment_date: Date;
  yield: string;
  user_id: number;
  company_id: number;
  portfolio_id: number
};

class UserService {
  /**
   * Get user with given id.
   */
  getUser(user_id: number) {
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
  getAllUsers() {
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
  createUser(
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
  deleteUser(user_id: number) {
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

  //--------------------------------------------------------------------------------------------------------------------------------------
  //INVESTMENTS:
  //--------------------------------------------------------------------------------------------------------------------------------------

 /**
   * Get all investments for a given user.
   */
 getAllUserInvestments() {
  return new Promise<User[]>((resolve, reject) => {
    pool.query('SELECT * FROM user', [], (error, results: RowDataPacket[]) => {
      if (error) return reject(error);

      resolve(results as User[]);
    });
  });
}
  

  /**
   * Get an investment for a given user with a given investment_id.
   */
  getUserInvestment(user_id: number) {
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

const userService = new UserService();
export default userService;
