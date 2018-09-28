import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import './WalkthruInfo.scss'
import { getTenantByInviteCodeRequest } from '../../actions/tenantActions'

class WalkthruInfoScreen extends Component {
  //   constructor(props) {
  //     super(props)
  //   }

  componentDidMount() {
    const { params } = this.props
    console.log('InviteCode =>>', params.inviteCode)
    this.props.getWalkthruInfo(params.inviteCode)
    // this.props.activityGetByKeyRequest(params.inviteCode)
  }

  render() {
    if (this.props.walkthru === null) {
      return (
        <div className="settings-page">
          <div className="row">
            <div className="col-md-12">
              <h4>Loading ....</h4>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="settings-page">
        <div className="row">
          <div className="col-md-12">
            <h4>WELCOME TO MyWalkThru</h4>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div>
              <p> Welcome to your new home. </p>
              <h5 style={{ fontWeight: '600' }}> {this.props.walkthru.get('address')} </h5>
              <p>
                {' '}
                At the start of your new lease, it is highly recommended for you to complete a WalkThru of your home.{' '}
              </p>
              <p>
                You will do this using the MyWalkThru app, which is designed for you to take photos and make comments
                about the move-in condition of the home.{' '}
              </p>
              {/* <p style={{ color: 'red', fontWeight: '600', fontSize: '18px' }}>
                            You can complete the WalkThru on an iOS or Android device. Just follow the appropriate button below:
                        </p> */}
              <p style={{ color: 'red', fontWeight: '600', fontSize: '18px' }}>
                To GET STARTED on your WalkThru click on the appropriate link below to download the app:
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div>
            <a href="https://itunes.apple.com/app/mywalkthru/id1367849133?mt=8" target="_blank">
              <img alt="Get on AppStore" width="163" src="https://i.imgur.com/2rHOY4z.png" />
            </a>
          </div>
          <div>
            <a href="https://play.google.com/store/apps/details?id=org.mywalkthru.app.exp">
              <img alt="Get on Google Play" width="163" src="https://i.imgur.com/IkRCvBD.png" />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <div>
              <p> Once you've installed the app, use this WalkThru email and password to get started: </p>
              <h4> Email : {this.props.walkthru.get('email')} </h4>
              <h4> Password : {this.props.walkthru.getIn(['lease', 'inviteCode'])} </h4>

              <p>
                This activity is for the protection of your security deposit. You will have{' '}
                {this.props.walkthru.get('diffDays')} days to perform the WalkThru of your home and submit the report.
              </p>
              <p> Many thanks for your cooperation. </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  walkthru: state.tenant.get('walkthruInfo'),
  isLoading: state.tenant.get('isLoading'),
})

const mapDispatchToProps = dispatch => ({
  getWalkthruInfo: inviteCode => dispatch(getTenantByInviteCodeRequest(inviteCode)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(WalkthruInfoScreen))
