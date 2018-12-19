import React, { Component } from 'react'
import '../style/StorySlideshow.css'
import { Carousel } from 'react-bootstrap'

class StorySlideshow extends Component {
  constructor(props) {
    super(props)

    this.handlerTouchStart = this._onTouchStart.bind(this)
    this.handlerTouchMove = this._onTouchMove.bind(this)
    this.handlerTouchEnd = this._onTouchEnd.bind(this)
    this.handlerSelect = this._onSelect.bind(this)
    this.handlerOpenCarousel = this._openCarousel.bind(this)
    this.handlerCloseCarousel = this._closeCarousel.bind(this)

    this.state = {
      index: 0,
      direction: 'next',
      minDistance: 50,
      showCarousel: false,
    }

    this._swipe = {}

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentStory !== this.props.currentStory) {
      this.setState({
        showCarousel: false,
        index: 0
      })
    }
  }

  _openCarousel() {
    this.setState({
      showCarousel: true
    })
    this.props.handlerStoryTouch()
  }

  _closeCarousel() {
    this.setState({
      showCarousel: false,
      index: 0
    })
    this.props.handlerStoryTouch()
  }


  _onTouchStart(e) {
    const touch = e.touches[0]
    this._swipe = { x: touch.clientX }
  }

  _onTouchMove(e) {
    //e.preventDefault()
    if (e.changedTouches && e.changedTouches.length) {
      this._swipe.swiping = true
    }
  }

  _onTouchEnd(e) {
    const touch = e.changedTouches[0]
    const absX = Math.abs(touch.clientX - this._swipe.x)
    if (this._swipe.swiping && absX > this.state.minDistance ) {
      if (touch.clientX > this._swipe.x) {
        this.setState({
          index: (this.state.index === 0) ? 2 : this.state.index - 1,
          direction: 'prev'
        })
      } else {
        this.setState({
          index: (this.state.index === 2) ? 0 : this.state.index + 1,
          direction: 'next'
        })
      }
    }
    this._swipe = {}
    this.props.handlerStoryTouch()
  }

  _onSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    })
    this.props.handlerStoryTouch()
  }

  render() {

    var _this = this

    // build connector button based upon current story
    var buttonConnector = []
    if (this.props.currentStory !== null) {
      var intRangeStart = 0
      var intRangeEnd = 0
      if ((this.props.currentStory) === 0) {
        intRangeStart = 204
        intRangeEnd = 263
      } else
      if ((this.props.currentStory) === 1) {
        intRangeStart = 210
        intRangeEnd = 273
      } else
      if ((this.props.currentStory) === 2) {
        intRangeStart = 67
        intRangeEnd = 127
      }

      buttonConnector.push(
        <button
          key={this.props.currentStory}
          id={'story-slideshow-connector-btn-' + this.props.currentStory}
          onClick={this.handlerOpenCarousel}
          className={
            ((this.props.rangeValue >= intRangeStart) && (this.props.rangeValue < intRangeEnd))
            ? 'story-slideshow-connector-btn show' : 'story-slideshow-connector-btn hide'
          }
        >
          <span dangerouslySetInnerHTML={{__html: this.props.dataStories[this.props.currentStory].slideshow.btnText[this.props.currentLanguage]}} />
        </button>
      )

      // build carousel items based upon current story
      var carouselItems = []
      if (this.props.currentStory !== null) {
        this.props.dataStories[this.props.currentStory].slideshow.slides.forEach(function(slide, i) {

          var carouselItemCaptions = []
          slide.captions.forEach(function(caption, j) {
            carouselItemCaptions.push(
              <div
                key={j}
                className="slideshow-slide-caption"
                id={'slideshow-' + _this.props.currentStory + '-slide-' + i + '-caption-' + j}
                >
                  <div dangerouslySetInnerHTML={{__html: caption[_this.props.currentLanguage]}} />
              </div>
            )
          })

          carouselItems.push(
            <Carousel.Item
              key={i}
              onTouchStart={_this.handlerTouchStart}
              onTouchMove={_this.handlerTouchMove}
              onTouchEnd={_this.handlerTouchEnd}
              >
              <div
                className="slideshow-slide-image"
                id={'slideshow-' + _this.props.currentStory + '-slide-' + i + '-image'}
              />
              <div
                className="slideshow-slide-text-container"
                id={'slideshow-' + _this.props.currentStory + '-slide-' + i + '-text-container'}
                >
                  <h1 dangerouslySetInnerHTML={{__html: slide.title[_this.props.currentLanguage]}} />
                  <p dangerouslySetInnerHTML={{__html: slide.copy[_this.props.currentLanguage]}} />
              </div>
              {carouselItemCaptions}
            </Carousel.Item>
          )
        })
      }

    }

    if (this.props.currentStory !== null) {

      return (
        <div id="story-slideshow">

          {buttonConnector}

          <div
            id="story-slideshow-container"
            className={this.state.showCarousel ? 'show' : 'hide'}
            >

            <div className="slideshow-container-inner">

              <button
                className="story-slideshow-btn-close"
                onClick={this.handlerCloseCarousel}
              />
              <div id="slideshow-left-mask" />
              <div id="slideshow-right-mask" />
              <div
                id="infobar"
                className={'infobar-' + this.props.currentStory}>
                <div className="infobar-text-container">
                  <h1 dangerouslySetInnerHTML={{__html: this.props.dataStories[this.props.currentStory].slideshow.title[this.props.currentLanguage]}} />
                  <p dangerouslySetInnerHTML={{__html: this.props.dataStories[this.props.currentStory].slideshow.subheader[this.props.currentLanguage]}} />
                </div>
              </div>
              <Carousel
                activeIndex={this.state.index}
                direction={this.state.direction}
                onSelect={this.handlerSelect}
                wrap={true}
                >
                {carouselItems}
              </Carousel>

            </div>
          </div>

        </div>
      )

    } else {
      return (
        <div />
      )
    }

  }
}

export default StorySlideshow
