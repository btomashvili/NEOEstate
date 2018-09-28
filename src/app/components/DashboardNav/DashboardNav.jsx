/* eslint react/prop-types:0 */
import React from 'react'
import { Link } from 'react-router'
import DashboardNavListItem from './DashboardNavListItem'
import DashboardNavUserpanel from './DashboardNavUserpanel'
import './DashboardNav.scss'

const DashboardNavBar = props => <nav className="home-nav dashboard-navigation">{props.children}</nav>

const DashboardNavLogo = () => (
  <Link to="/" className="home-nav__logo">
    {''}
  </Link>
)

const DashboardNavList = props => (
  <ul className={`home-nav__list ${props.showNav ? 'home-nav__list--visible' : ''}`}>{props.children}</ul>
)

export { DashboardNavBar, DashboardNavLogo, DashboardNavList, DashboardNavListItem, DashboardNavUserpanel }
