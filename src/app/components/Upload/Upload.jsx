import React, { PropTypes } from 'react'
import Button from '../Button/Button'
import { roles } from '../../utils/permission.js'
import { generateUserAvatarUrl } from '../../utils/helper'
import './Upload.scss'

const Upload = (props) => {
  let input
  const styles = props.value.length
    ? {
      background: `url(${generateUserAvatarUrl(props.userID, props.value)}) no-repeat center center`,
    }
    : {}
  return (
    <div className={`upload-wrapper ${props.wrapperClass}`}>
      {props.label && (
        <label htmlFor={props.name} className={`upload__label ${props.required ? 'upload__label--required' : ''}`}>
          {props.label}
        </label>
      )}
      <div className={`upload ${props.className}`}>
        <div className="upload__picture">
          <div
            className={`upload__picture-img ${props.hasError ? 'upload__picture-img--has-error' : ''}`}
            style={styles}
          />
        </div>

        <div className="upload__info">
          <p className={`align--left ${props.hasError ? 'upload__info--has-error' : ''}`}>
            <span>{props.uploadText}</span>
          </p>
          <Button className="upload__button" type="button" isLoading={props.isLoading} onClick={() => input.click()}>
            Upload
          </Button>

          {(props.currentUserRole === roles.admin || props.currentUserRole === roles.superAdmin) && (
            <a
              className="button button--picton-blue download__button"
              download
              href={generateUserAvatarUrl(props.userID, props.value)}
            >
              Download
            </a>
          )}
          <input
            onChange={e => props.onChange(e)}
            type="file"
            name={props.name}
            className="upload__input"
            ref={el => (input = el)}
            accept="image/*"
          />
        </div>
      </div>
    </div>
  )
}

Upload.defaultProps = {
  className: '',
  wrapperClass: '',
  label: false,
  required: false,
  value: '',
  hasError: false,
}

Upload.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  wrapperClass: PropTypes.string,
  className: PropTypes.string,
  uploadText: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  hasError: PropTypes.bool,
  required: PropTypes.bool,
  isLoading: PropTypes.bool,
}

export default Upload
