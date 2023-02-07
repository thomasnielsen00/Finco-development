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
}

const userService = new UserService();
export default userService;
