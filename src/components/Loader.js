import React, {Component} from 'react'
import '../style/Loader.css'

class Loader extends Component {

  componentDidUpdate(prevProps, prevState) {
    var _this = this
    if (this.props.dataLoaded !== prevProps.dataLoaded) {
      setTimeout(function() {
        _this.props.handlerLoadComplete()
      }, 30000)
    }
  }

  render() {

    if (this.props.dataLoaded) {

      const rows = []
      var animations = []

      var countMenu = [72, 'animation-menu']
      var countBlueWhale = [272, 'animation-blue-whale']
      var countSpermWhale = [280, 'animation-sperm-whale']
      var countFinWhale = [268, 'animation-fin-whale']
      var countIntroBlueWhale = [33, 'animation-intro-blue-whale']
      var countIntroSpermWhale = [33, 'animation-intro-sperm-whale']
      var countIntroFinWhale = [33, 'animation-intro-fin-whale']
      var countOutroBlueWhale = [10, 'animation-outro-blue-whale']
      var countOutroSpermWhale = [10, 'animation-outro-sperm-whale']
      var countOutroFinWhale = [9, 'animation-outro-fin-whale']

      var arrayAnimCounts = [
        countMenu,
        countBlueWhale,
        countSpermWhale,
        countFinWhale,
        countIntroBlueWhale,
        countIntroSpermWhale,
        countIntroFinWhale,
        countOutroBlueWhale,
        countOutroSpermWhale,
        countOutroFinWhale
      ]

      for (let x = 0; x < arrayAnimCounts.length; x++) {
        for (let i = 1; i <= arrayAnimCounts[x][0]; i++) {
          animations.push(
            <img key={x + '' + i} src={process.env.REACT_APP_ANIMATION_PATH + '/' + arrayAnimCounts[x][1] + '/' + i + '.png'} alt="" />
          )
        }
      }

      rows.push(
        <div key="0">
          <div key="1" id="loader-animation-images">
          {animations}
          </div>
          <div key="2" id="loader-source-images">
            <div id="carbon_air-and-ocean-interact" />
            <div id="bg-menu" />
            <div id="icon-case-for-collections2x" />
            <div id="slider-bg2x" />
            <div id="bg-water" />
            <div id="icon-some-things-never-change2x" />
            <div id="slider-blue-whale2x" />
            <div id="btn-next-blue" />
            <div id="icon-value-of-variations2x" />
            <div id="slider-fin-whale2x" />
            <div id="btn-next-white" />
            <div id="list-number-1" />
            <div id="slider-sperm-whale2x" />
            <div id="close-btn-blue" />
            <div id="list-number-2" />
            <div id="close-btn-white" />
            <div id="list-number-3" />
            <div id="blue-whale-0" />
            <div id="blue-whale-2" />
            <div id="fin-whale-2" />
            <div id="sperm-whale-1" />
            <div id="blue-whale-1" />
            <div id="fin-whale-1" />
            <div id="sperm-whale-0" />
            <div id="sperm-whale-2" />
          </div>
        </div>
      )

      return(
        <div id="loader">
          <div id="asset-container">
            {rows}
            <p className="wa">Test123!@#</p>
            <p className="wb">Test123!@#</p>
            <p className="wc">Test123!@#</p>
            <p className="wd">Test123!@#</p>
            <p className="we">Test123!@#</p>
            <p className="wf">Test123!@#</p>
            <p className="wg">Test123!@#</p>
            <p className="ca">測試中文字體</p>
            <p className="cb">測試中文字體</p>
            <p className="cc">測試中文字體</p>
          </div>
          <div id="message-container">
            <p>This exhibit is being updated.</p>
          </div>
        </div>
      )

    } else {

      return(
        <div id="loader">
          <div id="message-container">
            <p>This exhibit is being updated.</p>
          </div>
        </div>
      )

    }

  }

}

export default Loader
