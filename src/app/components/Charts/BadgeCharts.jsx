import React, { PropTypes } from 'react'
import ChartIcon1 from '../../resources/assets/images/chart1.svg'
import ChartIcon2 from '../../resources/assets/images/chart2.svg'
import ChartIcon3 from '../../resources/assets/images/chart3.svg'
import ChartIcon4 from '../../resources/assets/images/chart4.svg'
import RC2 from 'react-chartjs2'
import './Charts.scss'

export const BadgeCharts = props => (
  <div className="chart-wrapper">
    <div className="chart">
      <img src={ChartIcon1} />
      <div className="chart-text">
        <h3>{props.data.getIn(['totalApproved'])}</h3>
        <p>{props.trans('total_n_apprpved')}</p>
      </div>
    </div>
    <div className="chart">
      <img src={ChartIcon2} />
      <div className="chart-text">
        <h3>{props.data.get('totalPrePrinted')}</h3>
        <p>{props.trans('total_pre_printed')}</p>
      </div>
    </div>
    <div className="chart">
      <img src={ChartIcon3} />
      <div className="chart-text">
        <h3>{props.data.get('totalVip')}</h3>
        <p>{props.trans('total_vip')}</p>
      </div>
    </div>
    <div className="chart">
      <img src={ChartIcon4} />
      <div className="chart-text">
        <h3>{props.data.get('totalMedia')}</h3>
        <p>{props.trans('total_media')}</p>
      </div>
    </div>
    <div className="chart">
      <img src={ChartIcon4} />
      <div className="chart-text">
        <h3>{props.data.get('totalOrganizer')}</h3>
        <p>{props.trans('total_organizer')}</p>
      </div>
    </div>
  </div>
)

export const BarCharts = props => <RC2 type="bar" data={props.data} />
