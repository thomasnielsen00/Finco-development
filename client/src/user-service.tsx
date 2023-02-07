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
   * Get task with given id.
   */
  get(id: number) {
    return axios.get<Task>('/tasks/' + id).then((response) => response.data);
  }

  /**
   * Get all tasks.
   */
  getAll() {
    return axios.get<Task[]>('/tasks').then((response) => response.data);
  }

  /**
   * Create new task having the given title.
   *
   * Resolves the newly created task id.
   */
  create(title: string) {
    return axios
      .post<{ id: number }>('/tasks', { title: title })
      .then((response) => response.data.id);
  }
}

const taskService = new TaskService();
export default taskService;
