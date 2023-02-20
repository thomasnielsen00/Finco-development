import pool from './mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type User = {
  user_id: number;
  username: string;
  password: string;
  email: string;
  risk_willingness: string;
  monthly_savings_amount: string;
  first_name: string;
  last_name: string;
  phone_number: string;
};

export type Investment = {
  investment_id: number;
  amount: number;
  investment_date: Date;
  investment_yield: string;
  user_id: number;
  company_id: number;
  company_name: string;
};

export type Industry = {
  user_id: number;
  industry_id: number;
  industry_name: string;
};

class UserService {
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
        'UPDATE user SET username=?, password=?, email=?, risk_willingness=?, monthly_savings_amount=?, first_name=?, last_name=?, phone_number=? WHERE user_id=?',
        [
          user.username,
          user.password,
          user.email,
          user.risk_willingness,
          user.monthly_savings_amount,
          user.first_name,
          user.last_name,
          user.phone_number,
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

  //I BEGGE GET-METODENE UNDER BØR JEG KANSKJE OGSÅ HENTE UT
  //SELVE NAVNET PÅ INVESTERINGSVIRKSOMHETEN GJENNOM EN JOIN:

  /**
   * Get all investments for a given user.
   */
  getAllUserInvestments(user_id: number) {
    return new Promise<Investment[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM investment, company WHERE company.company_id = investment.company_id AND user_id=?',
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Investment[]);
        }
      );
    });
  }

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
   * Create new investment for a given user having the following attributes: username, password, email, risk_willingness, monthly_savings_amount.
   *
   * Resolves the newly created users id.
   */
  createUserInvestment(
    amount: number,
    investment_date: Date,
    investment_yield: string,
    user_id: number,
    company_id: number
  ) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO investment SET amount=?, investment_date=?, investment_yield=?, user_id=?, company_id=?',
        [amount, investment_date, investment_yield, user_id, company_id],
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
        'UPDATE investment SET amount=?, investment_date=?, investment_yield=?, company_id=? WHERE user_id=? AND investment_id=?',
        [
          investment.amount,
          investment.investment_date,
          investment.investment_yield,
          investment.company_id,
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

  //------------------------------------------------------------------------------
  //         USER-PREFERED-INDUSTRY
  //------------------------------------------------------------------------------

  /**
   * Get all users.
   */
  getAllPreferedIndustries(user_id: number) {
    return new Promise<Industry[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM prefered_industry, industry WHERE prefered_industry.industry_id = industry.industry_id AND user_id=? ',
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Industry[]);
        }
      );
    });
  }

  /**
   * Get a prefered industry for a given user.
   */
  getPreferedIndustry(user_id: number, industry_id: number) {
    return new Promise<Industry | undefined>((resolve, reject) => {
      pool.query(
        'SELECT * FROM prefered_industry, industry WHERE prefered_industry.industry_id = industry.industry_id AND prefered_industry.user_id = ? AND prefered_industry.industry_id=?',
        [user_id, industry_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as Industry);
        }
      );
    });
  }

  /**
   * Update a prefered industry for a given user.
   */
  updatePreferedIndustry(industry: Industry) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE prefered_industry SET prefered_industry.industry_id=(SELECT industry_id FROM industry WHERE industry_name=?) WHERE prefered_industry.user_id=? AND prefered_industry.industry_id=?',
        [industry.industry_name, industry.user_id, industry.industry_id],
        (error, _results) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  //BURDEN DENNE SKRIVES OM SLIK AT MAN KAN SLETTE PÅ BAKGRUNN AV INDUSTRY_NAME PÅ SAMME MÅTE SOM DEN OVER?
  /**
   * Delete a prefered industry for a given user.
   */
  deletePreferedIndustry(industry_id: number, user_id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'DELETE FROM prefered_industry WHERE prefered_industry.industry_id=? AND prefered_industry.user_id=?',
        //'DELETE FROM prefered_industry WHERE prefered_industry.industry_id=(SELECT industry_id FROM industry WHERE industry_name=?) AND prefered_industry.user_id=?',
        [industry_id, user_id],
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
