import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

export default class ListingCard extends Component {

  render() {
    const { title, des, req, applied, date, name, image, job_status, is_applied_screen } = this.props

    // let applyBtn = (!applied ? <Button title={"Apply"} class="btn btn-primary green-form-btn apply-btn mob-job-card-apply-btn" /> : <span className="applied-btn"><img src="/images/applied-icon.png"  alt="" /></span>);
    // if(is_applied_screen){
    //   applyBtn = <Button title={!job_status ? <span>Active</span>: <span>Closed</span>} class="btn btn-primary green-form-btn apply-btn mob-job-card-apply-btn" />;
    // }

    return (
      <div className="job-listing-detail">
        <div className="job-inside-detail new-joblisting">
          <div className="clogo-left"><img className="" src={image} /></div>
          <div className="jobcard-right">
            <h3>{title}</h3>
            {/* ({!job_status ? "Open": "Closed"}) */}
            <h5><strong>{name}</strong></h5>
          </div>

          <button className='btn btn-primary' type='button' onClick={this.props.onClick}>Reserve</button>          {/* <p dangerouslySetInnerHTML={this.createMarkup(des)} />
          <p dangerouslySetInnerHTML={this.createMarkup(req)} /> */}
        </div>
        <div className="optional-details">
          <div className="optional-detail-icon">
            <span className="date-icon"><img src="/images/date-icon.png" alt={"logo"} width="20" /></span>
            <span className="optional-detail-text">{date}</span>
          </div>
        </div>
      </div>
    );
  }
}
