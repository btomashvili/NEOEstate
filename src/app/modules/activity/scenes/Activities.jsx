import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { activityGetByKeyRequest } from '../actions/activityActions'
import './Activities.scss'

class Activities extends Component {
  componentDidMount() {
    const { params } = this.props
    this.props.activityGetByKeyRequest(params.lease)
  }
  render() {
    return (
      <div className="activities-page">
        <div className="row">
          <div className="col-md-12">
            <div className="float-left">
              <h3> Activities </h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-condensed">
              <tbody>
                {this.props.items.valueSeq().map((item, key) => (
                  <tr key={key}>
                    <td>
                      {' '}
                      <i className="fa fa-check-circle green" aria-hidden="true" />
                      <span className="title">{item.get('title')} / </span>
                      <span className="title">{moment(item.get('createdClientDate')).fromNow()} </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.activities.get('items'),
})

const mapDispatchToProps = dispatch => ({
  activityGetByKeyRequest: key => dispatch(activityGetByKeyRequest(key)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activities)
