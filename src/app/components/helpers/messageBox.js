import { EventEmitter } from 'fbemitter'

export const MessageBoxEventEmitter = new EventEmitter()

export const MESSAGE_BOX_SHOW = 'MESSAGE_BOX_SHOW'
export const MESSAGE_BOX_DISMISS = 'MESSAGE_BOX_DISMISS'

export function showMessageBox(options) {
  MessageBoxEventEmitter.emit(MESSAGE_BOX_SHOW, options)
}

export function dismissMessageBox() {
  MessageBoxEventEmitter.emit(MESSAGE_BOX_DISMISS)
}
