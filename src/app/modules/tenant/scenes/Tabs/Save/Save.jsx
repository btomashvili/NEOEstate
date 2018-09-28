import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import { browserHistory } from 'react-router'
import { FormGroup } from '../../../../../components/FormGroup/FormGroup'

import { goToTab, updateFieldValue, inviteTenantRequest } from '../../../actions/tenantActions'
import { showSnackbar } from '../../../../common/actions/commonActions'
import { updateFieldValue as updateCurrentUserFieldValue } from '../../../../currentUser/actions/currentUserActions'

class Save extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.invite.get('status') === 'success' &&
      nextProps.invite.get('status') !== this.props.invite.get('status')
    ) {
      browserHistory.push('/tenants')
      this.props.showSnackbar('Tenant invited!')
    } else if (
      nextProps.invite.get('status') === 'error' &&
      nextProps.invite.get('status') !== this.props.invite.get('status')
    ) {
      this.props.showSnackbar('Tenant with this data already exists!', 'error')
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault()

    const id = this.props.data.getIn(['information', 'id'])
    const data = this.props.data.toJS()
    // console.log('on Save : ', id, data)
    // console.log('Credits : ', this.props.credits)
    this.props.updateCurrentUserFieldValue('data.credits', this.props.credits - 1)
    this.props.inviteTenantRequest(id, data)

    setTimeout(() => {
      // browserHistory.push('/tenants')
    }, 100)
  }

  render() {
    return (
      <div className="tab-content">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.onFormSubmit}>
              <FormGroup className="text-center">
                <p>
                  WalkThru request for {this.props.data.getIn(['property', 'street'])} -{' '}
                  {this.props.data.getIn(['unit', 'unitNumber'])} ready to send to{' '}
                  {this.props.data.getIn(['information', 'firstName'])}{' '}
                  {this.props.data.getIn(['information', 'lastName'])} {this.props.data.getIn(['information', 'email'])}
                </p>
              </FormGroup>
              <FormGroup>
                <button className="btn btn-danger btn-block" type="submit">
                  Go!
                </button>
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.tenant.getIn(['currentItem', 'data']),
  invite: state.tenant.getIn(['currentItem', 'data', 'invite']),
  isLoading: state.tenant.get('isLoading'),
  credits: state.currentUser.getIn(['data', 'credits']),
  currentUser: state.currentUser.get('data'),
})

const mapDispatchToProps = dispatch => ({
  updateFieldValue: (field, value, parent, isDelete) => dispatch(updateFieldValue(field, value, parent, isDelete)),
  goToTab: data => dispatch(goToTab(data)),
  inviteTenantRequest: (id, data) => dispatch(inviteTenantRequest(id, data)),
  showSnackbar: (message, type) => dispatch(showSnackbar(message, type)),
  updateCurrentUserFieldValue: (field, value, parent, isDelete) =>
    dispatch(updateCurrentUserFieldValue(field, value, parent, isDelete)),
})

Save.propTypes = {
  // translate: PropTypes.func,
  data: PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(Save))
