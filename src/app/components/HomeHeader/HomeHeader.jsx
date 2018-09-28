/* eslint react/prop-types:0 */
import React, { PropTypes } from 'react'
import header from '../../resources/assets/images/registration-header.svg'
import './HomeHeader.scss'

const HomeHeader = props => (
  <header className="home-header">
    <div className="home-header__info">
      <h4 className="home-header__info-name">{props.eventName}</h4>
      <h5 className="home-header__info-title">{props.pageTitle}</h5>
      <p className="home-header__info-description">{props.eventDescription}</p>
    </div>
    <img src={header} alt="" />
  </header>
)

HomeHeader.PropTypes = {
  eventName: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  eventDescription: PropTypes.string.isRequired,
}

export default HomeHeader
