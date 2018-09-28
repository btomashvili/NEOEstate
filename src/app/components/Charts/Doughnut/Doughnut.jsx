import React from 'react'
import Chart from 'chart.js'
import _ from 'lodash'

export default class extends React.Component {
  componentDidMount() {
    const ctx = this.canvas.getContext('2d')
    new Chart(ctx, this.props.config)
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.config, nextProps.config)) {
      const ctx = this.canvas.getContext('2d')
      new Chart(ctx, nextProps.config)
    }
  }
  render() {
    return (
      <canvas
        ref={(canvas) => {
          this.canvas = canvas
        }}
      />
    )
  }
}
