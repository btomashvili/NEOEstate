import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import { FormGroup } from '../../../../components/FormGroup/FormGroup'
import { Input } from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'
import './Login.scss'
import { userLoginRequest, updateFieldValue, activeUserRequest } from '../../actions/currentUserActions'
import { ruleRunnerImmutable, run } from '../../../../utils/ruleRunner'
import { required, invalidEmail } from '../../../../utils/rules'

const fieldValidations = [
  // ruleRunnerImmutable('email', 'Email', invalidEmail),
  // ruleRunnerImmutable('password', 'Password', required),
]

class Login extends Component {
  constructor(props) {
    super(props)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.state = {}
    this.fileReader = new FileReader()

    this.fileReader.onload = (event) => {
      this.setState({ jsonFile: JSON.parse(event.target.result) }, () => {
        console.log(this.state.jsonFile)
      })
    }
  }


  componentDidMount() {
    if (this.props.location.query && this.props.location.query.token) {
      const { token } = this.props.location.query
      this.props.activeUserRequest({ token })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn && this.props.isLoggedIn !== nextProps.isLoggedIn) {
      browserHistory.push('/')
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    // this.props.updateFieldValue('validationErrors', run(this.props.data, fieldValidations), 'login')

    // this.props.updateFieldValue('showErrors', true, 'login')
    // this.props.updateFieldValue('message.text', '', 'login')

    // setTimeout(() => {
    //   if (this.props.validationErrors.size > 0) return
    // }, 100)
    const password = this.props.data.get('password')
    const data = {
      password,
      data: this.state.jsonFile,
    }
    this.props.userLoginRequest(data)
  }

  errorFor(field) {
    return this.props.validationErrors.get(field)
  }

  showError(field) {
    return this.props.showErrors && this.props.validationErrors.get(field) !== undefined
  }

  handleFieldChanged(field, value) {
    return (e) => {
      this.props.updateFieldValue(field, value || e.target.value, 'login.data')
    }
  }

  render() {
    return (
      <div className="login-page">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header">Login</div>
              <div className="card-body">
                <form onSubmit={this.onFormSubmit}>
                  <FormGroup>
                    <Input
                      placeholder="Enter file"
                      label="File"
                      name="file"
                      type="file"
                      isRequired
                      onChange={(e) => {
                        this.fileReader.readAsText(e.target.files[0])
                      }}
                      message={this.errorFor('email')}
                      hasError={this.showError('email')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      placeholder="Enter Password"
                      label="Password"
                      name="password"
                      type="password"
                      value={this.props.data.get('password')}
                      isRequired
                      onChange={this.handleFieldChanged('password')}
                      message={this.errorFor('password')}
                      hasError={this.showError('password')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button className="btn btn-primary btn-block">Login</Button>
                  </FormGroup>
                </form>
              </div>
              <div className="card-footer text-muted">
                <Link to="/register" className="btn btn-link">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  data: PropTypes.object,
  validationErrors: PropTypes.object,
  showErrors: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  updateFieldValue: PropTypes.func,
  //   message: PropTypes.object,
  userLoginRequest: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.currentUser.get('isLoggedIn'),
    data: state.currentUser.getIn(['login', 'data']),
    validationErrors: state.currentUser.getIn(['login', 'validationErrors']),
    showErrors: state.currentUser.getIn(['login', 'showErrors']),
    message: state.currentUser.getIn(['login', 'message']),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateFieldValue,
      userLoginRequest,
      activeUserRequest,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(Login))
