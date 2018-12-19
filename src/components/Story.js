import React, { Component } from 'react'
import '../style/Story.css'
//import Info from './Info'
import StorySlideshow from './StorySlideshow'
import StoryText from './StoryText'
import StoryCaption from './StoryCaption'

class Story extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rangeValue: 0,
      rangeMax: 0,
      rangeBlue: 272,
      rangeSperm: 280,
      rangeFin: 268,
    }

    this.handlerClose = this._onClose.bind(this)
    this.handlerInitOutro = this._initOutro.bind(this)
    this.handlerRangeChange = this._rangeChange.bind(this)

  }

  componentDidMount() {

    var anim = document.getElementsByClassName('container-images')

    var prog = document.getElementById('progress-bar')
    var range = document.getElementById('rangeAnim')

    var _this = this

    range.addEventListener('input', function() {
      if (this.value) {
        var frame = parseInt(this.value, 10) + 1
        frame  = frame.toString()
        anim[0].className = 'container-images anim-' + frame
        anim[1].className = 'container-images anim-' + frame
        anim[2].className = 'container-images anim-' + frame
        prog.style.width = ((this.value) * (1800 / _this.state.rangeMax)) + 'px'
        _this._fillCircles(parseInt(this.value, 10))
        if (this.value >= _this.state.rangeMax) {
          _this.handlerInitOutro(_this.props.currentStory)
        }
      }
    })

    range.addEventListener('mouseup', function() {
      _this._snapTo()
    })
    range.addEventListener('touchend', function() {
      _this._snapTo()
    })

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentStory !== this.props.currentStory) {

      if (this.props.currentStory === 0) {
        this.setState({
          rangeMax: this.state.rangeBlue
        })
      } else if (this.props.currentStory === 1) {
        this.setState({
          rangeMax: this.state.rangeSperm
        })
      } else if (this.props.currentStory === 2) {
        this.setState({
          rangeMax: this.state.rangeFin
        })
      }

      this.setState({
        rangeValue: 0
      })

      var anim = document.getElementsByClassName('container-images')
      anim[0].className = 'container-images anim-' + 1
      anim[1].className = 'container-images anim-' + 1
      anim[2].className = 'container-images anim-' + 1

      var prog = document.getElementById('progress-bar')
      var circle1 = document.getElementById('circle1')
      var circle2 = document.getElementById('circle2')
      var circle3 = document.getElementById('circle3')
      prog.style.width = '0px'
      circle1.className = 'circle'
      circle2.className = 'circle'
      circle3.className = 'circle'

    }

  }

  _fillCircles(i) {
    var circle1 = document.getElementById('circle1')
    var circle2 = document.getElementById('circle2')
    var circle3 = document.getElementById('circle3')
    if (i > (this.state.rangeMax / 4)) {
      circle1.className = 'circle fill'
    } else {
      circle1.className = 'circle'
    }
    if (i > (this.state.rangeMax / 2)) {
      circle2.className = 'circle fill'
    } else {
      circle2.className = 'circle'
    }
    if (i > ((this.state.rangeMax / 2) + (this.state.rangeMax / 4))) {
      circle3.className = 'circle fill'
    } else {
      circle3.className = 'circle'
    }
  }

  _snapTo() {
    var quarter = this.state.rangeMax / 4
    var snap0 = 0
    var snap1 = 1 * quarter
    var snap2 = 2 * quarter
    var snap3 = 3 * quarter
    var snap4 = 4 * quarter
    var target = this.state.rangeValue
    if (Math.abs(target - snap0) < 8) {
      target = snap0
    } else if ((Math.abs(snap1 - target) < 8) || (Math.abs(target - snap1) < 8)) {
      target = snap1
    } else if ((Math.abs(snap2 - target) < 8) || (Math.abs(target - snap2) < 8)) {
      target = snap2
    } else if ((Math.abs(snap3 - target) < 8) || (Math.abs(target - snap3) < 8)) {
      target = snap3
    } else if ((Math.abs(snap4 - target) < 8) || (Math.abs(target - snap4) < 8)) {
      target = snap4
    }
    var anim = document.getElementsByClassName('container-images')
    var prog = document.getElementById('progress-bar')
    anim[0].className = 'container-images anim-' + (target + 1)
    anim[1].className = 'container-images anim-' + (target + 1)
    anim[2].className = 'container-images anim-' + (target + 1)
    prog.style.width = (target * (1800 / this.state.rangeMax)) + 'px'
    this._fillCircles(target)
    this.setState({
      rangeValue: target
    })
    if (target >= this.state.rangeMax) {
      this.handlerInitOutro(this.props.currentStory)
    }
  }

  _rangeChange(e) {
    e.preventDefault()
    var target = parseInt(e.target.value, 10)
    this.setState({
      rangeValue: target
    })
    this.props.handlerStoryTouch()
  }

  _onClose(e) {
    e.preventDefault()
    this.props.handlerCloseStory(e)
    this.props.handlerStoryTouch()
  }

  _initOutro(s) {
    this.props.handlerInitOutro(s)
  }

  render() {

    var imagesBlueWhale = []
    var imagesSpermWhale = []
    var imagesFinWhale = []
    var _this = this

    for (let i = 1; i <= _this.state.rangeBlue; i++) {
      imagesBlueWhale.push(
        <img key={i} src={process.env.REACT_APP_ANIMATION_PATH + '/animation-blue-whale/' + i + '.png'} alt="" />
      )
    }
    for (let i = 1; i <= _this.state.rangeSperm; i++) {
      imagesSpermWhale.push(
        <img key={i} src={process.env.REACT_APP_ANIMATION_PATH + '/animation-sperm-whale/' + i + '.png'} alt="" />
      )
    }
    for (let i = 1; i <= _this.state.rangeFin; i++) {
      imagesFinWhale.push(
        <img key={i} src={process.env.REACT_APP_ANIMATION_PATH + '/animation-fin-whale/' + i + '.png'} alt="" />
      )
    }

    var whale = ''
    if (this.props.currentStory === 0) {
      whale = 'blue-whale'
    } else if (this.props.currentStory === 1) {
      whale = 'sperm-whale'
    } else if (this.props.currentStory === 2) {
      whale = 'fin-whale'
    }

    var markupInstruction = {__html: ''}
    if (this.props.dataInstructions) {
      markupInstruction = {__html: this.props.dataInstructions[this.props.currentLanguage]}
    }

    return (
      <div id="story"
        className={((this.props.currentStory === null) || (this.props.currentOutro !== null)) ? 'hide' : ''}
        >

        <button
          className="story-btn-close"
          onTouchEnd={(e) => this.handlerClose(e)}
          onClick={(e) => this.handlerClose(e)}
        />

        <div
          id="story-helper-text"
          className={this.state.rangeValue > 0 ? 'hide' : ''}
          >
          <span dangerouslySetInnerHTML={markupInstruction} />
        </div>

        <div id="story-animation">

          <div id="animation-blue-whale" className={this.props.currentStory === 0 ? '' : 'hide'}>
            <div className="container-images">
              {imagesBlueWhale}
            </div>
          </div>
          <div id="animation-sperm-whale" className={this.props.currentStory === 1 ? '' : 'hide'}>
            <div className="container-images">
              {imagesSpermWhale}
            </div>
          </div>
          <div id="animation-fin-whale" className={this.props.currentStory === 2 ? '' : 'hide'}>
            <div className="container-images">
              {imagesFinWhale}
            </div>
          </div>

          <div className="container-slider" id={'slider-' + whale}>
            <input type="range" min="0" max={this.state.rangeMax} value={this.state.rangeValue}  className="slider" id="rangeAnim" step="1" onChange={this.handlerRangeChange} />
          </div>
          <div id="progress-bar" />
          <div id="container-circles">
            <div id="circle0" className="circle fill" />
            <div id="circle1" className="circle" />
            <div id="circle2" className="circle" />
            <div id="circle3" className="circle" />
          </div>
          <div id="slider-bg" />

        </div>

        <div id="container-story-slideshow">
          <StorySlideshow
            currentLanguage = {this.props.currentLanguage}
            currentStory = {this.props.currentStory}
            rangeValue = {this.state.rangeValue}
            dataStories = {this.props.dataStories}
            handlerStoryTouch = {this.props.handlerStoryTouch}
          />
        </div>

        <div id="container-story-text">
          <StoryText
            currentLanguage = {this.props.currentLanguage}
            currentStory = {this.props.currentStory}
            rangeValue = {this.state.rangeValue}
            dataStories = {this.props.dataStories}
          />
        </div>

        <div id="container-story-caption">
          <StoryCaption
            currentLanguage = {this.props.currentLanguage}
            currentStory = {this.props.currentStory}
            rangeValue = {this.state.rangeValue}
            dataStories = {this.props.dataStories}
          />
        </div>


      </div>
    )

  }
}

export default Story
