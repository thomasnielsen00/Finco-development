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
  investment_yield: string;
  user_id: number;
  company_id: number;
  portfolio_id: number;
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
   * Resolves the newly created users user_id.
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
   * Updates a user with given user_id.
   */
  updateUser(user: User) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE user SET username=?, password=?, email=?, risk_willingness=?, monthly_savings_amount=? WHERE user_id=?',
        [
          user.username,
          user.password,
          user.email,
          user.risk_willingness,
          user.monthly_savings_amount,
          user.user_id,
        ],
        (error, _results) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  /**
   * Delete user with given user_id.
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
   * Get an investment for a given user with a given investment_id.
   */
  getUserInvestment(user_id: number, investment_id: number) {
    return new Promise<Investment | undefined>((resolve, reject) => {
      pool.query(
        'SELECT * FROM investment WHERE user_id=? AND investment_id=?',
        [user_id, investment_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as Investment);
        }
      );
    });
  }

  /**
   * Get all investments for a given user.
   */
  getAllUserInvestments(user_id: number) {
    return new Promise<Investment[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM investment WHERE user_id=?',
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Investment[]);
        }
      );
    });
  }

  /**
   * Create new investment for a given user having the following attributes: username, password, email, risk_willingness, monthly_savings_amount.
   *
   * Resolves the newly created users id.
   */
  createUserInvestment(
    amount: number,
    investment_date: Date,
    investment_yield: string,
    user_id: number,
    company_id: number,
    portfolio_id: number
  ) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO investment SET amount=?, investment_date=?, investment_yield=?, user_id=? company_id=?, portfolio_id=?',
        [amount, investment_date, investment_yield, user_id, company_id, portfolio_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        }
      );
    });
  }

  /**
   * Updates a user-investment with given investment-id.
   */
  updateUserInvestment(investment: Investment) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE investment SET amount=?, investment_date=?, investment_yield=?, company_id=?, portfolio_id=? WHERE user_id=? AND investment_id=?',
        [
          investment.amount,
          investment.investment_date,
          investment.investment_yield,
          investment.company_id,
          investment.portfolio_id,
          investment.user_id,
          investment.investment_id,
        ],
        (error, _results) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  /**
   * Delete a user-investment with given investment_id.
   */
  deleteUserInvestment(investment_id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'DELETE FROM investment WHERE investment_id = ?',
        [investment_id],
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
