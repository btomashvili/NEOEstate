import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import './Settings.scss'
import { FormGroupRow } from '../../../../components/FormGroup/FormGroup'
// import Input from '../../../../components/Input'
import Button from '../../../../components/Button/Button'

import {
  fetchUserRequest,
  updateFieldValue,
} from '../../../currentUser/actions/currentUserActions'

import { injectNOS } from '@nosplatform/api-functions/lib/react'


function hex2a(hexx) {
  const hex = hexx.toString()// force conversion
  let str = ''
  for (let i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)    { str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))}
  return str
}

class SettingsScreen extends Component {

  constructor(props) {
    super(props)
    this.invoke = this.invoke.bind(this)
    this.handleOperation = this.handleOperation.bind(this)
    this.handleScriptHash = this.handleScriptHash.bind(this)
    this.sendNEO = this.sendNEO.bind(this)

    this.state = {
      result: '',
      resultScript: '',
      scriptHash: '',
      operation: '',

      transferResult: '',
      amount: '',
      address: '',
    }
  }

  sendNEO() {
    this.setState({ transferResult: '' })
    console.log('data =>>', this.state.amount, this.state.address)

    const amount = String(this.state.amount)
    const receiver = String(this.state.address)
    const nos = window.NOS.V1
    console.log('=>>', window.NOS)
    const { GAS } = window.NOS.ASSETS

    nos.send({ asset: GAS, amount, receiver })
     .then(txid => {
       alert(`${amount} GAS sent in transaction ${txid}`)
       console.log('send =>>', txid)
     })
     .catch(err => {
      alert(`Error: ${err.message}`)
      console.log('err =>>', err)
     })
  }

  invoke() {
    this.setState({ result: '', resultScript: '' })

    const nos = window.NOS.V1
    const { NEO, GAS } = window.NOS.ASSETS

    const scriptHash = this.state.scriptHash
    const operation = this.state.operation

    console.log('data', scriptHash, operation)
    // const args = ['ef68bcda-2892-491a-a7e6-9c4cb1a11732']
    const args = []

    const assets = {
      [NEO]: '1',
      [GAS]: '2.04950068',
    }

    nos.invoke({ scriptHash, operation, args, assets })
    .then((script) => {
      // alert(`Test invoke script: ${script} `)
      this.setState({ result: script })
      console.log('script', script)
    })
    .catch((err) => {
      // alert(`Error: ${err.message}`)
      this.setState({ result: err.message })
      console.log('error', err)
    })

    // nos.testInvoke({ scriptHash, operation, args, assets })
    // .then((script) => {
    //   // alert(`Test invoke script: ${script} `)
    //   console.log('script', script)
    //   this.setState({ result: hex2a(script.stack[0].value), resultScript: JSON.stringify(script) })
    // })
    // .catch((err) => {
    //   // alert(`Error: ${err.message}`)
    //   console.log('error', err)
    //   this.setState({ result: err.message })
    // })
  }

  handleScriptHash(event) {
    this.setState({ scriptHash: event.target.value })
  }

  handleOperation(event) {
    this.setState({ operation: event.target.value })
  }

  render() {
    return (
      <div className="settings-page">
        <div className="row">
          <div className="col-md-12">
            <h4>Samples</h4>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div>
              <FormGroupRow>
                <input
                  className="form-control"
                  value={this.state.scriptHash}
                  placeholder="ScriptHash"
                  onChange={this.handleScriptHash}
                  type="text"
                />
              </FormGroupRow>
              <FormGroupRow>
                <input
                  className="form-control"
                  value={this.state.operation}
                  placeholder="Operation Name"
                  onChange={this.handleOperation}
                  type="text"
                />
              </FormGroupRow>
              <FormGroupRow>
                <Button
                  type="submit"
                  className="button--block button--picton-blue  button--padding-lg"
                  onClick={this.invoke}
                >
                    Invoke Contract
                  </Button>
              </FormGroupRow>
              <FormGroupRow>
                <label htmlFor="test"> {this.state.result}</label>
              </FormGroupRow>
              <FormGroupRow>
                <label htmlFor="resultScript"> {this.state.resultScript}</label>
              </FormGroupRow>
            </div>

            <div>
              <FormGroupRow>
                <span>ex: AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y</span>
              </FormGroupRow>
              <FormGroupRow>
                <input
                  className="form-control"
                  value={this.state.address}
                  placeholder="Address"
                  onChange={event => this.setState({ address: event.target.value })}
                  type="text"
                />
              </FormGroupRow>
              <FormGroupRow>
                <input
                  className="form-control"
                  value={this.state.amount}
                  placeholder="Amount"
                  onChange={event => this.setState({ amount: event.target.value })}
                  type="text"
                />
              </FormGroupRow>
              <FormGroupRow>
                <Button
                  type="submit"
                  className="button--block button--picton-blue  button--padding-lg"
                  onClick={this.sendNEO}
                >
                    Send NEO
                  </Button>
              </FormGroupRow>
              <FormGroupRow>
                <label htmlFor="test"> {this.state.result}</label>
              </FormGroupRow>
              <FormGroupRow>
                <label htmlFor="resultScript"> {this.state.resultScript}</label>
              </FormGroupRow>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.currentUser.get('isLoading'),
  validationErrors: state.currentUser.get('validationErrors'),
  states: state.common.get('states'),
  showErrors: state.currentUser.get('showErrors'),
  userData: state.currentUser.get('data'),
  data: state.currentUser.get('data'),
})

const mapDispatchToProps = dispatch => ({
  fetchUserRequest: () => dispatch(fetchUserRequest()),
  updateFieldValue: (field, value, parent, isDelete) => dispatch(updateFieldValue(field, value, parent, isDelete)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectNOS(withTranslate(SettingsScreen)))
