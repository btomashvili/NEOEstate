/* eslint import/no-extraneous-dependencies:0 */
/* eslint class-methods-use-this:0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import { Link, browserHistory } from 'react-router'
import moment from 'moment'
import SweetAlert from 'sweetalert-react'
import 'sweetalert/dist/sweetalert.css'
import { Input } from '../../../../components/Input/Input'
import './TenantManagment.scss'

import {
  leaseListRequest,
  updateFieldValue,
  deleteTenantRequest,
  tenantSearchSuccess,
  inProgressTenantRequest,
} from '../../actions/tenantActions'

import { updateFieldValue as updateCurrentUserFieldValue } 
from '../../../currentUser/actions/currentUserActions'

import deleteConfirmIcon from '../../../../resources/assets/images/icons/delete-confirm.svg'
import { showMessageBox } from '../../../../components/helpers/messageBox'

import { injectNOS } from '@nosplatform/api-functions/lib/react'

class TenantManagment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      isBodyVisible: false,
      cards: {},
      previousCard: null,
    }
  }

  componentDidMount() {
    //TODO: RUN QUERY TO GET properties with wallet address
    // this.runQuery(this.props)

    this.props.nos.getAddress()
      .then((e) => {
        this.props.updateCurrentUserFieldValue('isLoggedIn', true)
        this.props.updateCurrentUserFieldValue('walletAddress', e)
        this.props.updateCurrentUserFieldValue('data.email', e)
      })
    console.log('window.NOS.ASSETS;', window.NOS.ASSETS)  
    this.props.nos.getBalance({ asset: window.NOS.ASSETS.NEO })
     .then((e) => {
       console.log('neo', e)
       this.props.updateCurrentUserFieldValue('data.neo', e)
     })
    this.props.nos.getBalance({ asset: window.NOS.ASSETS.GAS })
     .then((e) => {
       console.log('gas', e)
       this.props.updateCurrentUserFieldValue('data.gas', e)
     })
  }

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.location && nextProps.location !== this.props.location) ||
      (this.props.reloadData !== nextProps.reloadData && nextProps.reloadData)
    ) {
      this.runQuery(nextProps)
    }
  }

  filterQuery() {
    const where = {}
    this.props.updateFieldValue('query.where', where)
  }

  runQuery = (props) => {
    this.filterQuery(props)
    setTimeout(() => {
      const query = this.props.query.toJS()
      this.props.leaseListRequest(query)
    }, 30)
  }

  deleteMessage(tenant) {
    showMessageBox({
      text: 'Are you sure you want to delete tenant?',
      icon: deleteConfirmIcon,
      confirmCallback: () => {
        this.props.deleteTenantRequest(tenant.get('id'), tenant.get('lease'))
      },
    })
  }

  handleSearch(e) {
    // console.log(e.target.value)
    this.props.searchTenantRequest(e.target.value)
  }

  handleNewWalkthru() {
    const credits = this.props.currentUser.get('credits')
    console.log('CREDITS : ', credits)
    if (credits < 1) {
      this.setState({ show: true })
    } else {
      browserHistory.push('/tenants/new')
    }
  }
  generateAddressForReport(tenant) {
    return `${tenant.getIn(['property', 'street'])}-${tenant.getIn(['property', 'city'])}-${tenant.getIn([
      'property',
      'state',
    ])}-${tenant.getIn(['property', 'zip'])}`
  }

  renderStatus = (tenant) => {
    if (tenant.get('status') && tenant.get('status').toLowerCase() === 'submited') {
      return <button className="btn btn-sm btn-success">Submitted </button>
    }

    // TODO: https://trello.com/c/O85lT3q0
    // if (moment().isAfter(tenant.get('leaseExpires'))) {
    //   return (<button className="btn btn-sm btn-danger">Expired</button>)
    // }

    return <button className="btn btn-sm btn-primary">In Progress</button>
  }

  renderReportButtonStyle(submited) {
    return submited
      ? 'btn btn-icon btn-sm btn-primary report-btn'
      : 'btn btn-icon btn-sm btn-secondary disabled report-btn'
  }

  handleCheckBox(tenant) {
    const id = tenant.get('id')
    const lease = tenant.get('lease')
    //  const inviteCode = tenant.get('inviteCode')
    // console.log('Lease Id ', lease)
    // console.log('invite Code ', inviteCode)
    this.props.updateFieldValue('isAutoSubmited', !tenant.get('isAutoSubmited'))
    this.props.inProgressRequest(id, lease)
  }

  renderAutoSubmited = (tenant) => {
    if (tenant.get('isAutoSubmited')) {
      return (
        <sup className="asterisk">
          <sup style={{ fontSize: 9 }}> auto</sup>
        </sup>
      )
    }
  }

  renderBody(tenant) {
    if (!this.state.cards[tenant.get('lease')]) {
      return null
    }

    return (
      <div className="card-body">
        <ul className="list-group">
          <li className="list-group-item">
            <span className="data-label">Status:</span>
            {this.renderStatus(tenant)}
            {this.renderAutoSubmited(tenant)}
          </li>
          {/* { tenant.get('isAutoSubmited') && */}
          <li className="list-group-item">
            <span className="data-label in-progress">Reopen WalkThru for tenant to complete:</span>
            <input
              type="checkbox"
              id="inProgress"
              onChange={() => this.handleCheckBox(tenant)}
              checked={tenant.get('status') === 'submited'}
            />
            <label className={`switch ${!tenant.get('isAutoSubmited')}`} htmlFor="inProgress">
              Toggle
            </label>
          </li>
          {/* } */}
          <li className="list-group-item">
            <span className="data-label">Name:</span>
            {tenant.get('firstName')} {tenant.get('lastName')}
          </li>
          <li className="list-group-item">
            <span className="data-label">Email:</span>
            <Link href={`mailto:${tenant.get('email')}`} target="_blank">
              {tenant.get('email')}
            </Link>
          </li>
          <li className="list-group-item">
            <span className="data-label">Cell Phone:</span>
            <a href={`tel:${tenant.get('phone')}`}>{tenant.get('phone')}</a>
          </li>
          <li className="list-group-item">
            <span className="data-label">Date of WalkThru:</span>
            {moment(tenant.get('leaseBegins')).format('MM/DD/YYYY')}
          </li>
          <li className="list-group-item">
            <span className="data-label">Due Date:</span>
            {moment(tenant.get('leaseExpires')).format('MM/DD/YYYY')}
          </li>
          <li className="list-group-item">
            <span className="data-label">Invite Code:</span>
            {tenant.get('inviteCode')}
          </li>
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="tenants-page">
        <SweetAlert
          show={this.state.show}
          title="No Remaining WalkThrus"
          html
          text="Please contact us to have more WalkThrus added to your account"
          onConfirm={() => this.setState({ show: false })}
        />
        <div className="row">
          <div className="col-md-12">
            <div className="float-left">
              <h3>Properties</h3>
            </div>

            <div className="float-right">
              {/* <button className="btn btn-danger btn-icon" type="button" onClick={() => this.handleNewWalkthru()}>
                <i className="fa fa-plus" aria-hidden="true" /> Add WalkThru
              </button> */}
            </div>
          </div>
          <div className="col-md-6">
            <Input
              className="form-control"
              value={this.props.searchText}
              placeholder="Search..."
              onChange={(value) => {
                this.handleSearch(value)
              }}
              type="text"
            />
          </div>
          <br />
          <div className="col-md-12">
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.props.items.valueSeq().map((tenant, key) => (
              <div key={key}>
                <div className="card">
                  <div
                    className="card-header"
                    onClick={() => {
                      const { cards } = this.state
                      cards[tenant.get('lease')] = !cards[tenant.get('lease')]
                      // cards[tenant.get('lease')] = true

                      if (Object.keys(cards).length > 1) {
                        cards[this.state.previousCard] = false // hide previous card
                      }

                      this.setState({ cards, previousCard: tenant.get('lease') })
                    }}
                  >
                    <div className="float-left">
                      <h4>
                        <i className="fa fa-home" /> &nbsp;
                        <span>{tenant.getIn(['property', 'street'])} </span>
                        <span>{tenant.getIn(['property', 'city'])} </span>
                        <span>{tenant.getIn(['property', 'state'])} </span>
                        <span>{tenant.getIn(['property', 'zip'])} </span>
                      </h4>
                    </div>
                    <div className="float-right">
                      <Link
                        to={`/activities/${tenant.get('id')}/${tenant.get('lease')}`}
                        className="btn btn-icon btn-sm btn-default report-btn"
                      >
                        <i className="fa fa-file-text" aria-hidden="true" />
                        Activities
                      </Link>
                      {/* {tenant.get('status') === 'submited' && */}
                      <Link
                        to={`${process.env.apiUrl}/api/v1/tenant/${tenant.get('id')}/pdf?lease=${tenant.get(
                          'lease'
                        )}&address=${this.generateAddressForReport(tenant)}`}
                        target="_blank"
                        className={this.renderReportButtonStyle(tenant.get('status') === 'submited')}
                      >
                        <i className="fa fa-file-text" aria-hidden="true" />
                        Report
                      </Link>
                      {/* } */}
                      <div className="btn-group" role="group">
                        <Link
                          to={`/tenants/edit/${tenant.get('id')}/${tenant.get('lease')}`}
                          className="btn btn-sm btn-primary"
                        >
                          <i className="fa fa-pencil" aria-hidden="true" />
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={() => this.deleteMessage(tenant)}
                        >
                          <i className="fa fa-trash-o" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {this.renderBody(tenant)}
                </div>
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUserRole: state.currentUser.getIn(['data', 'role']),
    currentUser: state.currentUser.get('data'),
    reloadData: state.tenant.get('reloadData'),
    isLoading: state.tenant.get('isLoading'),
    query: state.tenant.get('query'),
    pageSize: state.tenant.getIn(['query', 'pageSize']),
    currentPage: state.tenant.getIn(['query', 'page']),
    totalCount: state.tenant.get('totalCount'),
    items: state.tenant.get('leases'),
    searchText: state.tenant.get('searchText'),
    defaultNumberOfDaysToComplete: state.currentUser.getIn(['data', 'defaultNumberOfDaysToComplete']),
  }
}

const mapDispatchToProps = dispatch => ({
  leaseListRequest: query => dispatch(leaseListRequest(query)),
  deleteTenantRequest: (id, lease) => dispatch(deleteTenantRequest(id, lease)),
  searchTenantRequest: text => dispatch(tenantSearchSuccess(text)),
  // activityDeleteByKeyRequest: lease => dispatch(activityDeleteByKeyRequest(lease)),
  updateFieldValue: (field, value, parent, isDelete) => dispatch(updateFieldValue(field, value, parent, isDelete)),
  updateCurrentUserFieldValue: (field, value, parent, isDelete) => dispatch(updateCurrentUserFieldValue(field, value, parent, isDelete)),
  inProgressRequest: (id, lease) => dispatch(inProgressTenantRequest(id, lease)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectNOS(withTranslate(TenantManagment)))
