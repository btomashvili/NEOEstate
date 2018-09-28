import React from 'react'
import { MessageBoxEventEmitter, MESSAGE_BOX_SHOW, MESSAGE_BOX_DISMISS, dismissMessageBox } from '../helpers/messageBox'
import Button from '../Button/Button'
import './MessageBox.scss'

// import closeIcon from '../../assets/images/close.svg';

export default class MessageBox extends React.Component {
  state = {
    options: null,
  }

  constructor(props) {
    super(props)

    MessageBoxEventEmitter.addListener(MESSAGE_BOX_SHOW, (options) => {
      this.setState({
        options,
      })
    })

    MessageBoxEventEmitter.addListener(MESSAGE_BOX_DISMISS, (options) => {
      this.setState({
        options: null,
      })
    })
  }

  closeMessageBox = () => {
    if (this.state.options.cancelCallback) {
      this.state.options.cancelCallback()
    }

    dismissMessageBox()
  }

  confirmAction = () => {
    if (this.state.options.confirmCallback) {
      this.state.options.confirmCallback()
    }

    dismissMessageBox()
  }
  // <img src={closeIcon} className="message-box__close" onClick={this.closeMessageBox} />

  render() {
    return (
      <div className="hide-when-empty">
        {this.state.options && (
          <div className="message-box">
            <div className="message-box__dimmer">
              <div className="message-box__modal">
                <div className="message-box__wrap">
                  <div className="message-box__content">
                    <img src={this.state.options.icon} className="message-box__icon" />
                    <p
                      className="message-box__text"
                      dangerouslySetInnerHTML={{
                        __html: this.state.options.text,
                      }}
                    />
                    <div className="message-box__buttons">
                      <Button className="button--red-violet" onClick={this.closeMessageBox}>
                        {this.props.translate('cancel')}
                      </Button>
                      <Button className="button--picton-blue" onClick={this.confirmAction}>
                        {this.props.translate('confirm')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
