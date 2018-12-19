import React, {Component} from 'react'
import '../style/Translator.css'

class Translator extends Component {
  
  render() {
    return(
      <div id="translator">
        <button
          className={this.props.display === 'credits' ? 'credits active' : 'credits'}
          onTouchEnd={(e) => this.props.handlerSelectCredits(e)}
          onClick={(e) => this.props.handlerSelectCredits(e)}
          ><span>Credits</span></button>
        <button
          className={this.props.currentLanguage === 'tl' ? 'active' : ''}
          onTouchEnd={(e) => this.props.handlerSelectLanguage(e, 'tl')}
          onClick={(e) => this.props.handlerSelectLanguage(e, 'tl')}
          ><span>FILIPINO</span></button>
        <button
          className={this.props.currentLanguage === 'zh' ? 'active' : ''}
          onTouchEnd={(e) => this.props.handlerSelectLanguage(e, 'zh')}
          onClick={(e) => this.props.handlerSelectLanguage(e, 'zh')}
          ><span>繁体中文</span></button>
        <button
          className={this.props.currentLanguage === 'es' ? 'active' : ''}
          onTouchEnd={(e) => this.props.handlerSelectLanguage(e, 'es')}
          onClick={(e) => this.props.handlerSelectLanguage(e, 'es')}
          ><span>ESPAÑOL</span></button>
        <button
          className={this.props.currentLanguage === 'en' ? 'active' : ''}
          onTouchEnd={(e) => this.props.handlerSelectLanguage(e, 'en')}
          onClick={(e) => this.props.handlerSelectLanguage(e, 'en')}
          ><span>ENGLISH</span></button>
      </div>
    )
  }
}

export default Translator
