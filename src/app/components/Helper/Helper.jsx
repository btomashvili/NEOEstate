import React from 'react'
import './Helper.scss'

const ConnectionStatus = props => <span className={`connection-status connection-status--${props.status}`} />

export { ConnectionStatus }
