import React, { Component } from 'react'
import '../style/StoryCaption.css'

class StoryCaption extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    var conditionStoryCaption = function(r, s, c) {
      // blue
      if (s === 0) {
        if (c === 0) {
          return ((r > 15) && (r < 24))
        }
        else if (c === 1) {
          return ((r > 74) && (r < 85))
        }
        else if (c === 2) {
          return ((r > 98) && (r < 108))
        }
        else if (c === 3) {
          return ((r > 213) && (r < 263))
        }
        else if (c === 4) {
          return ((r > 213) && (r < 263))
        }
      }
      // sperm
      else if (s === 1) {
        if (c === 0) {
          return ((r > 74) && (r < 90))
        }
      }
      // fin
      else if (s === 2) {
        if (c === 0) {
          return ((r > 23) && (r < 47))
        }
        else if (c === 1) {
          return ((r > 29) && (r < 47))
        }
        else if (c === 2) {
          return ((r > 48) && (r < 67))
        }
        else if (c === 3) {
          return ((r > 76) && (r < 132))
        }
        else if (c === 4) {
          return ((r > 76) && (r < 132))
        }
        else if (c === 5) {
          return ((r > 76) && (r < 132))
        }
      }
      else {
        return false
      }
    }

    var markupStoryCaptions = []
    var _this = this

    if (this.props.dataStories) {

      if (this.props.dataStories[this.props.currentStory]) {

        this.props.dataStories[this.props.currentStory].captions.forEach(function(caption, i) {
          markupStoryCaptions.push(
            <div
              key={i}
              id={'story-' + _this.props.currentStory + '-caption-' + i }
              className={
                conditionStoryCaption(_this.props.rangeValue, _this.props.currentStory, i)
                ? 'reveal' : ''
              }
              >
              <span
                dangerouslySetInnerHTML={{__html: caption[_this.props.currentLanguage]}}
              />
            </div>
          )
        })

      }

    }

    return (
      <div id="story-caption">
        {markupStoryCaptions}
      </div>
    )

  }
}

export default StoryCaption
