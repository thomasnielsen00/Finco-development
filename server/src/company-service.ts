import pool from './mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Company = {
  company_id: number;
  company_name: string;
  calculated_value_per_share: number;
};

export type CompanyCalculations = {
  company_id: number;
  company_name: string;
  calculated_value_per_share: number;
  ebitda: number;
  operation_cash_flow_before_tax: number;
  cash_flow_before_tax: number;
  pre_financing_cash_flow: number;
  unlevered_free_cash_flow: number;
  discount: number;
  presentvalue: number;
  future_EBITDA: [];
  future_changeInWorkingCapital: [];
  future_operationalCashFlowBeforeTax: [];
  future_CAPEX: [];
  future_cashFlowBeforeTax: [];
  future_taxesPaid: [];
  future_preFinancingCashFlow: [];
  future_depOfLeaseAdjustment: [];
  future_opLeaseAdjustment: [];
  future_unleveredFreeCashFlow: [];
  futureDiscount: [];
  presentValueUnleveredFreeCashFlow: [];
  terminalValue: number; // EBITDAresult i database
  futureDiscount2027: number;
  discountedTerminalValue: number;
  present_value_of_unlevered_FCF: number;
  enterpriseValue: number;
  impliedEquityValue: number;
  impliedEquityOfCommonStockholders: number;
  currentSharePrice: number;
  amountShares: number;
  value_per_share: number;
};

class CompanyService {
  //  * Get all companies
  getAll() {
    return new Promise<Company[]>((resolve, reject) => {
      pool.query('SELECT * FROM company', (error, results: RowDataPacket[]) => {
        if (error) return reject(error);

        resolve(results as Company[]);
      });
    });
  }

  // Get all values associated to a company.
  get(company_id: number) {
    return new Promise<Company | undefined>((resolve, reject) => {
      pool.query(
        'SELECT * FROM company WHERE company_id = ?',
        [company_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as Company);
        }
      );
    });
  }

  // Get all values associated to a company.
  getCalculations(company_id: number) {
    return new Promise<CompanyCalculations | undefined>((resolve, reject) => {
      pool.query(
        'SELECT * FROM company WHERE company_id = ?',
        [company_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as CompanyCalculations);
        }
      );
    });
  }

  // getAll() {
  //   return new Promise<Task[]>((resolve, reject) => {
  //     pool.query('SELECT * FROM Tasks', [], (error, results: RowDataPacket[]) => {
  //       if (error) return reject(error);

  //       resolve(results as Task[]);
  //     });
  //   });
  // }

  /**
   * Create new task having the given title.
   *
   * Resolves the newly created task id.
   */
  // create(title: string) {
  //   return new Promise<number>((resolve, reject) => {
  //     pool.query('INSERT INTO Tasks SET title=?', [title], (error, results: ResultSetHeader) => {
  //       if (error) return reject(error);

  //       resolve(results.insertId);
  //     });
  //   });
  // }

  /**
   * Delete task with given id.
   */
  // delete(id: number) {
  //   return new Promise<void>((resolve, reject) => {
  //     pool.query('DELETE FROM Tasks WHERE id = ?', [id], (error, results: ResultSetHeader) => {
  //       if (error) return reject(error);
  //       if (results.affectedRows == 0) reject(new Error('No row deleted'));

  //       resolve();
  //     });
  //   });
  // }
}

const companyService = new CompanyService();
export default companyService;
