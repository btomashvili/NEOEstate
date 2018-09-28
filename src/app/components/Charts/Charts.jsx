import React, { PropTypes } from 'react'
import ChartIcon1 from '../../resources/assets/images/chart1.svg'
import ChartIcon2 from '../../resources/assets/images/chart2.svg'
import ChartIcon3 from '../../resources/assets/images/chart3.svg'
import ChartIcon4 from '../../resources/assets/images/chart4.svg'
import RC2 from 'react-chartjs2'
import './Charts.scss'

export const Charts = props => (
  <div className="chart-wrapper">
    <div className="chart">
      <img src={ChartIcon1} />
      <div className="chart-text">
        <h3>{props.data.get('request')}</h3>
        <p>{props.trans('participant_requests')}</p>
      </div>
    </div>
    <div className="chart">
      <img src={ChartIcon2} />
      <div className="chart-text">
        <h3>{props.data.get('approved')}</h3>
        <p>{props.trans('approved_participants')}</p>
      </div>
    </div>
    <div className="chart">
      <img src={ChartIcon3} />
      <div className="chart-text">
        <h3>{props.data.get('pending')}</h3>
        <p>{props.trans('pending_participants')}</p>
      </div>
    </div>
    <div className="chart">
      <img src={ChartIcon4} />
      <div className="chart-text">
        <h3>{props.data.get('rejected')}</h3>
        <p>{props.trans('rejected_participants')}</p>
      </div>
    </div>
  </div>
)

export const BarCharts = props => <RC2 type="bar" data={props.data} />
