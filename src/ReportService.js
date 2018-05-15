import axios from 'axios';

class ReportService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.reportPath = '/api/reports?projection=embedded';
  }

  getReportList() {
    return axios.get(this.apiUrl + this.reportPath, {
      auth: {
        username: 'User',
        password: 'password',
      },
    });
  }
}

export default ReportService;
