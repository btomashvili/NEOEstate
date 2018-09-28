import React from 'react'
// import ReactDOM from 'react-dom'
import ReactAvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
// import Preview from './Preview'

class MyAvatarEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      image: this.props.companyLogo || 'https://i.imgur.com/9m47Snr.jpg',
      allowZoomOut: false,
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      rotate: 0,
      borderRadius: 0,
      preview: null,
      width: 200,
      height: 200,
    }
  }

  handleNewImage = (e) => {
    this.setState({ image: e.target.files[0] })
  }

  handleSave = (data) => {
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    const rect = this.editor.getCroppingRect()

    this.setState({
      preview: {
        img,
        rect,
        scale: this.state.scale,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius,
      },
    })
  }

  handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  handleAllowZoomOut = ({ target: { checked: allowZoomOut } }) => {
    this.setState({ allowZoomOut })
  }

  rotateLeft = (e) => {
    e.preventDefault()

    this.setState({
      rotate: this.state.rotate - 90,
    })
  }

  rotateRight = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90,
    })
  }

  handleBorderRadius = (e) => {
    const borderRadius = parseInt(e.target.value)
    this.setState({ borderRadius })
  }

  // handleXPosition = (e) => {
  //   const x = parseFloat(e.target.value)
  //   this.setState({ position: { ...this.state.position, x } })
  // }

  // handleYPosition = (e) => {
  //   const y = parseFloat(e.target.value)
  //   this.setState({ position: { ...this.state.position, y } })
  // }

  // handleWidth = (e) => {
  //   const width = parseInt(e.target.value)
  //   this.setState({ width })
  // }

  // handleHeight = (e) => {
  //   const height = parseInt(e.target.value)
  //   this.setState({ height })
  // }

  logCallback(e) {
    // eslint-disable-next-line
    console.log('callback', e)
  }

  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }

  handlePositionChange = (position) => {
    this.setState({ position })
  }

  handleDrop = (acceptedFiles) => {
    this.setState({ image: acceptedFiles[0] })
  }

  render() {
    return (
      <div>
        <Dropzone
          onDrop={this.handleDrop}
          disableClick
          multiple={false}
          style={{ width: this.state.width, height: this.state.height, marginBottom: '35px' }}
        >
          <div>
            <ReactAvatarEditor
              // ref={this.setEditorRef}
              ref={this.props.handleSetEditorRef}
              scale={parseFloat(this.state.scale)}
              width={this.state.width}
              height={this.state.height}
              position={this.state.position}
              onPositionChange={this.handlePositionChange}
              rotate={parseFloat(this.state.rotate)}
              borderRadius={this.state.width / (100 / this.state.borderRadius)}
              onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
              onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
              onImageReady={this.logCallback.bind(this, 'onImageReady')}
              image={this.state.image}
              className="editor-canvas"
            />
          </div>
        </Dropzone>
        <br />
        <span> New File: </span>
        <input name="newImage" type="file" onChange={this.handleNewImage} />
        <br />
        <span> Zoom: </span>
        <input
          name="scale"
          type="range"
          onChange={this.handleScale}
          min={this.state.allowZoomOut ? '0.1' : '1'}
          max="2"
          step="0.01"
          defaultValue="1"
        />
        <br />
        {'Allow Scale : '}
        <input
          name="allowZoomOut"
          type="checkbox"
          id="allowZoomOut"
          onChange={this.handleAllowZoomOut}
          checked={this.state.allowZoomOut}
        />
        <label className={`switch ${this.state.allowZoomOut}`} htmlFor="allowZoomOut">
          Toggle
        </label>
        <br />
        <span> Border radius: </span>
        <input
          name="scale"
          type="range"
          onChange={this.handleBorderRadius}
          min="0"
          max="50"
          step="1"
          defaultValue="0"
        />
        {/* <br />
        Avatar Width:
        <input
          name="width"
          type="number"
          onChange={this.handleWidth}
          min="50"
          max="400"
          step="10"
          value={this.state.width}
        />
            <br />
        Avatar Height:
        <input
          name="height"
          type="number"
          onChange={this.handleHeight}
          min="50"
          max="400"
          step="10"
          value={this.state.height}
        />
        <br> */}
        <br />
        <span>Rotate: </span>

        <button className="button--picton-blue  button--padding-sm" onClick={this.rotateLeft}>
          Left
        </button>
        <button className="button--picton-blue  button--padding-sm" onClick={this.rotateRight}>
          Right
        </button>
        {/* <br />
            <br /> */}
        {/* <input type="button" onClick={this.handleSave} value="Preview" /> */}
        {/* <br /> */}
        {/* {!!this.state.preview && (
            <img
              src={this.state.preview.img}
              style={{
                borderRadius: `${(Math.min(
                this.state.preview.height,
                this.state.preview.width
              ) +
                10) *
                (this.state.preview.borderRadius / 2 / 100)}px`,
              }}
            />
        )} */}
        {/* {!!this.state.preview && (
            <Preview
              width={
              this.state.preview.scale < 1
                ? this.state.preview.width
                : this.state.preview.height * 478 / 270
            }
              height={this.state.preview.height}
              image="avatar.jpg"
              rect={this.state.preview.rect}
            />
        )} */}
      </div>
    )
  }
}

export default MyAvatarEditor
