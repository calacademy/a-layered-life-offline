import React, { Component } from 'react'
import '../style/Menu.css'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selection: null
    }
    this.handlerSelectStory = this._selectStory.bind(this)
  }

  _selectStory(e, s) {
    // only select story when welcome animation on 1st frame
    var _this = this
    var animPos = document.getElementById('menu-animation-images-' + s)
    var rect = animPos.getBoundingClientRect()
    if (rect.left > -2000) {
      this.props.handlerSelectStory(s)
    } else {
      setTimeout(function() {
        _this._selectStory(e, s)
      }, 50)
    }

    this.setState({
      selection: s
    })

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentStory !== this.props.currentStory) {
      this.setState({
        selection: null
      })
    }
  }

  render() {

    var images = []

    for (var i = 1; i <= 72; i++) {
      images.push(
        <img key={i} src={process.env.REACT_APP_ANIMATION_PATH + '/animation-menu/' + i + '.png'} alt="" />
      )
    }

    var markupTitle = {__html: ''}
    var markupSubheader = {__html: ''}
    var menu0 = {__html: ''}
    var menu1 = {__html: ''}
    var menu2 = {__html: ''}

    if (this.props.dataTitle) {
      markupTitle = {__html: this.props.dataTitle[this.props.currentLanguage]}
    }
    if (this.props.dataSubheader) {
      markupSubheader = {__html: this.props.dataSubheader[this.props.currentLanguage]}
    }
    if (this.props.dataMenu) {
      menu0 = {__html: this.props.dataMenu[0][this.props.currentLanguage]}
      menu1 = {__html: this.props.dataMenu[1][this.props.currentLanguage]}
      menu2 = {__html: this.props.dataMenu[2][this.props.currentLanguage]}
    }

    return (
      <div id="menu"
        className={(this.props.currentOutro !== null) ? 'hide' : ''}
        >

        <div
          className={(this.state.selection !== null) ? 'menu-blurb-container mask' : 'menu-blurb-container'}
          >
          <h1 dangerouslySetInnerHTML={markupTitle} />
          <p dangerouslySetInnerHTML={markupSubheader} />
        </div>

        <div className="menu-btn-container">
          <button
            onTouchEnd={(e) => this.handlerSelectStory(e, 0)}
            onClick={(e) => this.handlerSelectStory(e, 0)}
            className={((this.state.selection === 1) || (this.state.selection === 2)) ? 'mask' : ''}
          >
          <div dangerouslySetInnerHTML={menu0} />
          </button>
          <button
            onTouchEnd={(e) => this.handlerSelectStory(e, 1)}
            onClick={(e) => this.handlerSelectStory(e, 1)}
            className={((this.state.selection === 0) || (this.state.selection === 2)) ? 'mask' : ''}
          >
          <div dangerouslySetInnerHTML={menu1} />
          </button>
          <button
            onTouchEnd={(e) => this.handlerSelectStory(e, 2)}
            onClick={(e) => this.handlerSelectStory(e, 2)}
            className={((this.state.selection === 0) || (this.state.selection === 1)) ? 'mask' : ''}
          >
          <div dangerouslySetInnerHTML={menu2} />
          </button>
        </div>
        <div className="menu-animation-container">
          <div
            className={((this.state.selection === 1) || (this.state.selection === 2)) ? 'mask menu-animation-images' : 'menu-animation-images'}
            id="menu-animation-images-0"
            >
          {images}
          </div>
          <div
            className={((this.state.selection === 0) || (this.state.selection === 2)) ? 'mask menu-animation-images' : 'menu-animation-images'}
            id="menu-animation-images-1"
            >
          {images}
          </div>
          <div
            className={((this.state.selection === 0) || (this.state.selection === 1)) ? 'mask menu-animation-images' : 'menu-animation-images'}
            id="menu-animation-images-2"
            >
          {images}
          </div>
        </div>
      </div>
    )
  }
}

export default Menu
