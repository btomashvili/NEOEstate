import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.scss'
import './AddTenant.scss'

import Information from '../Tabs/Information/Information'
import Property from '../Tabs/Property/Property'
import Unit from '../Tabs/Unit/Unit'
import Rooms from '../Tabs/Rooms/Rooms'
import Save from '../Tabs/Save/Save'

import { updateFieldValue, goToTab, resetTenantRequest } from '../../actions/tenantActions'

class AddTenant extends Component {
  componentDidMount() {
    this.props.resetTenantRequest()
  }

  disabled(tab) {
    if (
      tab === 'property' &&
      (!this.props.data.getIn(['information', 'id']) || !this.props.data.getIn(['information', 'lease', 'leaseBegins']))
    ) {
      return true
    }

    if (tab === 'unit' && !this.props.data.getIn(['property', 'id'])) {
      return true
    }

    if (
      tab === 'go' &&
      (!this.props.data.getIn(['information', 'id']) ||
        !this.props.data.getIn(['information', 'lease', 'leaseBegins']) ||
        !this.props.data.getIn(['property', 'id']) ||
        !this.props.data.getIn(['unit', 'id']))
    ) {
      return true
    }

    return false
  }

  render() {
    return (
      <div className="tenants-page">
        <div className="row">
          {/* <div className="col-md-12">
            <h6 className="text-center">Add WalkThru</h6>
            <hr />
          </div> */}
        </div>
        <div className="row">
          <div className="col-md-12">
            <Tabs selectedIndex={this.props.selectedTabIndex} onSelect={e => this.props.goToTab(e)}>
              <TabList className="nav nav-tabs">
                <Tab className="nav-link" selectedClassName="bg-primary text-white">
                  Tenant Information
                </Tab>
                <Tab
                  disabled={this.disabled('property')}
                  className="nav-link"
                  selectedClassName="bg-primary text-white"
                >
                  Property
                </Tab>
                <Tab disabled={this.disabled('unit')} className="nav-link" selectedClassName="bg-primary text-white">
                  Unit Details
                </Tab>
                {this.props.editUnit && (
                  <Tab className="nav-link" selectedClassName="bg-primary text-white">
                    Room and areas
                  </Tab>
                )}
                <Tab disabled={this.disabled('go')} className="nav-link" selectedClassName="bg-primary text-white">
                  GO!
                </Tab>
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
              <TabPanel>
                <Save />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.tenant.getIn(['currentItem', 'data']),
  selectedTabIndex: state.tenant.get('selectedTabIndex'),
  editUnit: state.tenant.getIn(['currentItem', 'editUnit']),
})

const mapDispatchToProps = dispatch => ({
  updateFieldValue: (field, value, parent, isDelete) => dispatch(updateFieldValue(field, value, parent, isDelete)),
  goToTab: data => dispatch(goToTab(data)),
  resetTenantRequest: () => dispatch(resetTenantRequest()),
})

AddTenant.propTypes = {
  selectedTabIndex: PropTypes.number,
  goToTab: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(AddTenant))
