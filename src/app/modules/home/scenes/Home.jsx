import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import './Home.scss'
import '../../../components/Button/Button.scss'
import TenantManagment from '../../tenant/scenes/TenantManagment/TenantManagment'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      return browserHistory.push('/login')
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return <TenantManagment />
    }

    return <Link to="login" />
  }
}

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
}

function mapStateToProps(state, ownProps) {
  return {
    ownProps,
    isLoggedIn: state.currentUser.get('isLoggedIn'),
    currentUserRole: state.currentUser.getIn(['data', 'role']),
  }
}

// const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  null
)(Home)
