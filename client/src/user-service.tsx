import { Email } from '@mui/icons-material';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

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
    return axios.get<User>('/users/' + user_id).then((response) => response.data);
  }

  /**
   * Get all users.
   */
  getAllUsers() {
    return axios.get<User[]>('/users').then((response) => response.data);
  }

  /**
   * Create new user having the given username, password, email, risk_willingness, monthly_savings_amount.
   *
   * Resolves the newly created user_id.
   */
  createUser(
    username: string,
    password: string,
    email: string,
    risk_willingness: string,
    monthly_savings_amount: string
  ) {
    return axios
      .post<{ user_id: number }>('/users', {
        username: username,
        password: password,
        email: email,
        risk_willingness: risk_willingness,
        monthly_savings_amount: monthly_savings_amount,
      })
      .then((response) => response.data.user_id);
  }

  /**
   * Updates given user
   */
  updateUser(user: User) {
    return axios.put('/users', user).then((response) => response.data);
  }

  /**
   * Delete user with given id
   */
  deleteUser(user_id: number) {
    return axios.delete(`/users/:${user_id}`).then((response) => response.data);
  }

  //--------------------------------------------------------------------------------------------------------------------------------------
  //INVESTMENTS:
  //--------------------------------------------------------------------------------------------------------------------------------------

  /**
   * Get all user-investments.
   */
  getAllUserInvestments(user_id: number) {
    return axios
      .get<Investment[]>(`/users/:${user_id}/investments`)
      .then((response) => response.data);
  }

  /**
   * Get investment for a given user with a given investment_id.
   */
  getUserInvestment(user_id: number, investment_id: number) {
    return axios
      .get<Investment>(`/users/:${user_id}/investments/:${investment_id}`)
      .then((response) => response.data);
  }

  /**
   * Create new user-investment.
   *
   * Resolves the newly created investment_id.
   */
  createUserInvestment(
    amount: number,
    date: Date,
    investment_yield: string,
    user_id: number,
    company_id: number,
    portfolio_id: number
  ) {
    return axios
      .post<{ investment_id: number }>(`/users/:user_id/investments`, {
        amount: amount,
        date: date,
        investment_yield: investment_yield,
        user_id: user_id,
        company_id: company_id,
        portfolio_id: portfolio_id,
      })
      .then((response) => response.data.investment_id);
  }

  /**
   * Updates given user-investment
   */
  updateUserInvestment(investment: Investment) {
    return axios
      .put(`/users/${investment.user_id}/investments/${investment.investment_id}`, investment)
      .then((response) => response.data);
  }

  deleteUserInvestment(user_id: number, investment_id: number) {
    return axios
      .delete(`/users/:${user_id}/investments/${investment_id}`)
      .then((response) => response.data);
  }
}
const userService = new UserService();
export default userService;
