import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.scss'
import './EditTenant.scss'

import Information from '../Tabs/Information/Information'
import Property from '../Tabs/Property/Property'
import Unit from '../Tabs/Unit/Unit'
import Rooms from '../Tabs/Rooms/Rooms'

import { viewTenantRequest, updateFieldValue, goToTab } from '../../actions/tenantActions'

class EditTenant extends Component {
  componentDidMount() {
    const query = this.props.query.toJS()
    query.where = { lease: this.props.params.lease }
    this.props.viewTenantRequest(this.props.params.id, query)
  }

  render() {
    return (
      <div className="tenants-page">
        <div className="row">
          <div className="col-md-12">
            <h6 className="text-center">View WalkThru</h6>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Tabs selectedIndex={this.props.selectedTabIndex} onSelect={e => this.props.goToTab(e)}>
              <TabList className="nav nav-tabs">
                <Tab className="nav-link" selectedClassName="bg-primary text-white">
                  Tenant Information
                </Tab>
                <Tab className="nav-link" selectedClassName="bg-primary text-white">
                  Property
                </Tab>
                <Tab className="nav-link" selectedClassName="bg-primary text-white">
                  Unit Details
                </Tab>
                {this.props.editUnit && (
                  <Tab className="nav-link" selectedClassName="bg-primary text-white">
                    Rooms and Areas
                  </Tab>
                )}
              </TabList>

              <TabPanel>
                <Information />
              </TabPanel>
              <TabPanel>
                <Property />
              </TabPanel>
              <TabPanel>
                <Unit />
              </TabPanel>
              {this.props.editUnit && (
                <TabPanel>
                  <Rooms />
                </TabPanel>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.tenant.getIn(['currentItem', 'data']),
  query: state.tenant.getIn(['currentItem', 'query']),
  validationErrors: state.tenant.getIn(['currentItem', 'validationErrors']),
  showErrors: state.tenant.getIn(['currentItem', 'showErrors']),
  message: state.tenant.getIn(['currentItem', 'message']),
  isLoading: state.tenant.get('isLoading'),
  editUnit: state.tenant.getIn(['currentItem', 'editUnit']),
  selectedTabIndex: state.tenant.get('selectedTabIndex'),
})

const mapDispatchToProps = dispatch => ({
  updateFieldValue: (field, value, parent, isDelete) => dispatch(updateFieldValue(field, value, parent, isDelete)),
  viewTenantRequest: (id, data) => dispatch(viewTenantRequest(id, data)),
  goToTab: data => dispatch(goToTab(data)),
})

EditTenant.propTypes = {
  selectedTabIndex: PropTypes.number,
  goToTab: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(EditTenant))
