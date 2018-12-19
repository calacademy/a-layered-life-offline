import React, { Component } from 'react'
import '../style/StoryText.css'

class StoryText extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    if (this.props.dataStories) {

      var _this = this

      // 4 text blocks for all stories
      var segmentsText0 = []
      var segmentsText1 = []
      var segmentsText2 = []
      var segmentsText3 = []

      var conditionStoryTextSegment = function(r, s, t, seg) {
        // story 0 - blue
        if (s === 0) {
          if (t === 0) {
            if (seg === 0) {
              return ((r > 15) && (r < 40))
            } else if (seg === 1) {
              return ((r >= 40) && (r < 61))
            }
          } else if (t === 1) {
            if (seg === 0) {
              return ((r >= 68) && (r < 86))
            } else if (seg === 1) {
              return ((r >= 86) && (r < 118))
            } else if (seg === 2) {
              return ((r >= 118) && (r < 129))
            }
          } else if (t === 2) {
            if (seg === 0) {
              return ((r >= 136) && (r < 156))
            } else if (seg === 1) {
              return ((r >= 156) && (r < 197))
            }
          } else if (t === 3) {
            if (seg === 0) {
              return ((r >= 204) && (r < 250))
            } else if (seg === 1) {
              return ((r >= 250) && (r < 263))
            }
          }
        // story 1 - sperm
      } else if (s === 1) {
          if (t === 0) {
            if (seg === 0) {
              return ((r > 10) && (r < 36))
            } else if (seg === 1) {
              return ((r >= 36) && (r < 51))
            } else if (seg === 2) {
              return ((r >= 51) && (r < 63))
            }
          } else if (t === 1) {
            if (seg === 0) {
              return ((r >= 70) && (r < 94))
            } else if (seg === 1) {
              return ((r >= 94) && (r < 111))
            } else if (seg === 2) {
              return ((r >= 111) && (r < 133))
            }
          } else if (t === 2) {
            if (seg === 0) {
              return ((r >= 140) && (r < 160))
            } else if (seg === 1) {
              return ((r >= 160) && (r < 180))
            } else if (seg === 2) {
              return ((r >= 180) && (r < 203))
            }
          } else if (t === 3) {
            if (seg === 0) {
              return ((r >= 210) && (r < 230))
            } else if (seg === 1) {
              return ((r >= 230) && (r < 273))
            }
          }
        // story 2 - fin
      } else if (s === 2) {
          if (t === 0) {
            if (seg === 0) {
              return ((r > 13) && (r < 49))
            } else if (seg === 1) {
              return ((r >= 49) && (r < 60))
            }
          } else if (t === 1) {
            if (seg === 0) {
              return ((r >= 67) && (r < 90))
            } else if (seg === 1) {
              return ((r >= 90) && (r < 127))
            }
          } else if (t === 2) {
            if (seg === 0) {
              return ((r >= 134) && (r < 180))
            } else if (seg === 1) {
              return ((r >= 180) && (r < 194))
            }
          } else if (t === 3) {
            if (seg === 0) {
              return ((r >= 201) && (r < 219))
            } else if (seg === 1) {
              return ((r >= 219) && (r < 238))
            } else if (seg === 2) {
              return ((r >= 238) && (r < 261))
            }
          }
        }
      }


      if (this.props.dataStories[this.props.currentStory]) {

        this.props.dataStories[this.props.currentStory].text[0].segments.forEach(function(segment, i) {
          segmentsText0.push(
            <span
              key={i}
              dangerouslySetInnerHTML={{__html: segment[_this.props.currentLanguage]}}
              className={
                conditionStoryTextSegment(_this.props.rangeValue, _this.props.currentStory, 0, i)
                ? 'highlight' : ''}
            />
          )
        })

        this.props.dataStories[this.props.currentStory].text[1].segments.forEach(function(segment, i) {
          segmentsText1.push(
            <span
              key={i}
              dangerouslySetInnerHTML={{__html: segment[_this.props.currentLanguage]}}
              className={
                conditionStoryTextSegment(_this.props.rangeValue, _this.props.currentStory, 1, i)
                ? 'highlight' : ''}
            />
          )
        })

        this.props.dataStories[this.props.currentStory].text[2].segments.forEach(function(segment, i) {
          segmentsText2.push(
            <span
              key={i}
              dangerouslySetInnerHTML={{__html: segment[_this.props.currentLanguage]}}
              className={
                conditionStoryTextSegment(_this.props.rangeValue, _this.props.currentStory, 2, i)
                ? 'highlight' : ''}
            />
          )
        })

        this.props.dataStories[this.props.currentStory].text[3].segments.forEach(function(segment, i) {
          segmentsText3.push(
            <span
              key={i}
              dangerouslySetInnerHTML={{__html: segment[_this.props.currentLanguage]}}
              className={
                conditionStoryTextSegment(_this.props.rangeValue, _this.props.currentStory, 3, i)
                ? 'highlight' : ''}
            />
          )
        })

      }

      var conditionStoryText = function(r, s, t) {
        // blue
        if (s === 0) {
          if (t === 0) {
            return ((r > 15) && (r < 61))
          }
          else if (t === 1) {
            return ((r >= 68) && (r < 129))
          }
          else if (t === 2) {
            return ((r >= 136) && (r < 197))
          }
          else if (t === 3) {
            return ((r >= 204) && (r < 263))
          }
        }
        // sperm
        else if (s === 1) {
          if (t === 0) {
            return ((r > 10) && (r < 63))
          }
          else if (t === 1) {
            return ((r >= 70) && (r < 133))
          }
          else if (t === 2) {
            return ((r >= 140) && (r < 203))
          }
          else if (t === 3) {
            return ((r >= 210) && (r < 273))
          }
        }
        // fin
        else if (s === 2) {
          if (t === 0) {
            return ((r > 13) && (r < 60))
          }
          else if (t === 1) {
            return ((r >= 67) && (r < 127))
          }
          else if (t === 2) {
            return ((r >= 134) && (r < 194))
          }
          else if (t === 3) {
            return ((r >= 201) && (r < 261))
          }
        }
      }

      return (
        <div id="story-text">

          <div
            id={'story-' + this.props.currentStory + '-text-0'}
            className={
              conditionStoryText(this.props.rangeValue, this.props.currentStory, 0)
              ? 'reveal' : ''}
            >
            {segmentsText0}
          </div>

          <div
            id={'story-' + this.props.currentStory + '-text-1'}
            className={
              conditionStoryText(this.props.rangeValue, this.props.currentStory, 1)
              ? 'reveal' : ''}
            >
            {segmentsText1}
          </div>

          <div
            id={'story-' + this.props.currentStory + '-text-2'}
            className={
              conditionStoryText(this.props.rangeValue, this.props.currentStory, 2)
              ? 'reveal' : ''}
            >
            {segmentsText2}
          </div>

          <div
            id={'story-' + this.props.currentStory + '-text-3'}
            className={
              conditionStoryText(this.props.rangeValue, this.props.currentStory, 3)
              ? 'reveal' : ''}
            >
            {segmentsText3}
          </div>

        </div>
      )

    } else {
      return(
        <div />
      )
    }

  }
}

export default StoryText
