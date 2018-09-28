/* eslint no-param-reassign:0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import { browserHistory } from 'react-router'

import { FormGroup } from '../../../../../components/FormGroup/FormGroup'

import { goToTab, updateFieldValue, updateRoomsRequest } from '../../../actions/tenantActions'

import { getFloorsList } from '../../../../../utils/helper'
import deleteConfirmIcon from '../../../../../resources/assets/images/icons/delete-confirm.svg'
import { showMessageBox } from '../../../../../components/helpers/messageBox'
import Dropdown from '../../../../../components/Dropdown/Dropdown'
import { roomTypes } from '../../../../../utils/rooms'
import './Rooms.scss'

const WITHOUT_FLOORS_AND_LOCATION = ['Stairway', 'Exterior', 'Garage']

class Rooms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRoomType: '',
      selectedRoom: '',
      showAlert: false,
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault()

    const id = this.props.data.getIn(['unit', 'id'])
    const data = this.props.data.get('unit').toJS()
    this.props.updateRoomsRequest(id, data)

    if (!this.props.data.getIn(['information', 'lease', '_id'])) {
      this.props.goToTab(4)
    } else {
      browserHistory.push('/tenants')
    }
  }

  errorFor(field) {
    return this.props.validationErrors.get(field)
  }

  showError(field) {
    return this.props.showErrors && this.props.validationErrors.get(field) !== undefined
  }

  handleFieldChanged(field, value) {
    return (e) => {
      this.props.updateFieldValue(field, value || (e && e.target && e.target.value) || null, 'currentItem.data')
    }
  }

  handleAddRoom(selected, item) {
    item.label = selected
    // console.log('handleAddRoom :', selected, item)
    this.setState({ selectedRoom: item, selectedRoomType: selected })
  }

  addRoom() {
    if (this.state.selectedRoom) {
      const rooms = this.props.data.getIn(['unit', 'rooms']).toJS()
      const room = this.state.selectedRoom
      if (WITHOUT_FLOORS_AND_LOCATION.includes(room.title)) {
        room.disabled = true
      }
      rooms.push(room)
      this.props.updateFieldValue('currentItem.data.unit.rooms', rooms)
      this.setState({
        selectedRoom: '',
        selectedRoomType: '',
      })
      setTimeout(() => {
        const id = this.props.data.getIn(['unit', 'id'])
        const data = this.props.data.get('unit').toJS()
        this.props.updateRoomsRequest(id, data)
      }, 100)
    }
  }

  removeRoom(index) {
    showMessageBox({
      text: 'Are you sure you want to remove room?',
      icon: deleteConfirmIcon,
      confirmCallback: () => {
        const rooms = this.props.data.getIn(['unit', 'rooms']).toJS()
        rooms.splice(index, 1)
        this.props.updateFieldValue('currentItem.data.unit.rooms', rooms)

        setTimeout(() => {
          const id = this.props.data.getIn(['unit', 'id'])
          const data = this.props.data.get('unit').toJS()
          this.props.updateRoomsRequest(id, data)
        }, 100)
      },
    })
  }

  renderBedroomTitles = (label, floor, title) => {
    // console.log('renderBedroom label :', label)
    // console.log('renderBedroom floor :', floor)

    // TODO: commented this is old code
    // console.log('renderBedroom floor :', title)

    // if (label && label === roomTypes.bedroom) {
    //   return <span className="number-bedroom">{label} &nbsp;</span>
    // }
    // if (label && label === roomTypes.hallways && floor !== 'Basement') {
    //   return <span className="number-hallways">{label} 1&nbsp;</span>
    // }
    // if (label && label === roomTypes.hallways && floor === 'Basement') {
    //   return <span>{label} &nbsp; Basement</span>
    // }

    // task https://trello.com/c/CQIe532a
    if (title === roomTypes.hallways) {
      if (floor === 'Basement') {
        return (
          <span>
            {' '}
            {title} &nbsp; {floor}{' '}
          </span>
        )
      }
      return <span> {title} &nbsp; </span>
    }
    return label
  }

  renderRooms() {
    return this.props.data
      .getIn(['unit', 'rooms'])
      .valueSeq()
      .map((item, key) => (
        <div className="form-group row" key={key}>
          <div className="col-md-12">
            <p>
              <strong>{this.renderBedroomTitles(item.get('label'), item.get('floor'), item.get('title'))}</strong>
              <a className="btn btn-sm" onClick={() => this.removeRoom(key)}>
                <i className="fa fa-times text-danger" aria-hidden="true" />
              </a>
            </p>
          </div>
          {this.props.data.getIn(['unit', 'details', 'totalFloors']) > 1 && (
            <div className="col-md-6">
              <Dropdown
                // label="Floor"
                onChange={selected => this.handleFieldChanged(`unit.rooms.${key}.floor`, selected)()}
                value={item.get('floor')}
                placeholder={item.get('disabled') ? 'Not Applicable' : 'Floor: Don`t know'}
                valueKey="title"
                labelKey="title"
                options={getFloorsList(
                  this.props.data.getIn(['unit', 'details', 'totalFloors']),
                  this.props.data.getIn(['unit', 'details', 'basement'])
                )}
                disabled={item.get('disabled') || item.get('title') === roomTypes.hallways}
              />
            </div>
          )}
          <div className="col-md-6">
            <Dropdown
              // label="Location"
              onChange={selected => this.handleFieldChanged(`unit.rooms.${key}.location`, selected)()}
              value={item.get('location')}
              placeholder={
                item.get('disabled') || item.get('title') === roomTypes.hallways
                  ? 'Not Applicable'
                  : 'Location: Don`t know'
              }
              valueKey="title"
              labelKey="title"
              options={this.props.locations}
              disabled={item.get('disabled') || item.get('title') === roomTypes.hallways}
            />
          </div>
        </div>
      ))
  }

  render() {
    // console.log('STATE : ', this.state)
    // console.log('ROOM TYPES :', this.props.roomTypes.toJS())
    return (
      <div className="tab-content tab-unit">
        {/*  NOTE: we had floor validations in past now it's removed
              <SweetAlert
                show={this.state.show}
                title=""
                text="Please be sure to set a floor for each area. If you choose to not display floors for this property,
                then please remove the floor numbers from all areas where they have been set."
                onConfirm={() => this.setState({ show: false })}
              /> */}
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.onFormSubmit}>
              {this.renderRooms()}
              <div className="form-group row">
                <div className="col-md-12">
                  <hr />
                  <p>
                    <strong>Add a Room or Area</strong>
                  </p>
                </div>
                <div className="col-md-6">
                  <Dropdown
                    placeholder="Choose type"
                    onChange={(selected, item) => this.handleAddRoom(selected, item)}
                    value={this.state.selectedRoomType}
                    labelKey="title"
                    valueKey="title"
                    options={this.props.roomTypes}
                  />
                </div>
                <div className="col-md-6">
                  <button
                    type="button"
                    className="btn btn-secondary btn-icon form-control"
                    onClick={() => this.addRoom()}
                  >
                    <i className="fa fa-plus" aria-hidden="true" />
                    Add
                  </button>
                </div>
              </div>

              <FormGroup>
                <button className="btn btn-danger btn-block" type="submit">
                  Next
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
  validationErrors: state.tenant.getIn(['currentItem', 'validationErrors']),
  showErrors: state.tenant.getIn(['currentItem', 'showErrors']),
  message: state.tenant.getIn(['currentItem', 'message']),
  isLoading: state.tenant.get('isLoading'),
  locations: state.common.get('locations'),
  roomTypes: state.common.get('roomTypes'),
})

const mapDispatchToProps = dispatch => ({
  updateFieldValue: (field, value, parent, isDelete) => dispatch(updateFieldValue(field, value, parent, isDelete)),
  goToTab: data => dispatch(goToTab(data)),
  updateRoomsRequest: (id, data) => dispatch(updateRoomsRequest(id, data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(Rooms))
