import React, { Component } from 'react'
import '../style/Intro.css'

class Intro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msecDelay: [1500, 1500, 1500] // syncs with css anim seq time
    }
  }

  //componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentIntro !== this.props.currentIntro) {
      if (this.props.currentIntro !== null) {
        var _this = this
        setTimeout(function() {
          _this.props.handlerInitStory(_this.props.currentIntro)
        }, _this.state.msecDelay[_this.props.currentIntro])
      }
    }
  }

  render() {

    var imagesBlueWhale = []
    var imagesSpermWhale = []
    var imagesFinWhale = []

    for (let i = 1; i <= 33; i++) {
      imagesBlueWhale.push(
        <img key={i} src={process.env.REACT_APP_ANIMATION_PATH + '/animation-intro-blue-whale/' + i + ".png"} alt="" />
      )
    }
    for (let i = 1; i <= 33; i++) {
      imagesSpermWhale.push(
        <img key={i} src={process.env.REACT_APP_ANIMATION_PATH + '/animation-intro-sperm-whale/' + i + ".png"} alt="" />
      )
    }
    for (let i = 1; i <= 33; i++) {
      imagesFinWhale.push(
        <img key={i} src={process.env.REACT_APP_ANIMATION_PATH + '/animation-intro-fin-whale/' + i + ".png"} alt="" />
      )
    }

    return (
      <div id="intro">
        <div id="intro-animation-container">
          <div id="animation-blue-whale" className={this.props.currentIntro === 0 ? '' : 'hide'}>
            <div className="intro-container-images">
              {imagesBlueWhale}
            </div>
          </div>
          <div id="animation-sperm-whale" className={this.props.currentIntro === 1 ? '' : 'hide'}>
            <div className="intro-container-images">
              {imagesSpermWhale}
            </div>
          </div>
          <div id="animation-fin-whale" className={this.props.currentIntro === 2 ? '' : 'hide'}>
            <div className="intro-container-images">
              {imagesFinWhale}
            </div>
          </div>
        </div>
      </div>
    )

  }
}

export default Intro
