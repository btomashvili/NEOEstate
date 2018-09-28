/* eslint react/prop-types:0 */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import './Steps.scss'
import { Notification } from '../Notification/Notification'
import Button from '../Button/Button'
import { generateUserAvatarUrl, generateUserPdfUrl } from '../../utils/helper'
import wizardSuccess from '../../resources/assets/images/wizard-success.svg'
import { roles } from '../../utils/permission.js'
import auth from '../../services/authentication'

const Steps = props => (
  <div className={`steps ${props.className}`}>
    <h2 className="steps__heading">{props.title}</h2>
    <div className="steps__wrapper">{props.children}</div>
  </div>
)

const StepsSidebar = props => (
  <div className="steps__sidebar">
    <ul className="steps__sidebar-list">
      {props.steps.map((step, key) => (
        <li
          key={key}
          className={`steps__sidebar-list-item ${
            props.activeStep === key + 1 ? 'steps__sidebar-list-item--active' : ''
          }`}
        >
          <span className="steps__sidebar-list-dott" onClick={() => props.stepOnClick(key + 1)} />
          <span className="steps__sidebar-list-step" onClick={() => props.stepOnClick(key + 1)}>
            Step
            {key + 1}
          </span>
          <span className="steps__sidebar-list-title" onClick={() => props.stepOnClick(key + 1)}>
            {step.title}
          </span>
          {step.children && (
            <ul className="steps__sidebar-sub-list">
              {step.children.map((subStep, subKey) => (
                <li
                  key={subKey}
                  className={`steps__sidebar-sub-list-item ${
                    props.activeStep === key + 1 && props.activeSubStep === subKey + 1
                      ? 'steps__sidebar-sub-list-item--active'
                      : ''
                  }`}
                  onClick={e => props.subStepOnClick(e, subKey + 1)}
                  data-parent={key + 1}
                >
                  <span className="steps__sidebar-sub-list-dott" />
                  <span className="steps__sidebar-sub-list-title">{subStep.title}</span>
                  <span className="steps__sidebar-sub-list-step">
                    Step
                    {subKey + 1}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}

      {props.wizardData.get('status') !== 'record' &&
        props.wizardData.get('status') !== 'request' &&
        props.wizardUserRole === roles.international && (
          <li
            className={`steps__sidebar-list-item steps__sidebar-list-item--single ${
              props.wizardData.get('isConfirmStepActive') ? 'steps__sidebar-list-item--active' : ''
            }`}
          >
            <span className="steps__sidebar-list-dott" onClick={() => props.confirmStepOnClick()} />

            <span className="steps__sidebar-list-title" onClick={() => props.confirmStepOnClick()}>
              Travel Document Upload
            </span>
          </li>
        )}

      {props.wizardData.get('status') === 'approved' && (
        <li
          className={`steps__sidebar-list-item steps__sidebar-list-item--single ${
            props.wizardData.get('isProofStepActive') ? 'steps__sidebar-list-item--active' : ''
          }`}
        >
          <span className="steps__sidebar-list-dott" onClick={() => props.proofstepOnClick()} />

          <span className="steps__sidebar-list-title" onClick={() => props.proofstepOnClick()}>
            Proof of registration
          </span>
        </li>
      )}
    </ul>
  </div>
)

const pdfTemplate = (avatarURL, qrURL, wizardData) => (
  <div className="participant-print-template">
    <h4 className="participant-print-template__heading">Proof of Registration </h4>
    <img
      className="participant-print-template__logo"
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTE3IiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTE3IDUwIj4KICAgIDxkZWZzPgogICAgICAgIDxwYXRoIGlkPSJhIiBkPSJNMTUuMzg4IDE1LjM2M0gwVi4wMjdoMTUuMzg4djE1LjMzNnoiLz4KICAgIDwvZGVmcz4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iIzAwQURFRiIgZD0iTTE1LjA4NSAwaC4wM2EyNzk2Ljg0IDI3OTYuODQgMCAwIDEgOS40MjQgOS41MTQgMTA0Mi40ODYgMTA0Mi40ODYgMCAwIDEtNS4xMjkgNS4xNzZjLTMuMTQ2LTMuMTc4LTYuMjk1LTYuMzUzLTkuNDQxLTkuNTNDMTEuNjczIDMuNDQgMTMuMzc0IDEuNzEzIDE1LjA4NSAwIi8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjMuMjc2IDMzLjY3NCkiPgogICAgICAgICAgICA8bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+CiAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNhIi8+CiAgICAgICAgICAgIDwvbWFzaz4KICAgICAgICAgICAgPHBhdGggZmlsbD0iIzAwQURFRiIgZD0iTTAgNS4yMTlDMS43MTIgMy40OTIgMy40MTcgMS43NTkgNS4xMjMuMDI3YzMuNDI2IDMuMzg3IDYuODQgNi43ODcgMTAuMjY1IDEwLjE3Ny0xLjcwNiAxLjcyLTMuNDA1IDMuNDQ2LTUuMTE3IDUuMTZoLS4wMjdDNi44MTQgMTEuOTk3IDMuNDIgOC41OTQgMCA1LjIxOCIgbWFzaz0idXJsKCNiKSIvPgogICAgICAgIDwvZz4KICAgICAgICA8cGF0aCBmaWxsPSIjRTYwRDY0IiBkPSJNMjUuNTk4IDExLjgyNGMzLjI2Mi0zLjI5IDYuNTItNi41ODMgOS43ODMtOS44NyAxLjcwNyAxLjczIDMuNDIzIDMuNDUgNS4xMjggNS4xODMtMy4yNjQgMy4yOTEtNi41MjIgNi41ODgtOS43OSA5Ljg3Ni0xLjcyLTEuNzE3LTMuNDA0LTMuNDctNS4xMi01LjE4OU03LjA3IDQwLjg2NmM0Ljc3LTQuODcgOS41NjMtOS43MTYgMTQuMzM4LTE0LjU4IDEuNzExIDEuNzI2IDMuNDI0IDMuNDUyIDUuMTMzIDUuMTgtNC43NzMgNC44NjUtOS41NjIgOS43MTMtMTQuMzM3IDE0LjU3NS0xLjcxNi0xLjcyLTMuNDItMy40NTMtNS4xMzQtNS4xNzUiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjODhBQkNCIiBkPSJNMi44NTMgMTIuMThjMS43MTItMS43MjUgMy40MjMtMy40NSA1LjEzMi01LjE3OCAyLjQzMyAyLjQ1OSA0LjgzNSA0Ljk1IDcuMjc1IDcuNDAxLTEuMjY2IDEuMzE4LTIuNTcgMi42LTMuODUxIDMuOTA0LS40MzYuNDI5LS44NS44ODItMS4zMDMgMS4yOTQtLjg0Mi0uOTIzLTEuNzU4LTEuNzc0LTIuNjA5LTIuNjg4LTEuNTU1LTEuNTctMy4wOTctMy4xNTMtNC42NDQtNC43MzJNMjMuNjMxIDI0LjM3M2MxLjcwNy0xLjczIDMuNC0zLjQ3NiA1LjEyNy01LjE4NyA1LjcyMyA1Ljc4IDExLjQ1IDExLjU1NSAxNy4xNzQgMTcuMzM1LTEuNzExIDEuNzI2LTMuNCAzLjQ3My01LjEyIDUuMTktNS43My01Ljc3Ni0xMS40NTQtMTEuNTU4LTE3LjE4MS0xNy4zMzgiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjNkQ2RTcyIiBkPSJNOTQuMDIzIDcuMDkyYy40MzktLjIyNCAxIC4yLjkyLjY4OSAwIC40OTUtLjYyOS44LTEuMDIuNTEyLS40MzMtLjI3LS4zOC0xLjAxMy4xLTEuMjAxTTExNC4zNDUgNy4zMTRjLjU5My0uMDIzIDEuMTc2LS4xNDIgMS43NDktLjI5My0uMDAzIDIuMDM3IDAgNC4wNzQtLjAwMSA2LjExLjAwOC42NTMtLjAyNyAxLjMwOS4wNDggMS45NTguMDY4LjQwNS41NTUuMzUzLjg1OS40di4zMTJjLS45MTQtLjAzMS0xLjgzLS4wMDYtMi43NDMtLjAxMy0uMDAyLS4xLS4wMDItLjItLjAwMS0uMjk5LjIzNS0uMDM0LjQ5LS4wMi43MS0uMTMuMjM4LS4xNjMuMTg2LS40OTYuMjE1LS43NDguMDEtMS41MDYuMDAxLTMuMDEyLjAwNS00LjUxOC0uMDIyLS42OTguMDU4LTEuNDA4LS4wOC0yLjA5OC0uMDctLjM1Ni0uNDg3LS4zNDYtLjc2LS40MDFsLS4wMDEtLjI4TTUxLjk5NSA3LjE2OGgzLjkxNnYuMzFjLS4zMjMuMDA3LS42Ni0uMDI2LS45NjcuMDktLjM0My4xNjQtLjMyLjYtLjM0My45MjMtLjAzOCAxLjIxNi0uMDA3IDIuNDM1LS4wMTcgMy42NTEuMDExLjg2OC0uMDMxIDEuNzM3LjAzOSAyLjYwMi4wMTIuMjQuMTA3LjUxMi4zNDIuNjEzLjI5OC4xMy42MzIuMDk2Ljk0OC4xMjUtLjAwMi4xLS4wMDMuMjAzLS4wMDMuMzA1aC0zLjkxNWExMS42NiAxMS42NiAwIDAgMSAwLS4zMDVjLjMzLS4wMzIuNjg4LjAxLjk5NC0uMTQyLjMyNi0uMTk4LjMxOC0uNjI0LjMzMS0uOTYuMDM4LTEuOTkzLjA0LTMuOTg4LS4wMDMtNS45OC0uMDItLjMtLjAyMi0uNzAzLS4zNDYtLjg0LS4zMTUtLjEwMi0uNjUxLS4wNzctLjk3Ny0uMDgybC4wMDEtLjMxTTY0LjQ0NyA4LjkzMmwuMjI2LjAwMXYxLjYyOGwxLjU0OS4wMDFjLS4wMDIuMTA1LS4wMDIuMjA4LS4wMDIuMzEzaC0xLjU0N3YzLjUwM2MuMDA5LjI2My4wMDQuNTQyLjEzMy43OC4xNjMuMjcyLjUxNS40MzIuODIxLjMyOC4yNTQtLjA3Ni40MTgtLjMuNTg1LS40OTJsLjIyMy4xNDhjLS4zNC42NzgtMS4yMTMgMS4wNC0xLjkxMy43MzEtLjM0OC0uMTU2LS42NDQtLjQ3Mi0uNzA2LS44NmE2LjU0NiA2LjU0NiAwIDAgMS0uMDczLTEuMDc3di0zLjA2bC0uNzUyLS4wMDItLjAwMi0uMjkxYy44MzgtLjA2NSAxLjM3Mi0uODY3IDEuNDU4LTEuNjVNOTAuNTA4IDkuMzhjLjA3MS0uMTg0LjAzNy0uNDk0LjMxNS0uNDc3LjAwNC41NTMuMDAyIDEuMTA2LjAwMiAxLjY1OC41MTYuMDAyIDEuMDMzIDAgMS41NS4wMDFhMTIuMjcgMTIuMjcgMCAwIDAgMCAuMzEzYy0uNTE0IDAtMS4wMjcuMDAzLTEuNTQtLjAwNi0uMDA3IDEuMjU4LS4wMzYgMi41MTcuMDIgMy43NzQtLjAxMi4zNy4xODcuNzY0LjU2Ny44NS40MDIuMTIxLjc0LS4yMDQuOTYzLS41bC4yMi4xNGMtLjM3Ni43OTYtMS41MTMgMS4xNDMtMi4yMDYuNTU4LS40NDQtLjMxNy0uNDY2LS45MDgtLjQ3OC0xLjQwMy0uMDA3LTEuMTM4IDAtMi4yNzUtLjAwMy0zLjQxMmwtLjc1MS0uMDAxYTcuODkgNy44OSAwIDAgMS0uMDA1LS4yOWMuNjUtLjA2IDEuMTg1LS41NzggMS4zNDYtMS4yMDVNNTYuMzc2IDEwLjY0NGMuNTU2LS4wNDUgMS4wODctLjIzMiAxLjY0LS4yOTIuMDguMzQuMTI3LjY4NS4xNDEgMS4wMzQuNDIyLS40Ni45MzUtLjg4MSAxLjU2My0uOTkzLjU4MS0uMDk2IDEuMjYtLjAyNSAxLjY4My40MzQuMjcuMjguMzIyLjY4Ni4zNDUgMS4wNTguMDIyIDEuMDctLjAzIDIuMTQ1LjA1MyAzLjIxNC4wNjcuMzY5LjUwOS4zNDUuNzkyLjM3MS0uMDAzLjEwNy0uMDA1LjIxMy0uMDA2LjMyYTIxMi43IDIxMi43IDAgMCAwLTIuNjE1LjAwMWMtLjAwNi0uMDc0LS4wMi0uMjIzLS4wMjgtLjI5Ny4zMDUtLjA1Ljc4NC0uMDA1Ljg2NC0uNDAzLjA4My0uOTQ3LjAxNC0xLjkwMy4wMzgtMi44NTMtLjAyNC0uNC4wMzYtLjg4OS0uMjk0LTEuMTg0LS40MDQtLjM5LTEuMDY0LS4zMy0xLjUxNi0uMDU2LS4zNDYuMjE3LS42NTkuNTE3LS44NTUuODc4LS4wMzQuODM1IDAgMS42NzItLjAxNSAyLjUwNy4wMS4yODctLjAzNC41OTYuMDk5Ljg2MS4xNjYuMjQyLjQ5LjE5Ljc0Mi4yMzIgMCAuMTAzLjAwMi4yMDcuMDA0LjMxLS44OC4wMDMtMS43NTkgMC0yLjYzOS4wMDJsLjAxNS0uMzE2Yy4yNy0uMDQxLjY1Ny4wMTguNzg5LS4yOTIuMTI0LS42NzMuMDM3LTEuMzY0LjA2My0yLjA0NC0uMDI1LS42MjMuMDU3LTEuMjU2LS4wNTgtMS44NzItLjExNi0uMzMyLS41MjUtLjI4Ny0uODA1LS4zMXYtLjMxTTY4LjE4IDExLjExYy0uMjE0LjI3Mi0uMjk0LjYxNi0uMzguOTQ0LjgyNi4wMDggMS42NTEuMDA1IDIuNDc2LjAwMi0uMDA2LS4zMjYuMDA0LS42ODMtLjIwNC0uOTUzLS40MzYtLjYxNC0xLjQ1NC0uNTg1LTEuODkyLjAwOG0tLjc1Ny4wNDZjLjcyNi0uODY4IDIuMTA0LTEuMDYyIDMuMDUtLjQ2LjUzLjM3OC44NjIgMSAuOTIgMS42NS0xLjIwMy4wMDMtMi40MDYuMDAyLTMuNjEgMC0uMDM1LjkxNS0uMDU3IDEuOTI4LjQ4NyAyLjcxMi40MjguNjA4IDEuMjkyLjY5NCAxLjkzNC40MTUuNDAxLS4xNjIuNjctLjUyNC44Ny0uODk2bC4zMjQuMDA4Yy0uMjk5Ljk1NS0xLjMzOSAxLjQ2OC0yLjI4NCAxLjQtMS4xMDItLjA1Ny0yLjA5NS0uOTE1LTIuMzM4LTEuOTk3LS4yMDgtLjk3NC0uMDM2LTIuMDc5LjY0Ny0yLjgzMk03Mi4wNCAxMC43MzJjLjUzNi0uMDczIDEuMDU4LS4yMjYgMS41NzctLjM4Mi4xMTYuNDAyLjE3LjgxNy4xOTUgMS4yMzMuMzA0LS42MTcuODcyLTEuMTkxIDEuNTktMS4yMjYuNDg2LS4wNTcuOTc5LjM5LjkyNi44ODgtLjAzNi4yODQtLjM2LjQ2NC0uNjEzLjMzNi0uMzA1LS4xNTktLjI1OS0uNjMtLjU4Ny0uNzUtLjM1NC4wMTMtLjYyMi4zLS44NDQuNTUtLjQ2Mi41MjItLjQyMiAxLjI3LS40MyAxLjkyNC4wMjUuNjI4LS4wNTggMS4yNjcuMDY3IDEuODg2LjE2Ni4zMjEuNTgzLjI1Ljg4MS4yOXYuMzFjLS45Mi0uMDA2LTEuODQtLjAwMy0yLjc2LS4wMDMtLjAwMS0uMTAyLS4wMDItLjIwMi0uMDAxLS4zMDIuMzAyLS4wMzQuNzYtLjAwNy44NTYtLjM4NS4wODItMS4xNi4wNTItMi4zMy4wMjUtMy40OTQtLjAwMy0uMTYtLjAzLS4zNDgtLjE3Mi0uNDQ2LS4yMS0uMTM1LS40Ny0uMTE1LS43MDYtLjE0YTE1Ljc4IDE1Ljc4IDAgMCAxLS4wMDUtLjI5TTc2LjgzNiAxMC42NDRjLjU1Ny0uMDM4IDEuMDg3LS4yNDIgMS42NDItLjI5LjA4NS4zNDMuMTMyLjY5My4xNDIgMS4wNDYuNDgyLS41NjUgMS4xNDktMS4wNDQgMS45MTctMS4wNDIuNTkxLS4wMzcgMS4yNzIuMjAyIDEuNTMzLjc3OC4yMDMuNTQ5LjEzNyAxLjE0OC4xNDkgMS43MjMuMDEyLjc1OS0uMDM3IDEuNTI0LjA1NSAyLjI4LjA5Ni4zMzQuNTA2LjMwMS43NzguMzI4bC4wMDMuMzI0Yy0uODc2LS4wMDgtMS43NTItLjAwMy0yLjYyOS0uMDAzbC4wMDMtLjMwNmMuMjc3LS4wNDQuNjgzLjAxOS44MTItLjMwNi4xMDktLjQzNS4wNTctLjg5LjA3LTEuMzM0LS4wMTUtLjc0LjAzNS0xLjQ4My0uMDM4LTIuMjItLjAxMy0uNDc3LS40NjUtLjg0NS0uOTIzLS44NC0uNzQtLjA0Mi0xLjM3My41MTQtMS43MjUgMS4xMjQtLjAzNS45NzEtLjAwOCAxLjk0Ny4wMTIgMi45Mi4wMTQuMTU1LjAwMi4zMzguMTIxLjQ1OC4xODIuMTk1LjQ3MS4xNTMuNzEuMTg2LjAwMy4xMDYuMDA1LjIxMi4wMDkuMzE3SDc2Ljg0Yy4wMDEtLjEwNS4wMDMtLjIxLjAwNi0uMzE0LjI3Ny0uMDM3LjcuMDA5LjgwMy0uMzMuMDk3LS42MDQuMDQyLTEuMjIuMDU2LTEuODMtLjAxOS0uNjc0LjA0Ni0xLjM1Ny0uMDUzLTIuMDI2LS4wOTctLjM0OS0uNTI2LS4zMTEtLjgwOC0uMzM0YTE3Ljc3MyAxNy43NzMgMCAwIDEtLjAwOC0uMzA5TTg1LjE5MyAxMy41NDJjLS4zMTMuMjczLS41NDQuNjc4LS40OTggMS4xMDctLjAwNi40MjQuMzY3LjgzMS44Ljc3Ni41NjktLjA3NiAxLjAzNy0uNDQ3IDEuNDgyLS43ODQtLjAwNS0uNjc1LjAwMi0xLjM1LS4wMDMtMi4wMjUtLjYxNC4yNjEtMS4yNzMuNDczLTEuNzguOTI2bS0uNzI2LTIuODY4Yy42MDMtLjM1NiAxLjMzOC0uMzQ3IDIuMDEzLS4yODUuNTk5LjA3MiAxLjI3LjQ0MiAxLjM2MyAxLjEuMTA2Ljc0OS4wNDQgMS41MDguMDYgMi4yNjIuMDE3LjQ3My0uMDQ4Ljk1Ny4wNTcgMS40MjQuMDI0LjIyNS4zMDEuMzExLjQ4Mi4yMi4yMzYtLjA5Ni4yOS0uMzc0LjM2OS0uNTg4bC4yNC0uMDAxYy0uMDMyLjM2Ni0uMTMyLjc5LS40ODIuOTc2LS4zNzcuMTgyLS44NzUuMTk4LTEuMjIzLS4wNTgtLjIyNi0uMTYzLS4yOTktLjQ0Ni0uMzg3LS42OTYtLjU1LjM4NC0xLjE0My43Ni0xLjgxNS44NjgtLjU1OC4wOTEtMS4yMTYtLjE0Ny0xLjQ1MS0uNjk2YTEuMjk4IDEuMjk4IDAgMCAxIC4xMTgtMS4wODRjLjE4OC0uMzE3LjQ5OC0uNTMzLjgwMi0uNzI4LjczNi0uNDY5IDEuNTU4LS43NyAyLjM2Mi0xLjA5Ni0uMDA4LS4zNjYuMDI5LS43NS0uMTAxLTEuMDk3LS4xODktLjM3NS0uNjI3LS41MzUtMS4wMjItLjU0Mi0uMzA4IDAtLjY0Ny4wMzItLjg5LjI0Mi0uMjgxLjI1Mi0uMTY2LjczMS0uNDc2Ljk2Mi0uMTk0LjE0My0uNTc2LjExOC0uNjQ1LS4xNS0uMDkxLS40NTQuMjkzLS44MDUuNjI2LTEuMDMzTTkyLjk3MyAxMC42OTNjLjYzNy0uMDU0IDEuMjU4LS4yMDMgMS44NzgtLjM1LjAwOCAxLjQwMy0uMDEgMi44MDUuMDEgNC4yMDcuMDI3LjI1NS0uMDM2LjU2Mi4xNTYuNzY3LjIxLjE2My40OTQuMTMuNzQyLjE2OHYuMzAyaC0yLjc4N2MtLjAwMy0uMS0uMDA0LS4yMDEtLjAwNC0uMzAxLjMwNS0uMDQ4Ljc1OS4wNC45MDktLjMxMy4wODktLjM3My4wNi0uNzY0LjA2OS0xLjE0NC0uMDEzLS44MDEuMDI3LTEuNjA1LS4wMzQtMi40MDUtLjAyLS4yMDktLjA2LS40OC0uMjgxLS41NjctLjIxNC0uMDY2LS40NDItLjA0Ni0uNjYxLS4wNTRsLjAwMy0uMzFNOTguMDEyIDEwLjc3NGMtLjM4My4xNC0uNjguNDY0LS44MjUuODQ1LS4yMzEuNTkyLS4yNDUgMS4yNDItLjIzIDEuODcxLjAyNi41MDcuMDg2IDEuMDM3LjM0IDEuNDg2LjU2Ny45NTggMi4yLjk0IDIuNzE3LS4wNi4yOTgtLjYwNC4zMS0xLjMwMy4zMDItMS45NjUtLjAyNi0uNjE3LS4wOTUtMS4yODgtLjQ5OC0xLjc4NC0uNDMyLS41MTgtMS4yLS42LTEuODA2LS4zOTNtLjE1NS0uMzg3Yy41ODgtLjA3NyAxLjIxLS4wMTggMS43NDMuMjYuNzYuNDA1IDEuMzMyIDEuMTc3IDEuNDQgMi4wNDUuMTE0Ljg2LS4wNTEgMS44MTktLjY3NyAyLjQ1NS0uOTc5IDEuMDQtMi43NjYgMS4xMzUtMy44NDQuMjAyLTEuMDI0LS44MjktMS4yLTIuNDE5LS42Mi0zLjU1OS4zOTctLjczMSAxLjEzLTEuMjkgMS45NTgtMS40MDNNMTAxLjk5NCAxMC42NDVjLjU1NC0uMDQ5IDEuMDg0LS4yMjggMS42MzQtLjMuMDgyLjMzNS4xMjguNjc5LjE1NiAxLjAyMy41MTQtLjU1IDEuMTg0LTEuMDQ0IDEuOTcyLTEuMDExLjY3LS4wNDEgMS40NDQuMzUzIDEuNTU3IDEuMDc1LjE1NiAxLjIxMi0uMDIgMi40NDIuMTA2IDMuNjU3LjA1Mi4zNzguNTEuMzU0Ljc5My4zODUgMCAuMTA0LjAwMy4yMDguMDA3LjMxM2wtMi42MzQuMDAxYTYuOTk4IDYuOTk4IDAgMCAxLS4wMDItLjMwNGMuMy0uMDM2Ljc2NC4wMDIuODQtLjM5LjA3OC0uOTUyLjAzNy0xLjkxLjA0LTIuODYzLS4wMjgtLjM5LjAyOC0uODU0LS4yNzMtMS4xNTctLjMxMi0uMzM0LS44MjMtLjM0OC0xLjIzLS4yMTgtLjUxMi4xNzUtLjg4Ni41OTUtMS4xOTMgMS4wMjUuMDI1IDEuMDcxLS4wNDkgMi4xNDkuMDU0IDMuMjE2LjA3LjM3NC41MjIuMzQ3LjgxLjM3OC0uMDAyLjEwNC0uMDAzLjIwOS0uMDAyLjMxMy0uODgxLS4wMDctMS43NjQuMDExLTIuNjQ0LS4wMS4wMDYtLjA3Ny4wMi0uMjMuMDI1LS4zMDguMjYtLjAzNC42MjYuMDEzLjc3Mi0uMjY2LjA5LS4yOTUuMDYxLS42MTIuMDc5LS45MTUtLjAwNS0uODYxLjAxNC0xLjcyMy0uMDEyLTIuNTg0LS4wMjMtLjE5Ny4wMTItLjQzNC0uMTQxLS41ODUtLjE5LS4xOC0uNDcyLS4xNC0uNzA4LS4xNjdhOC45NDYgOC45NDYgMCAwIDEtLjAwNi0uMzA4TTExMC4xMjYgMTMuNjljLS4zMTUuMzEzLS40NTQuODA4LS4zMDUgMS4yMzUuMTA0LjMzNS40Ny41NjUuODE3LjQ5Mi41MzgtLjA5NC45NzgtLjQ0OSAxLjQwNy0uNzY4LS4wMDItLjY3Ni0uMDAxLTEuMzUxLS4wMDEtMi4wMjctLjY3NS4yNzctMS40MS41MTItMS45MTggMS4wNjdtLS44OTMtMi43NjRjLjQ3LS40OTggMS4xOTQtLjU3NyAxLjg0LS41NjcuNTY0LS4wMDggMS4xNzQuMTI2IDEuNTc1LjU1Ni4yNzEuMjgxLjMuNjk2LjMyMiAxLjA2Ny4wMTEuODg4LS4wMDMgMS43NzYuMDA0IDIuNjY1IDAgLjI0Ni4wNTIuNDkuMTIuNzI2LjE2OC4wMzIuMzY3LjEwMS41MTYtLjAyNC4yNC0uMTU0LjE0OC0uNjM1LjUyOS0uNTYyLS4wNTguMjk4LS4wODMuNjM2LS4zMTQuODU4LS4zMjIuMzExLS44MzUuMzMtMS4yMzUuMTgyLS4zMzEtLjEyNS0uNDU2LS40ODQtLjU1LS43OTUtLjUxNy4zNTItMS4wNi43MDItMS42NzguODQtLjQ4MS4xMDgtMS4wMzcuMDExLTEuMzktLjM1Ny0uMzI1LS4zMy0uMzQzLS44Ny0uMTUyLTEuMjc2LjE3LS4zNjYuNTAyLS42MTMuODMyLS44MjQuNzQtLjQ4NiAxLjU3Ny0uNzg0IDIuMzktMS4xMi0uMDEzLS4zOS4wNi0uODItLjEzNS0xLjE3NS0uMzgzLS41MzItMS4xNy0uNTcyLTEuNzI0LS4zMjQtLjM1LjE1Ni0uMzMzLjU3OC0uNDcxLjg4LS4xMDkuMjgxLS41LjM0MS0uNzI3LjE3Mi0uMjIyLS4zMTEuMDEtLjY5OS4yNDgtLjkyMk03MS41NiAyNS4yNzdhNC43IDQuNyAwIDAgMCAwIDIuMjg2Yy4xNS41OS41ODQgMS4xNDQgMS4xOSAxLjI5Mi42MzIuMTU2IDEuMzAzLS4wOTcgMS43NS0uNTU2LjExLS4xMjQuMjcxLS4yNDQuMjU5LS40My4wMS0xLjAzNC0uMDAyLTIuMDcuMDA0LTMuMTA2LS41MTctLjQyNS0xLjE2My0uNzgzLTEuODUyLS43MDQtLjY1LjA2LTEuMTk0LjU4OS0xLjM1IDEuMjE4bTIuMzE3LTQuNzM3Yy42MTQtLjAyIDEuMjEtLjE3MyAxLjgxMy0uMjgzLjAwMyAyLjM4OC0uMDAzIDQuNzc2LjAwMiA3LjE2NC4wMjcuMzgxLS4wMi43NzMuMDc3IDEuMTQ2LjE1Ny4yNzMuNTE4LjIzMy43ODQuMjc1bC4wMDEuMjkzYTEwLjkyIDEwLjkyIDAgMCAwLTEuNjYyLjE3NyA4Ljc4MyA4Ljc4MyAwIDAgMS0uMDcxLS45MTNjLS41NTIuNTM3LTEuMjguOTU0LTIuMDY5LjkwOS0xLjE5Ny0uMDIyLTIuMTctMS4wOS0yLjM1Ny0yLjIzNi0uMDk4LS43MjYtLjA0Ny0xLjUwNi4zMjMtMi4xNTIuNDI1LS43NTYgMS4yNC0xLjMxNSAyLjEyMS0xLjMuNzEtLjA0IDEuMzkxLjI2OCAxLjkyNC43MjUtLjAwNS0uOTQgMC0xLjg4IDAtMi44Mi0uMDAzLS4xOTktLjAyLS40NDItLjItLjU2My0uMjA3LS4xMjMtLjQ1OC0uMDk4LS42ODctLjExNWwuMDAxLS4zMDdNNTIuMTA4IDIwLjM4N2MyLjc5NC4wMDEgNS41ODgtLjAwMSA4LjM4Mi4wMDEuMDA3LjcwOS4wMTcgMS40MTcuMDQ4IDIuMTI1bC0uMzA1LS4wMTJjLS4xMTMtLjY0NS0uMjgyLTEuNDgtLjk3OC0xLjcyLS43NjctLjE0LTEuNTU0LS4wNjYtMi4zMy0uMDc0LjAxNiAyLjI0OC0uMDExIDQuNDk4LjAxNCA2Ljc0Ny4wMzguMzg5LS4wNS44ODEuMjg0IDEuMTYzLjM2NC4yMTguODA4LjE1NSAxLjIxMy4xNjhsLS4wMDkuMzEzYy0xLjQzNi0uMDA1LTIuODcyIDAtNC4zMDktLjAwMnYtLjMxMmMuMzU3LS4wMDEuNzIyLjAyMSAxLjA3LS4wNzYuMjMzLS4wNjYuMzg5LS4yODkuNDIyLS41MjUuMDU0LS4zNy4wNTUtLjc0Ni4wNTktMS4xMi0uMDAyLTIuMTIxIDAtNC4yNDItLjAwMS02LjM2My0uNjUxLjAwOC0xLjMwMy0uMDIxLTEuOTUzLjAyNC0uMjUzLjAyLS41NC4wNDUtLjcyMi4yNDctLjQwOC40MDMtLjUxNS45OTctLjYyIDEuNTRsLS4zMTgtLjAwN2MuMDM0LS43MDUuMDM4LTEuNDEuMDUzLTIuMTE3Ii8+CiAgICAgICAgPHBhdGggZmlsbD0iIzZENkU3MiIgZD0iTTU5Ljk4MiAyMy45OTlhMTAuNjMgMTAuNjMgMCAwIDAgMS41NzQtLjM4OWMuMTI0LjQwMi4xNzUuODIxLjIwNiAxLjI0LjMyNC0uNjQxLjkzNi0xLjI1MyAxLjY5NS0xLjIzLjQ4LS4wMjIuOTIyLjQ1My44MzUuOTM3LS4wNTMuMjc4LS40MS40NDYtLjY0Mi4yNzMtLjMwMS0uMTgzLS4yNjYtLjg0MS0uNzI4LS43MWExLjgxOSAxLjgxOSAwIDAgMC0xLjA4IDEuNTI2Yy0uMDc5Ljg1OC0uMDQ1IDEuNzIxLS4wMiAyLjU4MS4wMDEuMTcyLjA1Mi4zNzMuMjE2LjQ1Ny4yMi4xMDUuNDczLjA4OS43MS4xMXYuMzAyYy0uOTIxLjAwMS0xLjg0My0uMDAyLTIuNzY1LjAwMXYtLjNjLjI0OC0uMDM3LjU0OC4wMDcuNzQ0LS4xODcuMTUtLjE0My4xMjgtLjM3MS4xNDEtLjU2di0zLjA0MWMtLjAwNi0uMjAzLS4wMDItLjQ1NS0uMTktLjU4Mi0uMjA2LS4xMzItLjQ2NS0uMTA4LS42OTYtLjE0NHYtLjI4NHpNNjUuOTcgMjcuMDE2Yy0uMzUuMzc0LS40NzIgMS4wMDItLjE2MiAxLjQzOC4xNzEuMjU3LjUxNS4zMzcuODAxLjI2LjUwNS0uMTM0LjkzNi0uNDQ4IDEuMzQtLjc2Ny0uMDA0LS42ODEgMC0xLjM2Mi0uMDAyLTIuMDQyLS42OTguMjg1LTEuNDYxLjUyNS0xLjk3NyAxLjExbS0xLjEzNi0yLjQ4OGMuMzEzLS41NTQuOTQzLS44NDYgMS41NTYtLjg4Ny43LS4wNDggMS40OTctLjA1NyAyLjA1Ni40NDMuMzYuMjguNDEzLjc2Ny40MjcgMS4xOTMuMDEuODY1IDAgMS43My4wMDQgMi41OTYuMDA1LjIzLjAxMS40NjguMDg3LjY4OC4wODcuMjI0LjQuMjI1LjU2NC4wOS4yMzgtLjE1LjE0Mi0uNjI0LjUxNi0uNTU3LS4wMzMuMjgtLjA2My41ODUtLjI1NS44MS0uMy4zNjEtLjg0MS4zOTUtMS4yNTkuMjYtLjM1My0uMTIzLS41MDQtLjQ5NC0uNjA1LS44MjQtLjUyLjM3Mi0xLjA4NS43Mi0xLjcxNi44NTYtLjU2My4xMjgtMS4yNDYtLjA2LTEuNTQtLjU5My0uMjctLjU0NC0uMDM1LTEuMjI0LjQyNS0xLjU4NC44MzctLjY4IDEuODYzLTEuMDQ0IDIuODUtMS40NC0uMDA1LS40LjA0My0uODM0LS4xNDgtMS4xOTktLjM5LS41MjgtMS4xNzgtLjU2Ni0xLjczOC0uMzIxLS4zMzguMTUxLS4zNDIuNTY0LS40NjIuODYzLS4wOTcuMjgtLjQ1Ni4zNzEtLjY5Ny4yMzUtLjE5OS0uMTQtLjE2MS0uNDM3LS4wNjUtLjYyOU03OC40MjggMjQuMzE3Yy0uMjUyLjI4Mi0uMzQ1LjY2Mi0uNDM1IDEuMDIuODI3LjAyIDEuNjU1LS4wMDEgMi40ODQuMDExLjAzNC0uMzM0LjAxOC0uNjk3LS4xODktLjk3Ny0uNDItLjU5OC0xLjM5NC0uNTk1LTEuODYtLjA1NG0tMS4yMy43MmMuMzUyLS43MTkgMS4wMzktMS4yOTUgMS44NC0xLjM5NS40NC0uMDQ1LjkwMi0uMDM1IDEuMzE3LjEzNi43MzIuMyAxLjIwOSAxLjA3NCAxLjI2IDEuODU1LTEuMjEyLjAwNC0yLjQyNy4wMDEtMy42NC4wMDItLjA0OS42ODctLjAzIDEuMzkuMTY1IDIuMDU2LjEzMy40Ni40MDguOTEuODU0IDEuMTE2LjQ1OS4xOTkuOTk5LjE2OCAxLjQ1NS0uMDI3LjM4Ni0uMTcuNjUtLjUyNC44NS0uODg2bC4zMjQtLjAwNGMtLjM0MyAxLjE0LTEuNzA5IDEuNjI4LTIuNzc4IDEuMzQxLS45ODgtLjI1LTEuNzg3LTEuMTMyLTEuOTI1LTIuMTUzLS4wOTEtLjY4Ny0uMDM3LTEuNDE1LjI3OS0yLjA0MU01My4wODQgMzQuMTk3Yy43NjMtMS4wMSAyLjA2LTEuNDk3IDMuMjk0LTEuNDY1IDEuMDY5LS4wMDIgMi4xMS40ODggMi44NDIgMS4yNjcuMTUzLS4zNTQuMjYyLS43MjQuMzE0LTEuMTA3bC4yODgtLjAwMmMuMDMgMS4xMDMuMDY3IDIuMjA2LjA3IDMuMzA5aC0uMjhjLS4xNTQtLjc5Ny0uMzcyLTEuNjM2LS45NDgtMi4yMzctLjc3My0uNzU5LTEuOTU5LTEuMDcyLTIuOTk3LS43NjYtLjc0LjIyLTEuMzEzLjgyNC0xLjYzNiAxLjUxNS0uMzY4Ljc4OS0uNDggMS42NzMtLjQ4OSAyLjUzNy0uMDEuODY0LjEgMS43NTcuNDk4IDIuNTMzLjM1LjY2LjkzIDEuMjE2IDEuNjQyIDEuNDU2LjkuMzAzIDEuOTIzLjA5MiAyLjY5MS0uNDQ5Ljc0Ny0uNTkzIDEuMDkzLTEuNTU3IDEuMjQ4LTIuNDc1LjA2OC4wMDIuMjA2LjAwNi4yNzUuMDEtLjAwNCAxLjAxNi0uMDAxIDIuMDM0LS4wMDIgMy4wNTJsLS4yNzQuMDA3YTMuNDQ5IDMuNDQ5IDAgMCAwLS4zOTUtLjg5NGMtLjU0NC41NzYtMS4yMzEgMS4wMy0yLjAxNCAxLjE4NS0xLjI1OC4yNC0yLjY2LjAxMS0zLjY2NC0uODMtLjgzMi0uNjY1LTEuMzM2LTEuNjktMS40NDYtMi43NDgtLjE1OC0xLjM1Ny4xNTktMi43OTguOTgzLTMuODk4TTc0LjM2MSAzNC42NDZsLjE5NS4wNzFjLjAyMi41MzcgMCAxLjA3Ni4wMDcgMS42MTRoMS41NzF2LjMxM2wtMS41Ny0uMDAxYy4wMTIgMS4yNzMtLjAyNyAyLjU0Ny4wMjEgMy44Mi0uMDE2LjM5NS4yMzQuODE3LjY0Ny44NjYuMzg3LjA3LjY3OC0uMjQ1Ljg5NS0uNTJsLjIzLjE2Yy0uMjg3LjQ5OC0uODIuODU2LTEuNC44MzctLjYzNy4wMjUtMS4yNTMtLjUtMS4yNzgtMS4xNTQtLjA5Ni0xLjMzNC0uMDItMi42NzQtLjA0Ny00LjAxLS4yNTQuMDAyLS41MDkuMDAyLS43NjIuMDAyLjAwNC0uMDkuMDEyLS4xNzkuMDIyLS4yNjcuMjYtLjExNC41Ni0uMTQ0Ljc3NC0uMzQ5LjQyNi0uMzMxLjU5LS44NzMuNjk1LTEuMzgyTTYyLjUxIDM2LjgyN2MtLjI1Ny4yOC0uMzQzLjY2LS40MzUgMS4wMTcuODMuMDE0IDEuNjU5LS4wMDIgMi40ODcuMDEuMDM0LS4zNTYuMDAzLS43NDctLjIzMy0xLjAzLS40NDUtLjU0NS0xLjM3Mi0uNTI4LTEuODIuMDAzbS0xLjA2OC40MzVjLjM2My0uNTQ1LjkxOS0uOTkgMS41NzMtMS4wOTguNjE0LS4wOTIgMS4yOTYtLjA0NiAxLjgxMi4zMzguNTA4LjM4Ny44MjQgMSAuODc5IDEuNjM3LTEuMjE3LjAwNS0yLjQzNC0uMDA2LTMuNjUuMDA1LS4wMzkuOTE5LS4wNSAxLjkyOS40ODYgMi43Mi40Mi42MiAxLjI5LjcxIDEuOTM4LjQ0NC40MTQtLjE2LjY5NC0uNTI4Ljg5OC0uOTFsLjMzNC0uMDA1Yy0uMjgyLjkxNi0xLjI1MyAxLjQ1LTIuMTY4IDEuNDE0LTEuMTguMDI2LTIuMjgyLS45MDItMi41MTUtMi4wNi0uMTY2LS44MzktLjA2LTEuNzYuNDEzLTIuNDg1TTY2LjI2NSAzNi40MWMuNTU0LS4wNSAxLjA4Ni0uMjIyIDEuNjM1LS4zLjA5Mi4zNDUuMTQuNjk5LjE2OSAxLjA1NS4zOTQtLjQ2Ljg5NC0uODYgMS40OTQtLjk5LjU5MS0uMTE4IDEuMjc4LS4wNTYgMS43My4zODUuMzM2LjMwNS4zNzUuNzkzLjM5MyAxLjIyLjAxIDEuMDQxLS4wMjQgMi4wODYuMDQ3IDMuMTI3LjA2NC4zODQuNTI2LjM2LjgyLjM5Ny0uMDAyLjA5OC0uMDA0LjE5Ny0uMDA0LjI5N2gtMi42NzdjLS4wMDEtLjEtLjAwMi0uMjAyLS4wMDEtLjMuMjQzLS4wMy41MjMuMDA0LjczLS4xNTUuMTYtLjE1Mi4xNTctLjM4Ny4xNi0uNTktLjAwNi0uOTI2LS4wMDMtMS44NS0uMDAzLTIuNzc2LS4wMDctLjMyMy0uMDEtLjctLjI2OS0uOTMzLS4yODgtLjMxMS0uNzU1LS4zNDgtMS4xNDQtLjI1LS40NjMuMTIyLS44MjQuNDY0LTEuMTIuODI2LS4wOC4xMDItLjE3Ny4yMS0uMTY0LjM1Mi0uMDA5Ljg2NiAwIDEuNzMzLS4wMDQgMi42LjAxNS4yMy0uMDE1LjQ4Mi4xMDMuNjkuMTc5LjIzNC41MDUuMTk0Ljc2NS4yMzktLjAwMy4wOTktLjAwNS4xOTgtLjAwNi4yOThoLTIuNjUxYy0uMDAyLS4xLS4wMDMtLjItLjAwMi0uMy4yNy0uMDQ1LjY1OCAwIC43OTQtLjMuMTE2LS41ODUuMDUyLTEuMTkuMDY5LTEuNzgyLS4wMTktLjcxNy4wNDUtMS40NC0uMDU0LTIuMTUxLS4wOTYtLjM1LS41MjQtLjMyNi0uODA4LS4zNSAwLS4wNzYgMC0uMjMtLjAwMi0uMzA4TTc2LjQ3IDM2LjQ5OGMuNTQ0LS4wNSAxLjA1NC0uMjU2IDEuNTg1LS4zNi4xNDEuMzk0LjE3MS44MTcuMTkgMS4yMzIuMzMtLjYzLjkxNi0xLjI0OCAxLjY3LTEuMjQ1LjQ2NC0uMDMuOTIxLjM5Ljg4Ny44NjYtLjAxMy4yNzctLjMyLjUtLjU4LjM4Ni0uMzYyLS4xMjQtLjI4NS0uNjgxLS42Ni0uNzc4LS40MjQuMDYtLjcyMy40MjItLjk2Ni43NDctLjM4OC42MzUtLjI3MiAxLjQyLS4yOTQgMi4xMy4wMTcuNS0uMDQ3IDEuMDA5LjA1NiAxLjUuMTQ3LjM1NC41ODcuMjk1Ljg5Ny4zMjEtLjAwMi4xMDEtLjAwMi4yMDIgMCAuMzAzLS45My4wMDItMS44NTkgMC0yLjc4OC4wMDJhMTEuNTIyIDExLjUyMiAwIDAgMS0uMDAxLS4zMDNjLjI4NC0uMDMuNjU4LjAxNS44My0uMjcyLjA3OS0uMjA3LjA2My0uNDM2LjA3Ny0uNjUzdi0yLjc2NmMtLjAyMy0uMjI1LjAxNi0uNTA0LS4xNzktLjY2MS0uMjEtLjE1Ni0uNDg4LS4xMTctLjczLS4xNTYuMDAxLS4wOTguMDAzLS4xOTYuMDA2LS4yOTNNODIuNTIgMzYuNzUzYy0uMjk1LjI4OC0uNDA3LjcwMy0uNDkyIDEuMDk2LjgzIDAgMS42Ni4wMDMgMi40OS0uMDAyLjAxLS4zNDEuMDA4LS43MTYtLjIxNi0uOTk1LS40MTctLjU0OS0xLjI5Ni0uNTU3LTEuNzgyLS4xbS0xLjI3NC43NTdjLjM1LS42ODggMS4wMDUtMS4yNDMgMS43NzktMS4zNTUuNTg1LS4wNzYgMS4yMy0uMDI2IDEuNzI0LjMzLjUyMS4zODUuODQ5IDEuMDA3LjkwMiAxLjY1NC0xLjIxOC4wMDctMi40MzctLjAwNy0zLjY1NS4wMDgtLjAzLjkwOC0uMDQxIDEuOS40NzEgMi42OS41MDIuNzU2IDEuNjQyLjc4MiAyLjMxOC4yNjEuMjQtLjE4NC4zOTYtLjQ0OC41NDgtLjcwNGwuMzI0LjAwOWMtLjM4OCAxLjIwNy0xLjg4MyAxLjY3Ni0yLjk5NiAxLjI3YTIuNjQ1IDIuNjQ1IDAgMCAxLTEuNzEyLTIuMDg4Yy0uMDkzLS43LS4wMzgtMS40NDMuMjk3LTIuMDc1Ii8+CiAgICAgICAgPHBhdGggZmlsbD0iIzAwMkI1NSIgZD0iTTMyLjQ0OCAxOC44ODljMi4yODQtMi4zMDEgNC41NjUtNC42MDYgNi44NDctNi45MDhsNS4xMyA1LjE3OGMtMi4yNzMgMi4zMDgtNC41NjIgNC42MDEtNi44MzYgNi45MS0xLjcyNC0xLjcxNi0zLjQyOS0zLjQ1My01LjE0LTUuMThNMTcuMzIgMTYuNDI0YzEuNzE1IDEuNzI0IDMuNDI3IDMuNDUyIDUuMTM1IDUuMTgzTDUuMTEgMzkuMTEyQzMuNDA4IDM3LjM4OSAxLjY5NyAzNS42NzYgMCAzMy45NDd2LS4wMzFjNS43NjUtNS44MzkgMTEuNTUxLTExLjY1NiAxNy4zMi0xNy40OTIiLz4KICAgIDwvZz4KPC9zdmc+Cg=="
      alt=""
    />
    <div className="participant-print-template__personal-data">
      <span className="participant-print-template__personal-data-border" />
      <div className="participant-print-template__personal-data-avatar">
        <img src={avatarURL} alt="" />
      </div>
      <h3 className="participant-print-template__personal-data-fullname">
        {`${wizardData.getIn(['personalData', 'data', 'firstName'])} ${wizardData.getIn([
          'personalData',
          'data',
          'lastName',
        ])}`}
      </h3>
      <h4 className="participant-print-template__personal-data-role">{wizardData.getIn(['user', 'role'])}</h4>
      <div className="participant-print-template__personal-data-identity">
        <img src={qrURL} className="participant-print-template__personal-data-qr" alt="" />
        <div>
          <ul className="participant-print-template__personal-data-info">
            {wizardData.getIn(['personalData', 'data', 'passport']) !== undefined ? (
              <li>Passport N : {wizardData.getIn(['personalData', 'data', 'passport'])}</li>
            ) : (
              ''
            )}
            {wizardData.getIn(['personalData', 'data', 'nationality']) !== undefined ? (
              <li>Nationality : {wizardData.getIn(['personalData', 'data', 'nationality'])}</li>
            ) : (
              ''
            )}
          </ul>
        </div>
      </div>
    </div>
  </div>
)

const stepsSuccess = (wizardData, userID, props) => (
  <div className="steps__success">
    {pdfTemplate(
      generateUserAvatarUrl(userID, wizardData.getIn(['socialMedia', 'data', 'picture'])),
      `${process.env.apiUrl}/qrcodes/${userID}.png`,
      wizardData
    )}

    <h4 className="steps__success-heading">Congratulations</h4>
    <img src={wizardSuccess} alt="" />
    <h4 className="steps__success-heading">Registration complete</h4>
    {wizardData.get('status') === 'approved' && (
      <div className="steps__success-qr-avatar">
        <img src={`${process.env.apiUrl}/qrcodes/${userID}.png`} alt="" className="steps__success-qr-avatar-img" />
        <div className="steps__success-avatar">
          {wizardData.getIn(['socialMedia', 'data', 'picture']).length ? (
            <img
              src={generateUserAvatarUrl(userID, wizardData.getIn(['socialMedia', 'data', 'picture']))}
              alt=""
              className="steps__success-qr-avatar-img"
            />
          ) : (
            ''
          )}
        </div>
      </div>
    )}

    {wizardData.get('status') === 'approved' ? (
      <div className="steps__success-text">
        <p>Thank you for completing your registration. We look forward to seeing you in Budapest!</p>

        <p>
          Please print/download a copy of your confirmation as this will facilitate identifying you when you arrive at
          the conference.
        </p>
        <p>ENJOY WEDF 2017!!</p>
      </div>
    ) : (
      <div className="steps__success-text">
        <p>Thank you for your submission, our WEDF team will now review your application.</p>

        <p>
          Should your application be successful, you will receive a notification from our team <br /> with further
          information regarding participation at WEDF 2017.
        </p>
      </div>
    )}

    {wizardData.get('status') === 'approved' && (
      <div className="steps__success-footer">
        <a
          href={generateUserPdfUrl(userID, auth.getToken())}
          target="_blank"
          className="button button--wild-blue-yonder  button--padding-lg"
        >
          Pdf
        </a>
        <Button type="submit" className="button--wild-blue-yonder  button--padding-lg" onClick={() => window.print()}>
          Print
        </Button>
      </div>
    )}

    {wizardData.get('status') !== 'approved' && (
      <div className="steps__success-footer">
        <Button type="submit" onClick={e => props.handlerLogOut(e)} className="button--red-violet button--padding-lg">
          Home
        </Button>
        <Button
          type="button"
          className="button--wild-blue-yonder  button--padding-lg"
          onClick={() => props.goToFirstStep()}
        >
          {props.translate('back')}
        </Button>
      </div>
    )}
  </div>
)

const renderContent = (step, props) => {
  // console.log(step,props,props.wizardData.get('confirmedSteps').toJS())
  if (
    'children' in step &&
    props.activeSubStep != null &&
    props.wizardData
      .get('confirmedSteps')
      .toJS()
      .includes(step.dataKey)
  ) {
    return step.children[props.activeSubStep - 1].component
  } else if (
    'children' in step &&
    'confirm' in step &&
    (props.activeSubStep == null ||
      !props.wizardData
        .get('confirmedSteps')
        .toJS()
        .includes(step.dataKey))
  ) {
    return step.confirm.component
  } else if ('children' in step && !('confirm' in step)) {
    return step.children[props.activeSubStep != null ? props.activeSubStep - 1 : 0].component
  }
  return step.component
}

const stepSuccessOrTravelDoc = props =>
  props.wizardData.get('isConfirmStepActive') &&
  props.wizardData.get('status') !== 'record' &&
  props.wizardData.get('status') !== 'request' ? (
    <Step isActive>{props.travelDocUpload}</Step>
  ) : (
    stepsSuccess(props.wizardData, props.userID, props)
  )

const StepsContent = props => (
  <div className="steps__content">
    {props.activeStep == null && props.isActive == null
      ? stepSuccessOrTravelDoc(props)
      : props.steps.map((step, key) => (
        <Step key={key} isActive={props.activeStep === key + 1}>
          {props.activeStep === key + 1 ? renderContent(step, props) : null}
          <Notification
            message={props.message.get('text')}
            type={props.message.get('type')}
            visible={props.message.get('visible')}
          />
        </Step>
        ))}
  </div>
)

const Step = props => (
  <div className={`steps__step ${props.isActive ? 'steps__step--active' : ''}`}>{props.children}</div>
)

Step.PropTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.object.isRequired,
}

StepsContent.PropTypes = {
  children: PropTypes.object.isRequired,
}

StepsSidebar.PropTypes = {
  children: PropTypes.object.isRequired,
  steps: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  activeSubStep: PropTypes.number.isRequired,
}

Steps.PropTypes = {
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export { Steps, StepsSidebar, StepsContent }
