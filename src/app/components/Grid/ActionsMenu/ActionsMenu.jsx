import React from 'react'
import classNames from 'classnames'
import './ActionsMenu.scss'
import Tooltip from '../../Tooltip/Tooltip'

// import menuActions from '../../../assets/images/menu-actions.svg';

export default class ActionsMenu extends React.Component {
  state = {
    open: false,
  }

  handleMenuBehavior = (e) => {
    if (e.target != this.trigger && this.state.open) {
      this.hideMenu()
    }
  }

  componentDidMount = () => {
    this.trigger.addEventListener('click', this.toggleMenu)
    document.addEventListener('click', this.handleMenuBehavior)
  }

  componentWillUnmount() {
    this.trigger.removeEventListener('click', this.toggleMenu)
    document.removeEventListener('click', this.handleMenuBehavior)
  }

  toggleMenu = (e) => {
    if (this.trigger === e.target && this.state.open) {
      this.hideMenu()
    } else {
      this.displayMenu()
    }
  }

  displayMenu = () => {
    this.setState({
      open: true,
    })
  }

  hideMenu = () => {
    this.setState({
      open: false,
    })
  }

  renderItem = (action, i) => {
    const itemEl = (
      <Tooltip key={i} text={action.tooltip}>
        <li className="actions-menu__item">
          <button className={classNames('action-button', `action-button--${action.type}`)} onClick={action.handler} />
        </li>
      </Tooltip>
    )

    return action.hide ? !action.hide(this.props.context) && itemEl : itemEl
  }

  render() {
    const menuClassList = classNames('actions-menu', {
      'actions-menu--open': this.state.open,
    })

    return (
      <div className={menuClassList}>
        {/* <img className="actions-menu__trigger" ref={(el) => {this.trigger = el}} src={this.props.icon || menuActions} />*/}
        {this.state.open && (
          <ul className="actions-menu__list">{this.props.list.map((action, i) => this.renderItem(action, i))}</ul>
        )}
      </div>
    )
  }
}

ActionsMenu.propTypes = {
  context: React.PropTypes.object,
}
