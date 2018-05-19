import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';

class PreviewReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.reportService.findReportById(props.id).then((report) => {
      this.setState(report);
    });
  }

  render() {
    return (
      <Container className="report-preview">
        <h1>{(this.state.licensee ? this.state.licensee.toUpperCase() : '')} TECHNICAL COMPLIANCE AUDITING REPORT</h1>
        <div className="front-page-info">
          <Row>
            <Col md="2" className="cover-sub-title">Audit Period:</Col>
            <Col md="2">18.5.2018</Col>
          </Row>
        </div>
        <h2 className="new-page">1. Background</h2>
        <p>{`In line with its internal Audit Manual and as mandated by the Electricity Act, 
          specifically section 37 of the Electricity Act 4 of 2007, the Electricity Control Board 
          (ECB) carried out a technical compliance audit on <b>${this.state.licensee}</b> 
          electricalnetwork infrastructure facilities on Insert Date of auditing. The Audit Manual of 
          November 2014 stipulates that every licensee must be audited by the Regulator at least once 
          every year. The objective of the compliance audits is to establish the extent to which an 
          audited facility is complying with the stipulated standards, rules, codes and regulations. 
          The ECB wishes to enhance regulation to promote economic and technical efficiency in the 
          country’s electricity sector. This is achieved by enforcing existing standards and 
          regulatory tools, the eventual use of incentive-based regulation and the application of 
          benchmarking. Compliance audits are executed to enable implementation of these regulatory 
          processes.`}
        </p>
      </Container>
    );
  }
}

export default PreviewReportPage;
