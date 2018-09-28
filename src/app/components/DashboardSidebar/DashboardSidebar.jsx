import React from 'react'
import { Link, createRoutes } from 'react-router'
import ScrollArea from 'react-scrollbar'
import routes from '../../routes'
import './DashboardSidebar.scss'
import { roles } from '../../utils/permission'
import LogoutIcon from '../../resources/assets/images/icons/logout-dashboard.svg'

const isChildRoute = (props, item) => {
  const parent = props.route.parent
  return item === parent
}

const DashboardSidebar = props => (
  <div className="dashboard-sidebar">
    <ScrollArea speed={0.8} className="dashboard-sidebar__scroll" horizontal={false}>
      <ul className="dashboard-sidebar__list">
        {createRoutes(routes())[0].childRoutes.map(
          (item, key) =>
            item.isDashboard && !(roles.admin === props.currentUserRole && item.path === '/admin') ? (
              <li key={key} className="dashboard-sidebar__list-item">
                <Link
                  to={item.path}
                  className={`dashboard-sidebar__list-item-link ${isChildRoute(props, item.path) ? 'active' : ''}`}
                  activeClassName="active"
                >
                  <img src={item.icon} alt="" />
                  <span className="dashboard-sidebar__list-item-text">{item.title}</span>
                </Link>
              </li>
            ) : null
        )}
        <li className="dashboard-sidebar__list-item">
          <button onClick={e => props.onLogOut(e)} className="dashboard-sidebar__list-item-button">
            <img src={LogoutIcon} alt="" />
            <span className="dashboard-sidebar__list-item-text">Log out</span>
          </button>
        </li>
      </ul>
    </ScrollArea>
  </div>
)

export default DashboardSidebar
