import React, { Component } from 'react'
import '../style/Outro.css'

class Outro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msecDelay: [500, 500, 450] // syncs with css anim seq time
    }
  }

  //componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentOutro !== this.props.currentOutro) {
      if (this.props.currentOutro !== null) {
        var _this = this
        setTimeout(function() {
          _this.props.handlerRestartMenu(_this.props.currentOutro)
        }, _this.state.msecDelay[_this.props.currentOutro])
      }
    }
  }

  render() {

    var imagesBlueWhale = []
    var imagesSpermWhale = []
    var imagesFinWhale = []

    for (let i = 1; i <= 10; i++) {
      imagesBlueWhale.push(
        <img key={i} src={process.env.REACT_APP_ANIMATION_PATH + '/animation-outro-blue-whale/' + i + '.png'} alt="" />
      )
    }
    for (let i = 1; i <= 10; i++) {
      imagesSpermWhale.push(
        <img key={i} src={process.env.REACT_APP_ANIMATION_PATH + '/animation-outro-sperm-whale/' + i + '.png'} alt="" />
      )
    }
    for (let i = 1; i <= 9; i++) {
      imagesFinWhale.push(
        <img key={i} src={process.env.REACT_APP_ANIMATION_PATH + '/animation-outro-fin-whale/' + i + '.png'} alt="" />
      )
    }

    return (
      <div id="outro">
        <div id="outro-animation-container">
          <div id="animation-blue-whale" className={this.props.currentOutro === 0 ? '' : 'hide'}>
            <div className="outro-container-images">
              {imagesBlueWhale}
            </div>
          </div>
          <div id="animation-sperm-whale" className={this.props.currentOutro === 1 ? '' : 'hide'}>
            <div className="outro-container-images">
              {imagesSpermWhale}
            </div>
          </div>
          <div id="animation-fin-whale" className={this.props.currentOutro === 2 ? '' : 'hide'}>
            <div className="outro-container-images">
              {imagesFinWhale}
            </div>
          </div>
        </div>
      </div>
    )

  }
}

export default Outro
