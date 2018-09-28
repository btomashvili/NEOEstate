import React, { PropTypes } from 'react'
import moment from 'moment'
import ChartIcon1 from '../../resources/assets/images/chart1.svg'
import ChartIcon2 from '../../resources/assets/images/chart2.svg'
import ChartIcon3 from '../../resources/assets/images/chart3.svg'
import ChartIcon4 from '../../resources/assets/images/chart4.svg'
import RC2 from 'react-chartjs2'
import './Charts.scss'

export const EntranceCharts = props => (
  <div className="chart-wrapper">
    <div className="chart">
      <img src={ChartIcon1} />
      <div className="chart-text">
        <h3>{props.data.get('totalBadge')}</h3>
        <p>{props.trans('total_badges')}</p>
      </div>
    </div>
    <div className="chart">
      <img src={ChartIcon2} />
      <div className="chart-text">
        <h3>{props.data.getIn(['first', 'number'])}</h3>
        <p>{props.trans('total_first_entrances')}</p>
        <p>{String(props.data.getIn(['first', 'date']))}</p>
      </div>
    </div>
    <div className="chart">
      <img src={ChartIcon3} />
      <div className="chart-text">
        <h3>{props.data.getIn(['second', 'number'])}</h3>
        <p>{props.trans('total_first_entrances')}</p>
        <p>{String(props.data.getIn(['second', 'date']))}</p>
      </div>
    </div>
    <div className="chart">
      <img src={ChartIcon4} />
      <div className="chart-text">
        <h3>{props.data.getIn(['third', 'number'])}</h3>
        <p>{props.trans('total_first_entrances')}</p>
        <p>{String(props.data.getIn(['third', 'date']))}</p>
      </div>
    </div>
  </div>
)

export const BarCharts = props => <RC2 type="bar" data={props.data} />
