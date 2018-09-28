import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import { browserHistory } from 'react-router'
import _ from 'lodash'

import { FormGroup } from '../../../../../components/FormGroup/FormGroup'
import InputNumberVobi from '../../../../../components/InputNumberVobi/InputNumberVobi'
import AutocompleteInput from '../../../../../components/AutocompleteInput/AutocompleteInput'

import {
  goToTab,
  updateFieldValue,
  unitListRequest,
  addUnitRequest,
  updateUnitRequest,
  getPropertyUnitRequest,
} from '../../../actions/tenantActions'
import { ruleRunnerImmutable, run } from '../../../../../utils/ruleRunner'
import { required } from '../../../../../utils/rules'
import { housingTypes, roomTypes } from '../../../../../utils/rooms'

import './Unit.scss'

const fieldValidations = [ruleRunnerImmutable('unit.details.totalFloors', 'Total Floors', required)]

class Unit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filled: this.props.data.getIn(['unit', 'id']),
      editMode: this.props.editUnit,
    }
  }

  componentDidMount() {
    if (this.props.data.getIn(['property', 'housingType']) === 'Single Family House') {
      const property = this.props.data.getIn(['property', 'id'])
      this.props.getPropertyUnitRequest(property)
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    this.props.updateFieldValue('validationErrors', run(this.props.data, fieldValidations), 'currentItem')

    this.props.updateFieldValue('showErrors', true, 'currentItem')
    this.props.updateFieldValue('message.text', '', 'currentItem')

    setTimeout(() => {
      if (this.props.validationErrors.size > 0) return

      const totalFloors = parseInt(this.props.data.getIn(['unit', 'details', 'totalFloors']))
      // if totaFloors === 1 then floor = 1 else null
      const floor = totalFloors === 1 ? 1 : null
      // const floor = totalFloors // s=== 1 ? 1 : null

      let rooms = this.props.data.getIn(['unit', 'rooms']).toJS()

      // If adding new unit or editing existing update unit rooms
      if (!this.props.data.getIn(['unit', 'id']) || this.props.editUnit) {
        // If adding new unit add pre-defined rooms
        if (!this.props.data.getIn(['unit', 'id'])) {
          // NOTE: default rooms
          rooms = this.addOrUpdateRoom(rooms, roomTypes.livingRoom, '', null)
          rooms = this.addOrUpdateRoom(rooms, roomTypes.kitchen, '', null)
          rooms = this.addOrUpdateRoom(rooms, roomTypes.breakfast, '', null)
          rooms = this.addOrUpdateRoom(rooms, roomTypes.gameRoom, '', null)
          rooms = this.addOrUpdateRoom(rooms, roomTypes.garage, '', null)
          rooms = this.addOrUpdateRoom(rooms, roomTypes.office, '', null)
          // NOTE: we are adding halfbathroom see line 146
          // rooms = this.addOrUpdateRoom(rooms, roomTypes.halfBathroom, '', null)
          rooms = this.addOrUpdateRoom(rooms, roomTypes.diningRoom, '', null)
          rooms = this.addOrUpdateRoom(rooms, roomTypes.utilityRoom, '', null)
          rooms = this.addOrUpdateRoom(rooms, roomTypes.other, '', null)

          if (
            this.props.data.getIn(['property', 'housingType']) === housingTypes.singleFamily ||
            this.props.data.getIn(['property', 'housingType']) === housingTypes.multiFamily
          ) {
            // rooms = this.addOrUpdateRoom(rooms, roomTypes.exterior, '', floor, false, true)
            rooms = this.addOrUpdateRoom(rooms, roomTypes.exterior, '', null, false, true)
          }
          if (totalFloors >= 2) {
            rooms = this.addOrUpdateRoom(rooms, roomTypes.stairway, '', floor)
          }
        }

        // If total bedrooms is one or master bedroom is checked - add master bedroom (or update one) else - remove (if exists)
        // REGION BEDROOMS
        const masterBedroom =
          this.props.data.getIn(['unit', 'details', 'bedrooms', 'master']) ||
          this.props.data.getIn(['unit', 'details', 'bedrooms', 'total']) === 1

        // if (masterBedroom) {
        //   rooms = this.addOrUpdateRoom(rooms, roomTypes.masterBedroom, '', floor, true)
        // } else {
        //   rooms = this.removeRoom(rooms, roomTypes.masterBedroom)
        // }

        const bedroomsQuantity = this.props.data.getIn(['unit', 'details', 'bedrooms', 'total'])
        // const bedroomsExists = rooms.filter(item => item.title === roomTypes.bedroom).length
        // rooms = this.addOrUpdateRoomsBedroom(rooms, roomTypes.bedroom, '', floor, masterBedroom, bedroomsQuantity, bedroomsExists)
        // console.log('BEFORE ROOMS =>>', rooms)

        this.removeRoomsByType(rooms, roomTypes.bedroom, masterBedroom)
        this.removeRoomsByType(rooms, roomTypes.masterBedroom, masterBedroom)

        if (masterBedroom) {
          this.addMasterRoom(rooms, roomTypes.masterBedroom, '', floor)
        }
        this.addRooms(rooms, roomTypes.bedroom, '', floor, masterBedroom, bedroomsQuantity)

        // console.log('AFTER ROOMS =>>', rooms)
        // console.log('ROOMS :=>>', rooms.length, masterBedroom, bedroomsExists, bedroomsQuantity)
        // console.log('NEWW =>>', _rooms)
        // END OF REGION BEDROOMS

        // If total full bathrooms is one or master full bathrooms is checked - add master full bathrooms (or update one) else - remove (if exists)
        const masterBathroom =
          this.props.data.getIn(['unit', 'details', 'fullBaths', 'master']) ||
          this.props.data.getIn(['unit', 'details', 'fullBaths', 'total']) === 1

        // if (masterBathroom) {
        //   rooms = this.addOrUpdateRoom(rooms, roomTypes.masterFullBathroom, '', floor, true)
        // } else {
        //   rooms = this.removeRoom(rooms, roomTypes.masterFullBathroom)
        // }

        const bathQuantity = this.props.data.getIn(['unit', 'details', 'fullBaths', 'total'])
        // const bathExists = rooms.filter(item => item.title === roomTypes.fullBathroom).length
        // rooms = this.addOrUpdateRooms(rooms, roomTypes.fullBathroom, '', floor, masterBathroom, bathQuantity, bathExists)

        this.removeRoomsByType(rooms, roomTypes.masterFullBathroom, masterBathroom)
        this.removeRoomsByType(rooms, roomTypes.fullBathroom, masterBathroom)

        if (masterBathroom) {
          this.addMasterRoom(rooms, roomTypes.masterFullBathroom, '', floor)
        }
        this.addRooms(rooms, roomTypes.fullBathroom, '', floor, masterBathroom, bathQuantity)

        // Update half bathroom quantity to match entered data
        const halfbathQuantity = this.props.data.getIn(['unit', 'details', 'halfBaths'])

        // const halfbathExists = rooms.filter(item => item.title === roomTypes.halfBathroom).length
        // rooms = this.addOrUpdateRooms(rooms, roomTypes.halfBathroom, '', floor, false, halfbathQuantity, halfbathExists)

        this.addRooms(rooms, roomTypes.halfBathroom, '', floor, false, halfbathQuantity)

        // const hallwaysQuantity = totalFloors
        const basement = this.props.data.getIn(['unit', 'details', 'basement'])
        // ყოველ დამატებულ ოთახზე უნდა დაემატოს Hallways
        // Halls: For every floor in the Unit, automatically add a "Halls" and assign it to that floor.
        // console.log('before addupdate Halls =>> ', rooms, totalFloors)
        rooms = this.addOrUpdateHalls(rooms, roomTypes.hallways, basement, totalFloors)
        // console.log('after addupdate Halls =>> ', rooms, totalFloors)
      }

      this.props.updateFieldValue('unit.rooms', rooms, 'currentItem.data')

      const property = this.props.data.getIn(['property', 'id'])
      const housingType = this.props.data.getIn(['property', 'housingType'])
      this.props.updateFieldValue('unit.property', property, 'currentItem.data')
      this.props.updateFieldValue('unit.housingType', housingType, 'currentItem.data')

      // Update or add new Unit
      const unit = this.props.data.get('unit').toJS()
      if (!unit.id) {
        this.showEditUnit()
        this.props.addUnitRequest(unit)
      } else if (this.state.editMode) {
        this.props.updateUnitRequest(unit.id, unit)
      }

      // If Adding new unit or updating existing one -> go to Rooms tab, else -> go to Tenants list
      if (!this.props.data.getIn(['information', 'lease', '_id']) || this.props.editUnit) {
        this.props.goToTab(3)
      } else {
        browserHistory.push('/tenants')
      }
    }, 100)
  }

  // get room type object areas { code, items : [ {}, {} ]}
  getRoomType(title) {
    const data = this.props.roomTypes.filter(item => item.get('title').toLowerCase() === title.toLowerCase()).toJS()[0]
    // console.log('getRoomTYpe =>> ', data)
    return data
  }

  addOrUpdateRoom(rooms, title, location, floor, master, disabled) {
    // console.log('floor : ', floor, title)
    let data = rooms
    const filtered = rooms.filter(item => item.title.toLowerCase() === title.toLowerCase())
    if (filtered.length) {
      data = rooms.map((item) => {
        if (item.title.toLowerCase() === title.toLowerCase()) {
          // item
        }
        return item
      })
    } else if (floor) {
      data.push(
        Object.assign({}, this.getRoomType(title), {
          location,
          floor,
          master,
          disabled,
          label: `${title} ${!isNaN(floor) ? floor + 1 : floor}`,
        })
      )
      // data.push(Object.assign({}, this.getRoomType(title), { location, floor, label: `${title} ${i + 1}` }))
    } else {
      data.push(Object.assign({}, this.getRoomType(title), { location, floor, master, disabled, label: `${title}` }))
    }

    return data
  }

  removeRoom = (rooms, title, quantity) => {
    if (!quantity) {
      return rooms.filter(item => item.title.toLowerCase() !== title.toLowerCase())
    }
    let roomsToRemove = quantity
    const data = []
    rooms.map((item) => {
      if (item.title.toLowerCase() === title.toLowerCase() && roomsToRemove > 0) {
        roomsToRemove -= 1
      } else {
        data.push(item)
      }
    })
    return data
  }

  addOrUpdateRooms(rooms, title, location, floor, master, totalQuantity, exists) {
    // const halfbathQuantity = this.props.data.getIn(['unit', 'details', 'halfBaths'])
    // const halfbathExists = rooms.filter(item => item.title === roomTypes.halfBathroom).length
    // rooms = this.addOrUpdateRooms(rooms, roomTypes.halfBathroom, '', floor, false, halfbathQuantity, halfbathExists)

    // console.log('addOrUpdateRooms :=>>>', title, floor, master, exists)
    let data = rooms
    const quantity = master ? totalQuantity - 1 : totalQuantity
    if (quantity > exists) {
      for (let i = 0; i < quantity - exists; i++) {
        if (floor) {
          data.push(
            Object.assign({}, this.getRoomType(title), {
              location,
              floor,
              label: `${title} ${!isNaN(floor) ? floor + 1 : floor}`,
            })
          )
        } else {
          data.push(Object.assign({}, this.getRoomType(title), { location, floor, label: `${title}` }))
        }
      }
    } else if (quantity < exists) {
      // console.log('Remove::', title)
      data = this.removeRoom(data, title, exists - quantity)
    }

    return data
  }

  // TODO: remove rooms by type
  removeRoomsByType = (rooms, title) => _.remove(rooms, item => item.title === title)

  addMasterRoom(rooms, title, location, floor) {
    const data = rooms
    data.push(Object.assign({}, this.getRoomType(title), { location, floor, label: title }))
    return data
  }

  addRooms(rooms, title, location, floor, master, bedroomQunatity) {
    const data = rooms
    let _iterateLength = bedroomQunatity
    // თუ მასტერია მაშინ -1 ნაკლები იტერაცია უნდა გააკეთოს
    if (master) {
      _iterateLength -= 1
    }
    for (let i = 0; i < _iterateLength; i++) {
      if (floor) {
        // TODO: აქ შემოდის თუ არა გასარკვევია
        // data.push(Object.assign({}, this.getRoomType(title), { location, floor, label: `${title} ${!isNaN(floor) ? floor + 1 : floor}` }))
        data.push(Object.assign({}, this.getRoomType(title), { location, floor, label: `${title} ${i + 1}` }))
      } else if (master) {
        // თუ მასტერია მონიშნული
        data.push(Object.assign({}, this.getRoomType(title), { location, floor, label: `${title} ${i + 2}` }))
      } else {
        // თუ მასტერი არ არი მონიშნული
        data.push(Object.assign({}, this.getRoomType(title), { location, floor, label: `${title} ${i + 1}` }))
      }
    }
    return data
  }

  // Hallways update
  // Halls: For every floor in the Unit, automatically add a "Halls" and assign it to that floor.
  addOrUpdateHalls(rooms, title, basement, totalFloors) {
    const data = rooms

    for (let i = 0; i < totalFloors; i++) {
      let floor = 0
      if (totalFloors === 1) {
        floor = 1
      } else if (basement && i === 0) {
        floor = 'Basement'
      } else if (!basement) {
        floor = i + 1
      } else {
        floor = i
      }
      // NOTE: add +1 if not basement and floor is integer
      const index = data.findIndex(item => item.label === `${roomTypes.hallways} ${!isNaN(floor) ? floor + 1 : floor}`)
      // console.log('INDEX : ', index, `${roomTypes.hallways} ${!isNaN(floor) ? floor + 1 : floor}`)
      if (index < 0) {
        // if this key does not exists then add to rooms
        // console.log('Shemovida : ', index)
        // თუ floor არის ინტეგერი 1, 2 , უმატებს ერთს , წინააღდეგ შმეტხევაში შეიძლება იყოს Basement
        data.push(
          Object.assign({}, this.getRoomType(title), {
            location: '',
            floor: floor.toString(),
            label: `${roomTypes.hallways} ${!isNaN(floor) ? floor + 1 : floor}`,
          })
        )
      }
    }
    // console.log('DATA : ', data)
    return data
  }

  errorFor(field) {
    return this.props.validationErrors.get(field)
  }

  showError(field) {
    return this.props.showErrors && this.props.validationErrors.get(field) !== undefined
  }

  handleFieldChanged(field, value) {
    return (e) => {
      this.props.updateFieldValue(field, value || e.target.value, 'currentItem.data')
    }
  }

  handleFieldChangedNew(field, value) {
    return (e) => {
      this.props.updateFieldValue(field, value || e, 'currentItem.data')
    }
  }

  handleCheckbox(field) {
    this.props.updateFieldValue(field, !this.props.data.getIn(field.split('.')), 'currentItem.data')
  }

  showEditUnit() {
    this.setState({ filled: false, editMode: true })
    this.props.updateFieldValue('editUnit', true, 'currentItem')
  }

  searchUnit(value) {
    const query = {
      where: {
        unitNumber: parseInt(value) || 0,
      },
      limit: 10,
    }
    this.props.unitListRequest(query)
  }

  handleAutocomplete(value, item) {
    if (!item) {
      this.props.updateFieldValue('unit.unitNumber', value, 'currentItem.data')
      this.props.updateFieldValue('unit.id', '', 'currentItem.data')
    } else if (item) {
      this.props.updateFieldValue('unit.unitNumber', value, 'currentItem.data')
      this.props.updateFieldValue('unit.id', item.id, 'currentItem.data')
      this.props.updateFieldValue('unit.details', item.details, 'currentItem.data')
      this.props.updateFieldValue('unit.rooms', item.rooms, 'currentItem.data')
    }
    this.setState({ filled: item, editMode: false })
  }
  render() {
    const units = typeof this.props.units.toJS === 'function' ? this.props.units.toJS() : this.props.units
    return (
      <div className="tab-content tab-unit">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.onFormSubmit}>
              {this.props.data.getIn(['property', 'housingType']) !== 'Single Family House' && (
                <div className="form-group row">
                  <div className="col-md-2">
                    <AutocompleteInput
                      label="Unit number"
                      dataKey="unitNumber"
                      data={units}
                      value={this.props.data.getIn(['unit', 'unitNumber'])}
                      onChange={(value, item) => {
                        this.handleAutocomplete(value, item)
                        this.searchUnit(value)
                      }}
                      message={this.errorFor('unit.unitNumber')}
                      hasError={this.showError('unit.unitNumber')}
                      renderItem={(item, isHighlighted) => (
                        <div
                          className={`dropdown-item item ${isHighlighted ? 'bg-primary text-light' : ''}`}
                          key={item.id}
                        >
                          {item.unitNumber}
                        </div>
                      )}
                    />
                  </div>
                </div>
              )}

              {this.state.filled &&
                !this.state.editMode && (
                  <div className="form-group">
                    <li>
                      <strong>{this.props.data.getIn(['unit', 'details', 'totalFloors'])}</strong>
                      &nbsp; floors{' '}
                      {this.props.data.getIn(['unit', 'details', 'basement']) && <span>(Including basement)</span>}
                    </li>
                    <li>
                      <strong>{this.props.data.getIn(['unit', 'details', 'bedrooms', 'total'])}</strong>
                      &nbsp; bedrooms{' '}
                      {this.props.data.getIn(['unit', 'details', 'bedrooms', 'master']) && (
                        <span>(Including master)</span>
                      )}
                    </li>
                    <li>
                      <strong>{this.props.data.getIn(['unit', 'details', 'fullBaths', 'total'])}</strong>
                      &nbsp; full bathrooms{' '}
                      {this.props.data.getIn(['unit', 'details', 'fullBaths', 'master']) && (
                        <span>(Including master)</span>
                      )}
                    </li>
                    <li>
                      <strong>{this.props.data.getIn(['unit', 'details', 'halfBaths'])}</strong>
                      &nbsp; half bathrooms
                    </li>
                    <br />
                    <p>
                      <a className="text-underlined" onClick={() => this.showEditUnit()}>
                        Update Unit Details
                      </a>{' '}
                      (Altering an existing Unit will cause variances between old and new inspction reports)
                    </p>
                  </div>
                )}

              {(!this.state.filled || this.state.editMode) && (
                <div>
                  {/* <div className="form-group row">
                                    <label>Total floors</label>
                                </div> */}
                  <div className="form-group row">
                    <div className="col-md-2">
                      <InputNumberVobi
                        placeholder="Total floors"
                        label="Total floors"
                        name="totalFloors"
                        value={this.props.data.getIn(['unit', 'details', 'totalFloors'])}
                        onChange={this.handleFieldChangedNew('unit.details.totalFloors')}
                        message={this.errorFor('unit.details.totalFloors')}
                        hasError={this.showError('unit.details.totalFloors')}
                      />
                    </div>
                    {this.props.data.getIn(['unit', 'details', 'totalFloors']) > 1 && (
                      <div className="col-md-10">
                        <div className="form-group">
                          <label htmlFor="floors">Make One Basement</label>
                          <input
                            type="checkbox"
                            id="floor"
                            onChange={() => this.handleCheckbox('unit.details.basement')}
                            checked={this.props.data.getIn(['unit', 'details', 'basement'])}
                          />
                          <label className={`switch ${this.state.filled}`} htmlFor="floor">
                            Toggle
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="form-group row">
                    <div className="col-md-2">
                      <InputNumberVobi
                        placeholder="Total bedrooms"
                        label="Total bedrooms"
                        name="totalBedrooms"
                        value={this.props.data.getIn(['unit', 'details', 'bedrooms', 'total'])}
                        onChange={this.handleFieldChangedNew('unit.details.bedrooms.total')}
                        message={this.errorFor('unit.details.bedrooms.total')}
                        hasError={this.showError('unit.details.bedrooms.total')}
                      />
                    </div>
                    {this.props.data.getIn(['unit', 'details', 'bedrooms', 'total']) > 1 && (
                      <div className="col-md-10">
                        <div className="form-group">
                          <label htmlFor="bedroom">Make One a Master Bedroom</label>
                          <input
                            type="checkbox"
                            id="bedrroom"
                            onChange={() => this.handleCheckbox('unit.details.bedrooms.master')}
                            checked={this.props.data.getIn(['unit', 'details', 'bedrooms', 'master'])}
                          />
                          <label className={`switch ${this.state.filled}`} htmlFor="bedrroom">
                            Toggle
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="form-group row">
                    <div className="col-md-2">
                      <InputNumberVobi
                        placeholder="Total full bath"
                        label="Total full bath"
                        name="totalFullBaths"
                        value={this.props.data.getIn(['unit', 'details', 'fullBaths', 'total'])}
                        onChange={this.handleFieldChangedNew('unit.details.fullBaths.total')}
                        message={this.errorFor('unit.details.fullBaths.total')}
                        hasError={this.showError('unit.details..fullBaths.total')}
                      />
                    </div>
                    {this.props.data.getIn(['unit', 'details', 'fullBaths', 'total']) > 1 && (
                      <div className="col-md-10">
                        <div className="form-group">
                          <label htmlFor="bathroom">Make One a Master Bath</label>
                          <input
                            type="checkbox"
                            id="bath"
                            onChange={() => this.handleCheckbox('unit.details.fullBaths.master')}
                            checked={this.props.data.getIn(['unit', 'details', 'fullBaths', 'master'])}
                          />
                          <label className={`switch ${this.state.filled}`} htmlFor="bath">
                            Toggle
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="form-group row">
                    <div className="col-md-2">
                      <InputNumberVobi
                        placeholder="Total half bath"
                        label="Total half bath"
                        name="halfBaths"
                        value={this.props.data.getIn(['unit', 'details', 'halfBaths'])}
                        onChange={this.handleFieldChangedNew('unit.details.halfBaths')}
                        message={this.errorFor('unit.details.halfBaths')}
                        hasError={this.showError('unit.details.halfBaths')}
                      />
                    </div>
                  </div>
                </div>
              )}

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
  units: state.tenant.get('units'),
  validationErrors: state.tenant.getIn(['currentItem', 'validationErrors']),
  showErrors: state.tenant.getIn(['currentItem', 'showErrors']),
  message: state.tenant.getIn(['currentItem', 'message']),
  isLoading: state.tenant.get('isLoading'),
  editUnit: state.tenant.getIn(['currentItem', 'editUnit']),
  states: state.common.get('states'),
  roomItems: state.common.get('roomItems'),
  roomTypes: state.common.get('roomTypes'),
})

const mapDispatchToProps = dispatch => ({
  updateFieldValue: (field, value, parent, isDelete) => dispatch(updateFieldValue(field, value, parent, isDelete)),
  goToTab: data => dispatch(goToTab(data)),
  unitListRequest: data => dispatch(unitListRequest(data)),
  getPropertyUnitRequest: data => dispatch(getPropertyUnitRequest(data)),
  addUnitRequest: data => dispatch(addUnitRequest(data)),
  updateUnitRequest: (id, data) => dispatch(updateUnitRequest(id, data)),
})

Unit.propTypes = {
  //   translate: PropTypes.func,
  //   roleList: PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(Unit))
