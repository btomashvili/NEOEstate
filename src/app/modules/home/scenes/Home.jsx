import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import './Home.scss'
import '../../../components/Button/Button.scss'
import AssetManagment from '../../assets/scenes/AssetManagment/AssetManagment'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <AssetManagment />
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
