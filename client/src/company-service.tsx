import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Company = {
  company_id: number;
  company_name: string;
  calculated_value_per_share: number;
};

class CompanyService {
  /**
   * Get company with given id.
   */
  get(company_id: number) {
    return axios.get<Company>('/companies/' + company_id).then((response) => response.data);
  }
  /**
   * Get all companies.
   */
  getAll() {
    return axios.get<Company[]>('/companies').then((response) => response.data);
  }
  /**
   * Create new task having the given title.
   *
   * Resolves the newly created task id.
   */
  // create(title: string) {
  //   return axios
  //     .post<{ id: number }>('/tasks', { title: title })
  //     .then((response) => response.data.id);
  // }
}

const companyService = new CompanyService();
export default companyService;
