import axios from 'axios';

const username = 'User';
const password = 'password';

class ReportService {
  constructor(apiUrl) {
    this.api = axios.create({
      baseURL: apiUrl,
    });
    this.apiUrl = apiUrl;
    this.reportListPath = '/api/reports?projection=embedded';
    this.reportPath = '/api/reports';
    this.findByUsername = '/api/users/search/findByUsername';
    this.config = {
      auth: {
        username,
        password,
      },
    };
  }

  findUserByUserName(user) {
    const path = `${this.findByUsername}?username=${user}`;
    return this.api.get(path, this.config)
      .then((response) => {
        let toReturn = null;
        if (response.status !== 200) {
          console.error(`Error: Http response is ${response.status}`);
        } else {
          toReturn = response;
        }
        return toReturn;
      }).catch(error => (console.error('Error:', error)));
  }

  validateUser(user) {
    return this.findUserByUserName(user).then(res => res.data._links.self.href);
  }

  getReportList() {
    return this.api.get(this.reportListPath, this.config);
  }

  addReport(data) {
    // get user details for userUri. This should be cached
    return this.validateUser(username)
      .then((userUri) => {
        data.user = userUri;
        return this.api.post(this.reportPath, data, this.config);
      });
  }
}

export default ReportService;
