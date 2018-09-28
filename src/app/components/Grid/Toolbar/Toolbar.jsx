import React from 'react'
import './Toolbar.scss'

const Toolbar = ({ children, className }) => <div className={`table-toolbar ${className}`}>{children}</div>

export default Toolbar
