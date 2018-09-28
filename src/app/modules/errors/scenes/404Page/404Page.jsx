import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import Button from '../../../../components/Button/Button'
import './404Page.scss'

const FourOFour = props => (
  <div className="FourOFour-wrapper">
    <div />
    <div className="FourOFour-text">
      <h3 className="FourOFour-text--waikawa-grey">Whooooops,</h3>
      <h3 className="FourOFour-text--waikawa-grey">
        This page has encountered a problem, we are currently working to fix it
      </h3>
      <h3 className="FourOFour-text--picton-blue">Please accept our apologies</h3>
      <Button type="button" className="button--red-violet button--padding-lg" onClick={() => browserHistory.push('/')}>
        Back Home
      </Button>
    </div>
  </div>
)

FourOFour.propTypes = {
  backHome: PropTypes.func,
}

export default FourOFour
