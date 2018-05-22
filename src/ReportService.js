import axios from 'axios';
import _ from 'lodash';

const fieldToApi = {
  reportTitle: 'name',
  // firstName:
  // lastName:
  licenseeName: 'licensee',
  startOfAuditPeriod: 'startTime',
  endOfAuditPeriod: 'endTime',
  seniorEngineer: 'senior_engineer_email',
  manager: 'manager_email',
  generalManager: 'general_manager_email',
  ceo: 'ceo_email',
};

class ReportService {
  constructor(apiUrl) {
    this.api = axios.create({
      baseURL: apiUrl,
    });
    this.apiUrl = apiUrl;
    this.reportListPath = '/api/reports?projection=embedded';
    this.reportPath = '/api/reports';
    this.findByUsername = '/api/users/search/findByUsername';
    this.reportByIdPath = id => (`/api/reports/${id}?projection=embedded`);
    this.config = {
      auth: {
        username: '',
        password: '',
      },
    };
  }

  setCredentials(username, password) {
    this.config.auth = {
      username,
      password,
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
    return this.findUserByUserName(user).then((res) => {
      if (res) {
        return res.data._links.self.href;
      }
      return null;
    });
  }

  getReportList() {
    return this.api.get(this.reportListPath, this.config).then(res => res.data);
  }

  addReport(report) {
    const data = {};
    _.forEach(report, (value, key) => {
      if (['startOfAuditPeriod', 'endOfAuditPeriod'].includes(key)) {
        data[fieldToApi[key]] = `${value}T12:00:00.000`;
      } else {
        data[fieldToApi[key]] = value;
      }
    });
    console.log(data);
    return this.validateUser(this.config.auth.username)
      .then((userUri) => {
        data.user = userUri;
        return this.api.post(this.reportPath, data, this.config);
      });
  }

  findReportById(id) {
    return this.api.get(this.reportByIdPath(id), this.config)
      .then(res => res.data);
  }
}

export default ReportService;
