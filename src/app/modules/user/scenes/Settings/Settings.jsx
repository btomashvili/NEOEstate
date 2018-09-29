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
  var hex = hexx.toString();//force conversion
  var str = '';
  for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

class SettingsScreen extends Component {

  constructor(props) {
    super(props)
    this.invoke = this.invoke.bind(this)
    this.state = {
      result: '',
      scriptHash: '',
      operation: '',
    }
  }

  invoke() {
    this.setState({ result: '' })

    const nos = window.NOS.V1
    const { NEO, GAS } = window.NOS.ASSETS

    // const scriptHash = '2f228c37687d474d0a65d7d82d4ebf8a24a3fcbc'
    const scriptHash = '892a41e4f530845581c63ec9e703c564815b009e'
    const operation = 'okaa'
    // const args = ['ef68bcda-2892-491a-a7e6-9c4cb1a11732']
    const args = []

    const assets = {
      [NEO]: '1',
      [GAS]: '2.04950068',
    }

    // nos.invoke({ scriptHash, operation, args, assets })
    // .then((script) => {
    //   // alert(`Test invoke script: ${script} `)
    //   this.setState({ result: script })
    //   console.log('script', script)
    // })
    // .catch((err) => {
    //   // alert(`Error: ${err.message}`)
    //   this.setState({ result: err.message })
    //   console.log('error', err)
    // })

    nos.testInvoke({ scriptHash, operation, args, assets })
    .then((script) => {
      // alert(`Test invoke script: ${script} `)
      console.log('script', script.stack[0].value)
      this.setState({ result: hex2a(script.stack[0].value ) })
    })
    .catch((err) => {
      // alert(`Error: ${err.message}`)
      console.log('error', err)
      this.setState({ result: err.message })
    })
  }

  // handleScriptHash(event) {
  //   this.setState({ scriptHash : event.target.value});
  // }

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
              {/* <FormGroupRow>
                <Input
                  className="form-control"
                  value={this.state.scriptHash}
                  placeholder="ScriptHash"
                  onChange={(value) => {  }}
                  type="text"
                />
              </FormGroupRow> */}
              <FormGroupRow>
                <Button
                  type="submit"
                  className="button--block button--picton-blue  button--padding-lg"
                  onClick={this.invoke}
                >
                    Invoke
                  </Button>
              </FormGroupRow>
              <FormGroupRow>
                <label htmlFor="test"> {this.state.result}</label>
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
