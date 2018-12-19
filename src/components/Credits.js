import React, {Component} from 'react'
import '../style/Credits.css'

class Credits extends Component {

  componentDidUpdate(prevProps, prevState) {
    if (this.props.showCredits && !prevProps.showCredits) {
      var scroll = document.getElementById('credits-scroll-container')
      scroll.scrollTop = 0
    }
  }

  render() {

    const rows = []

    if (this.props.dataCredits) {

      var _this = this

      this.props.dataCredits.forEach(function(cred, i) {

        var header = ''
        var desc = ''
        var markupDesc = {__html: ''}

        if (cred['title_' + _this.props.currentLanguage]) {
          header = cred['title_' + _this.props.currentLanguage]
        }
        if (cred['subheader_' +  _this.props.currentLanguage]) {
          desc = cred['subheader_' + _this.props.currentLanguage]
          desc = desc.replace(/<\/?a[^>]*>/g, "")
          markupDesc = {__html: desc}
        }

        rows.push(
          <li
            key={i}
            >
              <h2>{header}</h2>
              <p dangerouslySetInnerHTML={markupDesc} />
            </li>
        )
      })

    }

    return(
      <div id="credits">
        <button
          onTouchEnd={(e) => this.props.handlerCloseCredits(e)}
          onClick={(e) => this.props.handlerCloseCredits(e)}
        />
        <div id="credits-scroll-container">
          <h1>Credits</h1>
          <ul>
            {rows}
          </ul>
          <div id="credits-mask" />
        </div>
      </div>
    )
  }
}

export default Credits
