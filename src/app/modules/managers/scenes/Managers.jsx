/* eslint class-methods-use-this:0 */
/* eslint no-param-reassign:0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import deleteConfirmIcon from '../../../resources/assets/images/icons/delete-confirm.svg'
import { showMessageBox } from '../../../components/helpers/messageBox'
import { Input } from '../../../components/Input/Input'

import './Managers.scss'

import { updateFieldValue, updateTenantRequest } from '../../tenant/actions/tenantActions'
import { userListRequest, editUserRequest, userSearchSuccess, deleteUserRequest } from '../../user/actions/userActions'

class Managers extends Component {
  constructor(props) {
    super(props)
    this.handleCreditChange = this.handleCreditChange.bind(this)
  }

  componentDidMount() {
    this.runQuery(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reloadData && nextProps.reloadData !== this.props.reloadData) {
      this.runQuery(this.props)
    }
  }

  runQuery = () => {
    // this.filterQuery(props)
    setTimeout(() => {
      this.props.userListRequest({})
    }, 30)
  }

  handleCreditChange(e, item) {
    item.credits = parseInt(e.target.value)
    this.props.editUserRequest(item.id, item)
  }

  removeManager(userId) {
    showMessageBox({
      text: 'Are you sure you want to remove this user?',
      icon: deleteConfirmIcon,
      confirmCallback: () => {
        console.log('userId ', userId)
        this.props.deleteUserRequest(userId)
      },
    })
  }

  render() {
    return (
      <div className="tenants-page">
        <div className="row">
          <div className="col-md-12">
            <div className="float-left">
              <h3> Property Managers </h3>
            </div>
          </div>
          <div className="col-md-12">{/* <hr /> */}</div>
          <div className="col-md-6">
            <Input
              className="form-control"
              value={this.props.searchText}
              placeholder="Search..."
              onChange={(e) => {
                this.props.userSearchRequest(e.target.value)
              }}
              type="text"
            />
          </div>{' '}
          <br /> <br />
        </div>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th> Name </th>
                  <th> Email </th>
                  <th> Cell Phone </th>
                  <th> Walkthrus Created </th>
                  <th> Remaining Walkthrus </th>
                  <th> Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.users.valueSeq().map((user, key) => (
                  <tr key={key}>
                    <td> {user.get('fullName')} </td>
                    <td>
                      {' '}
                      <a href={`mailto:${user.get('email')}`}> {user.get('email')} </a>
                    </td>
                    <td>
                      {' '}
                      <a href={`tel:${user.get('phone')}`}>{user.get('phone')}</a>{' '}
                    </td>
                    <td> {user.get('walkthrusCreated')} </td>
                    <td>
                      <Input
                        placeholder="Credit number"
                        name="credits"
                        type="number"
                        value={user.get('credits')}
                        onChange={e => this.handleCreditChange(e, user.toJS())}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => this.removeManager(user.get('id'))}
                      >
                        <i className="fa fa-trash-o" aria-hidden="true" />
                      </button>
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

function mapStateToProps(state) {
  return {
    reloadData: state.user.get('reloadData'),
    users: state.user.get('items'),
    searchText: state.user.get('searchText'),
  }
}

const mapDispatchToProps = dispatch => ({
  updateTenantRequest: (id, lease, data) => dispatch(updateTenantRequest(id, lease, data)),
  editUserRequest: (id, data) => dispatch(editUserRequest(id, data)),
  deleteUserRequest: id => dispatch(deleteUserRequest(id)),
  userListRequest: query => dispatch(userListRequest(query)),
  userSearchRequest: text => dispatch(userSearchSuccess(text)),
  // deleteTenantRequest: (id, lease) => dispatch(deleteTenantRequest(id, lease)),
  updateFieldValue: (field, value, parent, isDelete) => dispatch(updateFieldValue(field, value, parent, isDelete)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(Managers))
