import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type User = {
  user_id: number;
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
  savings_from: string;
  savings_to: string;
  risk_willingness: string;
};

export type Investment = {
  investment_id: number;
  amount: number;
  buy_price: number;
  buy_date: Date;
  sell_date: Date;
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
    return axios.get<User[]>('/users').then((response) => response.data);
  }

  /**
   * Get user with given id.
   */
  getUser(user_id: number) {
    return axios.get<User>(`/users/${user_id}`).then((response) => response.data);
  }

  signInUser(email: string, password: string) {
    return axios.get<User>(`/users/login/${email}/${password}`).then((response) => response.data);
  }

  /**
   * Create new user having the given username, password, email, risk_willingness, monthly_savings_amount.
   *
   * Resolves the newly created user_id.
   */
  createUser(full_name: string, email: string, password: string) {
    return axios
      .post<{ user_id: number }>('/users/register', {
        full_name: full_name,
        email: email,
        password: password,
      })
      .then((response) => response.data.user_id);
  }

  /**
   * Updates given user
   */
  updateUser(user: User) {
    return axios.put(`/users/${user.user_id}`, user).then((response) => response.data);
  }

  /**
   * Delete user with given id
   */
  deleteUser(user_id: number) {
    return axios.delete(`/users/${user_id}`).then((response) => response.data);
  }

  //--------------------------------------------------------------------------------------------------------------------------------------
  //INVESTMENTS:
  //--------------------------------------------------------------------------------------------------------------------------------------

  /**
   * Get all user-investments.
   */
  getAllUserInvestments(user_id: number) {
    return axios
      .get<Investment[]>(`/users/${user_id}/investments`)
      .then((response) => response.data);
  }

  /**
   * Get investment for a given user with a given investment_id.
   */
  getUserInvestment(user_id: number, investment_id: number) {
    return axios
      .get<Investment>(`/users/${user_id}/investments/:${investment_id}`)
      .then((response) => response.data);
  }

  /**
   * Create new user-investment.
   *
   * Resolves the newly created investment_id.
   */
  createUserInvestment(
    amount: number,
    buy_price: number,
    buy_date: Date,
    sell_date: Date,
    user_id: number,
    company_id: number
  ) {
    return axios
      .post<{ investment_id: number }>(`/users/:user_id/investments`, {
        amount: amount,
        buy_price: buy_price,
        buy_date: buy_date,
        sell_date: sell_date,
        user_id: user_id,
        company_id: company_id,
      })
      .then((response) => response.data.investment_id);
  }

  /**
   * Updates given user-investment
   */
  //DENNE ER NOK KANSKJE IKKE NØDVENDIG MTP DET IKKE GÅR AN Å ENDRE ET GITT INVESTERINGSKJØP
  updateUserInvestment(investment: Investment) {
    return axios
      .put(`/users/${investment.user_id}/investments/${investment.investment_id}`, investment)
      .then((response) => response.data);
  }

  deleteUserInvestment(user_id: number, investment_id: number) {
    return axios
      .delete(`/users/${user_id}/investments/${investment_id}`)
      .then((response) => response.data);
  }

  //------------------------------------------------------------------------------------------------------------------
  //           PREFERED-INDUSTRY FOR USER
  //------------------------------------------------------------------------------------------------------------------

  getAllPreferedIndustries(user_id: number) {
    return axios.get<Industry[]>(`/users/${user_id}/industries`).then((response) => response.data);
  }

  /**
   * Get investment for a given user with a given investment_id.
   */
  getPreferedIndustry(user_id: number, industry_id: number) {
    return axios
      .get<Industry>(`/users/${user_id}/industries/:${industry_id}`)
      .then((response) => response.data);
  }

  /**
   * Updates a given user´s prefered industry:
   */
  updatePreferedIndustry(industry: Industry) {
    return axios
      .put(
        `/users/${industry.industry_id}/industries/${industry.industry_id}`,
        industry.industry_name
      )
      .then((response) => response.data);
  }

  deleteUserIndustry(industry_id: number, user_id: number) {
    return axios
      .delete(`/users/${user_id}/industries/${industry_id}`)
      .then((response) => response.data);
  }
}
const userService = new UserService();
export default userService;
