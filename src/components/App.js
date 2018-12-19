import React, { Component } from 'react'
import Translator from './Translator'
import Credits from './Credits'
import Menu from './Menu'
import Intro from './Intro'
import Story from './Story'
import Outro from './Outro'
import '../style/App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      showCredits: false,
      currentIntro: null, // null || 0 || 1 || 2
      currentStory: null, // null || 0 || 1 || 2
      currentOutro: null, // null || 0 || 1 || 2
      currentLanguage: 'en', // en || es ||zh || tl
      dataLoaded: false,
      dataArray: [],
      dataCredits: null,
      dataTitle: null,
      dataSubheader: null,
      dataInstructions: null,
      dataMenu: null,
      dataStories: null,
      inactivityInt: 45000,
      dateLastTouch: null
    }

    // Menu handler
    this.handlerSelectStory = this._selectStory.bind(this)
    // Intro handler
    this.handlerInitStory = this._initStory.bind(this)
    // Outro handler
    this.handlerRestartMenu = this._restartMenu.bind(this)
    // Story handler
    this.handlerCloseStory = this._closeStory.bind(this)
    this.handlerInitOutro = this._initOutro.bind(this)
    this.handlerStoryTouch = this._storyTouch.bind(this)
    // Translator handlers
    this.handlerSelectLanguage = this._selectLanguage.bind(this)
    this.handlerSelectCredits = this._selectCredits.bind(this)
    // Credits handlers
    this.handlerCloseCredits = this._closeCredits.bind(this)

  }

  _inactivityCheck() {
    var now = new Date()
    var check = new Date(now.getTime() - this.state.inactivityInt)
    if (this.state.dateLastTouch !== null) {
      if (this.state.dateLastTouch < check) {
        this.setState({
          currentLanguage: 'en',
          showCredits: false,
          currentIntro: null,
          currentStory: null,
          currentOutro: null,
          dateLastTouch: null
        })
      }
    }
  }

  // Menu method
  _selectStory(whale) {
    this.setState({
      currentIntro: whale,
      dateLastTouch: new Date()
    })
  }

  // Intro method
  // Menu method
  _initStory(whale) {
    this.setState({
      currentStory: whale,
      currentIntro: null
    })
  }

  _closeStory(e) {
    //e.preventDefault()
    this.setState({
      currentStory: null,
      dateLastTouch: new Date()
    })
  }

  _restartMenu(s) {
    this.setState({
      currentOutro: null
    })
  }

  _initOutro(whale) {
    this.setState({
      currentOutro: whale,
      currentStory: null
    })
  }

  // Translator methods
  _selectLanguage(e, lang) {
    e.preventDefault()
    this.setState({
      currentLanguage: lang,
      dateLastTouch: new Date()
    })
  }

  _selectCredits(e) {
    e.preventDefault()
    if (!this.state.showCredits) {
      this.setState({
        showCredits: true,
        dateLastTouch: new Date()
      })
    }
  }
  _closeCredits(e) {
    e.preventDefault()
    if (this.state.showCredits) {
      this.setState({
        showCredits: false,
        dateLastTouch: new Date()
      })
    }
  }

  _getData(n) {
    // 30 necessary data endpoint requests
    if (n > 29) {
      this._parseData()
      return
    }

    var _this = this
    fetch(process.env['REACT_APP_REST_URL_' + n])
    .then(function (response) {
      return response.json()
    }).then(function(data) {
      _this.setState ({
        dataArray: [..._this.state.dataArray, data]
      })
      _this._getData(n + 1)
    }).catch(function (ex) {
      console.log('JSON fetch failed: fetching again in 30 seconds', ex)
      // try again in 30 sec
      setTimeout(function () {
       _this._getData(n)
     }, 30000)
    })
  }

  _parseData() {
    this.setState({
      dataCredits: this.state.dataArray[2] ? this.state.dataArray[2] : '',
      dataTitle: {
        en: this.state.dataArray[0][0] ? this.state.dataArray[0][0].title_en : '',
        es: this.state.dataArray[0][0] ? this.state.dataArray[0][0].title_es : '',
        zh: this.state.dataArray[0][0] ? this.state.dataArray[0][0].title_zh : '',
        tl: this.state.dataArray[0][0] ? this.state.dataArray[0][0].title_tl : ''
      },
      dataSubheader: {
        en: this.state.dataArray[0][0] ? this.state.dataArray[0][0].subheader_en : '',
        es: this.state.dataArray[0][0] ? this.state.dataArray[0][0].subheader_es : '',
        zh: this.state.dataArray[0][0] ? this.state.dataArray[0][0].subheader_zh : '',
        tl: this.state.dataArray[0][0] ? this.state.dataArray[0][0].subheader_tl : ''
      },
      dataInstructions: {
        en: this.state.dataArray[0][0] ? this.state.dataArray[0][0].instructions_en : '',
        es: this.state.dataArray[0][0] ? this.state.dataArray[0][0].instructions_es : '',
        zh: this.state.dataArray[0][0] ? this.state.dataArray[0][0].instructions_zh : '',
        tl: this.state.dataArray[0][0] ? this.state.dataArray[0][0].instructions_tl : ''
      },
      dataMenu: [
        {
          en: this.state.dataArray[1][0] ? this.state.dataArray[1][0].menu_en : '',
          es: this.state.dataArray[1][0] ? this.state.dataArray[1][0].menu_es : '',
          zh: this.state.dataArray[1][0] ? this.state.dataArray[1][0].menu_zh : '',
          tl: this.state.dataArray[1][0] ? this.state.dataArray[1][0].menu_tl : ''
        },
        {
          en: this.state.dataArray[1][1] ? this.state.dataArray[1][1].menu_en : '',
          es: this.state.dataArray[1][1] ? this.state.dataArray[1][1].menu_es : '',
          zh: this.state.dataArray[1][1] ? this.state.dataArray[1][1].menu_zh : '',
          tl: this.state.dataArray[1][1] ? this.state.dataArray[1][1].menu_tl : ''
        },
        {
          en: this.state.dataArray[1][2] ? this.state.dataArray[1][2].menu_en : '',
          es: this.state.dataArray[1][2] ? this.state.dataArray[1][2].menu_es : '',
          zh: this.state.dataArray[1][2] ? this.state.dataArray[1][2].menu_zh : '',
          tl: this.state.dataArray[1][2] ? this.state.dataArray[1][2].menu_tl : ''
        }
      ],
      dataStories: [
        {
          text: [
            {
              segments: [
                {
                  en: this.state.dataArray[3][0] ? this.state.dataArray[3][0].text_segment_en : '',
                  es: this.state.dataArray[3][0] ? this.state.dataArray[3][0].text_segment_es : '',
                  zh: this.state.dataArray[3][0] ? this.state.dataArray[3][0].text_segment_zh : '',
                  tl: this.state.dataArray[3][0] ? this.state.dataArray[3][0].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[3][1] ? this.state.dataArray[3][1].text_segment_en : '',
                  es: this.state.dataArray[3][1] ? this.state.dataArray[3][1].text_segment_es : '',
                  zh: this.state.dataArray[3][1] ? this.state.dataArray[3][1].text_segment_zh : '',
                  tl: this.state.dataArray[3][1] ? this.state.dataArray[3][1].text_segment_tl : '',
                }
              ]
            },
            {
              segments: [
                {
                  en: this.state.dataArray[3][2] ? this.state.dataArray[3][2].text_segment_en : '',
                  es: this.state.dataArray[3][2] ? this.state.dataArray[3][2].text_segment_es : '',
                  zh: this.state.dataArray[3][2] ? this.state.dataArray[3][2].text_segment_zh : '',
                  tl: this.state.dataArray[3][2] ? this.state.dataArray[3][2].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[3][3] ? this.state.dataArray[3][3].text_segment_en : '',
                  es: this.state.dataArray[3][3] ? this.state.dataArray[3][3].text_segment_es : '',
                  zh: this.state.dataArray[3][3] ? this.state.dataArray[3][3].text_segment_zh : '',
                  tl: this.state.dataArray[3][3] ? this.state.dataArray[3][3].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[3][4] ? this.state.dataArray[3][4].text_segment_en : '',
                  es: this.state.dataArray[3][4] ? this.state.dataArray[3][4].text_segment_es : '',
                  zh: this.state.dataArray[3][4] ? this.state.dataArray[3][4].text_segment_zh : '',
                  tl: this.state.dataArray[3][4] ? this.state.dataArray[3][4].text_segment_tl : '',
                }
              ]
            },
            {
              segments: [
                {
                  en: this.state.dataArray[3][5] ? this.state.dataArray[3][5].text_segment_en : '',
                  es: this.state.dataArray[3][5] ? this.state.dataArray[3][5].text_segment_es : '',
                  zh: this.state.dataArray[3][5] ? this.state.dataArray[3][5].text_segment_zh : '',
                  tl: this.state.dataArray[3][5] ? this.state.dataArray[3][5].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[3][6] ? this.state.dataArray[3][6].text_segment_en : '',
                  es: this.state.dataArray[3][6] ? this.state.dataArray[3][6].text_segment_es : '',
                  zh: this.state.dataArray[3][6] ? this.state.dataArray[3][6].text_segment_zh : '',
                  tl: this.state.dataArray[3][6] ? this.state.dataArray[3][6].text_segment_tl : '',
                }
              ]
            },
            {
              segments: [
                {
                  en: this.state.dataArray[3][7] ? this.state.dataArray[3][7].text_segment_en : '',
                  es: this.state.dataArray[3][7] ? this.state.dataArray[3][7].text_segment_es : '',
                  zh: this.state.dataArray[3][7] ? this.state.dataArray[3][7].text_segment_zh : '',
                  tl: this.state.dataArray[3][7] ? this.state.dataArray[3][7].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[3][8] ? this.state.dataArray[3][8].text_segment_en : '',
                  es: this.state.dataArray[3][8] ? this.state.dataArray[3][8].text_segment_es : '',
                  zh: this.state.dataArray[3][8] ? this.state.dataArray[3][8].text_segment_zh : '',
                  tl: this.state.dataArray[3][8] ? this.state.dataArray[3][8].text_segment_tl : '',
                }
              ]
            }
          ],
          captions: [
            {
              en: this.state.dataArray[4][0] ? this.state.dataArray[4][0].caption_en : '',
              es: this.state.dataArray[4][0] ? this.state.dataArray[4][0].caption_es : '',
              zh: this.state.dataArray[4][0] ? this.state.dataArray[4][0].caption_zh : '',
              tl: this.state.dataArray[4][0] ? this.state.dataArray[4][0].caption_tl : '',
            },
            {
              en: this.state.dataArray[4][1] ? this.state.dataArray[4][1].caption_en : '',
              es: this.state.dataArray[4][1] ? this.state.dataArray[4][1].caption_es : '',
              zh: this.state.dataArray[4][1] ? this.state.dataArray[4][1].caption_zh : '',
              tl: this.state.dataArray[4][1] ? this.state.dataArray[4][1].caption_tl : '',
            },
            {
              en: this.state.dataArray[4][2] ? this.state.dataArray[4][2].caption_en : '',
              es: this.state.dataArray[4][2] ? this.state.dataArray[4][2].caption_es : '',
              zh: this.state.dataArray[4][2] ? this.state.dataArray[4][2].caption_zh : '',
              tl: this.state.dataArray[4][2] ? this.state.dataArray[4][2].caption_tl : '',
            },
            {
              en: this.state.dataArray[4][3] ? this.state.dataArray[4][3].caption_en : '',
              es: this.state.dataArray[4][3] ? this.state.dataArray[4][3].caption_es : '',
              zh: this.state.dataArray[4][3] ? this.state.dataArray[4][3].caption_zh : '',
              tl: this.state.dataArray[4][3] ? this.state.dataArray[4][3].caption_tl : '',
            },
            {
              en: this.state.dataArray[4][4] ? this.state.dataArray[4][4].caption_en : '',
              es: this.state.dataArray[4][4] ? this.state.dataArray[4][4].caption_es : '',
              zh: this.state.dataArray[4][4] ? this.state.dataArray[4][4].caption_zh : '',
              tl: this.state.dataArray[4][4] ? this.state.dataArray[4][4].caption_tl : '',
            }
          ],
          slideshow: {
            btnText: {
              en: this.state.dataArray[5][0] ? this.state.dataArray[5][0].btn_txt_en : '',
              es: this.state.dataArray[5][0] ? this.state.dataArray[5][0].btn_txt_es : '',
              zh: this.state.dataArray[5][0] ? this.state.dataArray[5][0].btn_txt_zh : '',
              tl: this.state.dataArray[5][0] ? this.state.dataArray[5][0].btn_txt_tl : '',
            },
            title: {
              en: this.state.dataArray[5][0] ? this.state.dataArray[5][0].title_en : '',
              es: this.state.dataArray[5][0] ? this.state.dataArray[5][0].title_es : '',
              zh: this.state.dataArray[5][0] ? this.state.dataArray[5][0].title_zh : '',
              tl: this.state.dataArray[5][0] ? this.state.dataArray[5][0].title_tl : '',
            },
            subheader: {
              en: this.state.dataArray[5][0] ? this.state.dataArray[5][0].subheader_en : '',
              es: this.state.dataArray[5][0] ? this.state.dataArray[5][0].subheader_es : '',
              zh: this.state.dataArray[5][0] ? this.state.dataArray[5][0].subheader_zh : '',
              tl: this.state.dataArray[5][0] ? this.state.dataArray[5][0].subheader_tl : '',
            },
            slides: [
              {
                title: {
                  en: this.state.dataArray[6][0] ? this.state.dataArray[6][0].title_en : '',
                  es: this.state.dataArray[6][0] ? this.state.dataArray[6][0].title_es : '',
                  zh: this.state.dataArray[6][0] ? this.state.dataArray[6][0].title_zh : '',
                  tl: this.state.dataArray[6][0] ? this.state.dataArray[6][0].title_tl : '',
                },
                copy: {
                  en: this.state.dataArray[6][0] ? this.state.dataArray[6][0].copy_en : '',
                  es: this.state.dataArray[6][0] ? this.state.dataArray[6][0].copy_es : '',
                  zh: this.state.dataArray[6][0] ? this.state.dataArray[6][0].copy_zh : '',
                  tl: this.state.dataArray[6][0] ? this.state.dataArray[6][0].copy_tl : '',
                },
                captions: [
                  {
                    en: this.state.dataArray[7][0] ? this.state.dataArray[7][0].caption_en : '',
                    es: this.state.dataArray[7][0] ? this.state.dataArray[7][0].caption_es : '',
                    zh: this.state.dataArray[7][0] ? this.state.dataArray[7][0].caption_zh : '',
                    tl: this.state.dataArray[7][0] ? this.state.dataArray[7][0].caption_tl : '',
                  },
                  {
                    en: this.state.dataArray[7][1] ? this.state.dataArray[7][1].caption_en : '',
                    es: this.state.dataArray[7][1] ? this.state.dataArray[7][1].caption_es : '',
                    zh: this.state.dataArray[7][1] ? this.state.dataArray[7][1].caption_zh : '',
                    tl: this.state.dataArray[7][1] ? this.state.dataArray[7][1].caption_tl : '',
                  },
                  {
                    en: this.state.dataArray[7][2] ? this.state.dataArray[7][2].caption_en : '',
                    es: this.state.dataArray[7][2] ? this.state.dataArray[7][2].caption_es : '',
                    zh: this.state.dataArray[7][2] ? this.state.dataArray[7][2].caption_zh : '',
                    tl: this.state.dataArray[7][2] ? this.state.dataArray[7][2].caption_tl : '',
                  }
                ]
              },
              {
                title: {
                  en: this.state.dataArray[8][0] ? this.state.dataArray[8][0].title_en : '',
                  es: this.state.dataArray[8][0] ? this.state.dataArray[8][0].title_es : '',
                  zh: this.state.dataArray[8][0] ? this.state.dataArray[8][0].title_zh : '',
                  tl: this.state.dataArray[8][0] ? this.state.dataArray[8][0].title_tl : '',
                },
                copy: {
                  en: this.state.dataArray[8][0] ? this.state.dataArray[8][0].copy_en : '',
                  es: this.state.dataArray[8][0] ? this.state.dataArray[8][0].copy_es : '',
                  zh: this.state.dataArray[8][0] ? this.state.dataArray[8][0].copy_zh : '',
                  tl: this.state.dataArray[8][0] ? this.state.dataArray[8][0].copy_tl : '',
                },
                captions: [
                  {
                    en: this.state.dataArray[9][0] ? this.state.dataArray[9][0].caption_en : '',
                    es: this.state.dataArray[9][0] ? this.state.dataArray[9][0].caption_es : '',
                    zh: this.state.dataArray[9][0] ? this.state.dataArray[9][0].caption_zh : '',
                    tl: this.state.dataArray[9][0] ? this.state.dataArray[9][0].caption_tl : '',
                  },
                  {
                    en: this.state.dataArray[9][1] ? this.state.dataArray[9][1].caption_en : '',
                    es: this.state.dataArray[9][1] ? this.state.dataArray[9][1].caption_es : '',
                    zh: this.state.dataArray[9][1] ? this.state.dataArray[9][1].caption_zh : '',
                    tl: this.state.dataArray[9][1] ? this.state.dataArray[9][1].caption_tl : '',
                  }
                ]
              },
              {
                title: {
                  en: this.state.dataArray[10][0] ? this.state.dataArray[10][0].title_en : '',
                  es: this.state.dataArray[10][0] ? this.state.dataArray[10][0].title_es : '',
                  zh: this.state.dataArray[10][0] ? this.state.dataArray[10][0].title_zh : '',
                  tl: this.state.dataArray[10][0] ? this.state.dataArray[10][0].title_tl : '',
                },
                copy: {
                  en: this.state.dataArray[10][0] ? this.state.dataArray[10][0].copy_en : '',
                  es: this.state.dataArray[10][0] ? this.state.dataArray[10][0].copy_es : '',
                  zh: this.state.dataArray[10][0] ? this.state.dataArray[10][0].copy_zh : '',
                  tl: this.state.dataArray[10][0] ? this.state.dataArray[10][0].copy_tl : '',
                },
                captions: [
                  {
                    en: this.state.dataArray[11][0] ? this.state.dataArray[11][0].caption_en : '',
                    es: this.state.dataArray[11][0] ? this.state.dataArray[11][0].caption_es : '',
                    zh: this.state.dataArray[11][0] ? this.state.dataArray[11][0].caption_zh : '',
                    tl: this.state.dataArray[11][0] ? this.state.dataArray[11][0].caption_tl : '',
                  },
                  {
                    en: this.state.dataArray[11][1] ? this.state.dataArray[11][1].caption_en : '',
                    es: this.state.dataArray[11][1] ? this.state.dataArray[11][1].caption_es : '',
                    zh: this.state.dataArray[11][1] ? this.state.dataArray[11][1].caption_zh : '',
                    tl: this.state.dataArray[11][1] ? this.state.dataArray[11][1].caption_tl : '',
                  }
                ]
              }
            ]
          }
        },
        {
          text: [
            {
              segments: [
                {
                  en: this.state.dataArray[12][0] ? this.state.dataArray[12][0].text_segment_en : '',
                  es: this.state.dataArray[12][0] ? this.state.dataArray[12][0].text_segment_es : '',
                  zh: this.state.dataArray[12][0] ? this.state.dataArray[12][0].text_segment_zh : '',
                  tl: this.state.dataArray[12][0] ? this.state.dataArray[12][0].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[12][1] ? this.state.dataArray[12][1].text_segment_en : '',
                  es: this.state.dataArray[12][1] ? this.state.dataArray[12][1].text_segment_es : '',
                  zh: this.state.dataArray[12][1] ? this.state.dataArray[12][1].text_segment_zh : '',
                  tl: this.state.dataArray[12][1] ? this.state.dataArray[12][1].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[12][2] ? this.state.dataArray[12][2].text_segment_en : '',
                  es: this.state.dataArray[12][2] ? this.state.dataArray[12][2].text_segment_es : '',
                  zh: this.state.dataArray[12][2] ? this.state.dataArray[12][2].text_segment_zh : '',
                  tl: this.state.dataArray[12][2] ? this.state.dataArray[12][2].text_segment_tl : '',
                }
              ]
            },
            {
              segments: [
                {
                  en: this.state.dataArray[12][3] ? this.state.dataArray[12][3].text_segment_en : '',
                  es: this.state.dataArray[12][3] ? this.state.dataArray[12][3].text_segment_es : '',
                  zh: this.state.dataArray[12][3] ? this.state.dataArray[12][3].text_segment_zh : '',
                  tl: this.state.dataArray[12][3] ? this.state.dataArray[12][3].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[12][4] ? this.state.dataArray[12][4].text_segment_en : '',
                  es: this.state.dataArray[12][4] ? this.state.dataArray[12][4].text_segment_es : '',
                  zh: this.state.dataArray[12][4] ? this.state.dataArray[12][4].text_segment_zh : '',
                  tl: this.state.dataArray[12][4] ? this.state.dataArray[12][4].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[12][5] ? this.state.dataArray[12][5].text_segment_en : '',
                  es: this.state.dataArray[12][5] ? this.state.dataArray[12][5].text_segment_es : '',
                  zh: this.state.dataArray[12][5] ? this.state.dataArray[12][5].text_segment_zh : '',
                  tl: this.state.dataArray[12][5] ? this.state.dataArray[12][5].text_segment_tl : '',
                }
              ]
            },
            {
              segments: [
                {
                  en: this.state.dataArray[12][6] ? this.state.dataArray[12][6].text_segment_en : '',
                  es: this.state.dataArray[12][6] ? this.state.dataArray[12][6].text_segment_es : '',
                  zh: this.state.dataArray[12][6] ? this.state.dataArray[12][6].text_segment_zh : '',
                  tl: this.state.dataArray[12][6] ? this.state.dataArray[12][6].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[12][7] ? this.state.dataArray[12][7].text_segment_en : '',
                  es: this.state.dataArray[12][7] ? this.state.dataArray[12][7].text_segment_es : '',
                  zh: this.state.dataArray[12][7] ? this.state.dataArray[12][7].text_segment_zh : '',
                  tl: this.state.dataArray[12][7] ? this.state.dataArray[12][7].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[12][8] ? this.state.dataArray[12][8].text_segment_en : '',
                  es: this.state.dataArray[12][8] ? this.state.dataArray[12][8].text_segment_es : '',
                  zh: this.state.dataArray[12][8] ? this.state.dataArray[12][8].text_segment_zh : '',
                  tl: this.state.dataArray[12][8] ? this.state.dataArray[12][8].text_segment_tl : '',
                }
              ]
            },
            {
              segments: [
                {
                  en: this.state.dataArray[12][9] ? this.state.dataArray[12][9].text_segment_en : '',
                  es: this.state.dataArray[12][9] ? this.state.dataArray[12][9].text_segment_es : '',
                  zh: this.state.dataArray[12][9] ? this.state.dataArray[12][9].text_segment_zh : '',
                  tl: this.state.dataArray[12][9] ? this.state.dataArray[12][9].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[12][10] ? this.state.dataArray[12][10].text_segment_en : '',
                  es: this.state.dataArray[12][10] ? this.state.dataArray[12][10].text_segment_es : '',
                  zh: this.state.dataArray[12][10] ? this.state.dataArray[12][10].text_segment_zh : '',
                  tl: this.state.dataArray[12][10] ? this.state.dataArray[12][10].text_segment_tl : '',
                }
              ]
            }
          ],
          captions: [
            {
              en: this.state.dataArray[13][0] ? this.state.dataArray[13][0].caption_en : '',
              es: this.state.dataArray[13][0] ? this.state.dataArray[13][0].caption_es : '',
              zh: this.state.dataArray[13][0] ? this.state.dataArray[13][0].caption_zh : '',
              tl: this.state.dataArray[13][0] ? this.state.dataArray[13][0].caption_tl : '',
            }
          ],
          slideshow: {
            btnText: {
              en: this.state.dataArray[14][0] ? this.state.dataArray[14][0].btn_txt_en : '',
              es: this.state.dataArray[14][0] ? this.state.dataArray[14][0].btn_txt_es : '',
              zh: this.state.dataArray[14][0] ? this.state.dataArray[14][0].btn_txt_zh : '',
              tl: this.state.dataArray[14][0] ? this.state.dataArray[14][0].btn_txt_tl : '',
            },
            title: {
              en: this.state.dataArray[14][0] ? this.state.dataArray[14][0].title_en : '',
              es: this.state.dataArray[14][0] ? this.state.dataArray[14][0].title_es : '',
              zh: this.state.dataArray[14][0] ? this.state.dataArray[14][0].title_zh : '',
              tl: this.state.dataArray[14][0] ? this.state.dataArray[14][0].title_tl : '',
            },
            subheader: {
              en: this.state.dataArray[14][0] ? this.state.dataArray[14][0].subheader_en : '',
              es: this.state.dataArray[14][0] ? this.state.dataArray[14][0].subheader_es : '',
              zh: this.state.dataArray[14][0] ? this.state.dataArray[14][0].subheader_zh : '',
              tl: this.state.dataArray[14][0] ? this.state.dataArray[14][0].subheader_tl : '',
            },
            slides: [
              {
                title: {
                  en: this.state.dataArray[15][0] ? this.state.dataArray[15][0].title_en : '',
                  es: this.state.dataArray[15][0] ? this.state.dataArray[15][0].title_es : '',
                  zh: this.state.dataArray[15][0] ? this.state.dataArray[15][0].title_zh : '',
                  tl: this.state.dataArray[15][0] ? this.state.dataArray[15][0].title_tl : '',
                },
                copy: {
                  en: this.state.dataArray[15][0] ? this.state.dataArray[15][0].copy_en : '',
                  es: this.state.dataArray[15][0] ? this.state.dataArray[15][0].copy_es : '',
                  zh: this.state.dataArray[15][0] ? this.state.dataArray[15][0].copy_zh : '',
                  tl: this.state.dataArray[15][0] ? this.state.dataArray[15][0].copy_tl : '',
                },
                captions: [
                  // dataArray[16] empty
                ]
              },
              {
                title: {
                  en: this.state.dataArray[17][0] ? this.state.dataArray[17][0].title_en : '',
                  es: this.state.dataArray[17][0] ? this.state.dataArray[17][0].title_es : '',
                  zh: this.state.dataArray[17][0] ? this.state.dataArray[17][0].title_zh : '',
                  tl: this.state.dataArray[17][0] ? this.state.dataArray[17][0].title_tl : '',
                },
                copy: {
                  en: this.state.dataArray[17][0] ? this.state.dataArray[17][0].copy_en : '',
                  es: this.state.dataArray[17][0] ? this.state.dataArray[17][0].copy_es : '',
                  zh: this.state.dataArray[17][0] ? this.state.dataArray[17][0].copy_zh : '',
                  tl: this.state.dataArray[17][0] ? this.state.dataArray[17][0].copy_tl : '',
                },
                captions: [
                  // dataArray[18] empty
                ]
              },
              {
                title: {
                  en: this.state.dataArray[19][0] ? this.state.dataArray[19][0].title_en : '',
                  es: this.state.dataArray[19][0] ? this.state.dataArray[19][0].title_es : '',
                  zh: this.state.dataArray[19][0] ? this.state.dataArray[19][0].title_zh : '',
                  tl: this.state.dataArray[19][0] ? this.state.dataArray[19][0].title_tl : '',
                },
                copy: {
                  en: this.state.dataArray[19][0] ? this.state.dataArray[19][0].copy_en : '',
                  es: this.state.dataArray[19][0] ? this.state.dataArray[19][0].copy_es : '',
                  zh: this.state.dataArray[19][0] ? this.state.dataArray[19][0].copy_zh : '',
                  tl: this.state.dataArray[19][0] ? this.state.dataArray[19][0].copy_tl : '',
                },
                captions: [
                  // dataArray[20] empty
                ]
              }
            ]
          }
        },
        {
          text: [
            {
              segments: [
                {
                  en: this.state.dataArray[21][0] ? this.state.dataArray[21][0].text_segment_en : '',
                  es: this.state.dataArray[21][0] ? this.state.dataArray[21][0].text_segment_es : '',
                  zh: this.state.dataArray[21][0] ? this.state.dataArray[21][0].text_segment_zh : '',
                  tl: this.state.dataArray[21][0] ? this.state.dataArray[21][0].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[21][1] ? this.state.dataArray[21][1].text_segment_en : '',
                  es: this.state.dataArray[21][1] ? this.state.dataArray[21][1].text_segment_es : '',
                  zh: this.state.dataArray[21][1] ? this.state.dataArray[21][1].text_segment_zh : '',
                  tl: this.state.dataArray[21][1] ? this.state.dataArray[21][1].text_segment_tl : '',
                }
              ]
            },
            {
              segments: [
                {
                  en: this.state.dataArray[21][2] ? this.state.dataArray[21][2].text_segment_en : '',
                  es: this.state.dataArray[21][2] ? this.state.dataArray[21][2].text_segment_es : '',
                  zh: this.state.dataArray[21][2] ? this.state.dataArray[21][2].text_segment_zh : '',
                  tl: this.state.dataArray[21][2] ? this.state.dataArray[21][2].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[21][3] ? this.state.dataArray[21][3].text_segment_en : '',
                  es: this.state.dataArray[21][3] ? this.state.dataArray[21][3].text_segment_es : '',
                  zh: this.state.dataArray[21][3] ? this.state.dataArray[21][3].text_segment_zh : '',
                  tl: this.state.dataArray[21][3] ? this.state.dataArray[21][3].text_segment_tl : '',
                }
              ]
            },
            {
              segments: [
                {
                  en: this.state.dataArray[21][4] ? this.state.dataArray[21][4].text_segment_en : '',
                  es: this.state.dataArray[21][4] ? this.state.dataArray[21][4].text_segment_es : '',
                  zh: this.state.dataArray[21][4] ? this.state.dataArray[21][4].text_segment_zh : '',
                  tl: this.state.dataArray[21][4] ? this.state.dataArray[21][4].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[21][5] ? this.state.dataArray[21][5].text_segment_en : '',
                  es: this.state.dataArray[21][5] ? this.state.dataArray[21][5].text_segment_es : '',
                  zh: this.state.dataArray[21][5] ? this.state.dataArray[21][5].text_segment_zh : '',
                  tl: this.state.dataArray[21][5] ? this.state.dataArray[21][5].text_segment_tl : '',
                }
              ]
            },
            {
              segments: [
                {
                  en: this.state.dataArray[21][6] ? this.state.dataArray[21][6].text_segment_en : '',
                  es: this.state.dataArray[21][6] ? this.state.dataArray[21][6].text_segment_es : '',
                  zh: this.state.dataArray[21][6] ? this.state.dataArray[21][6].text_segment_zh : '',
                  tl: this.state.dataArray[21][6] ? this.state.dataArray[21][6].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[21][7] ? this.state.dataArray[21][7].text_segment_en : '',
                  es: this.state.dataArray[21][7] ? this.state.dataArray[21][7].text_segment_es : '',
                  zh: this.state.dataArray[21][7] ? this.state.dataArray[21][7].text_segment_zh : '',
                  tl: this.state.dataArray[21][7] ? this.state.dataArray[21][7].text_segment_tl : '',
                },
                {
                  en: this.state.dataArray[21][8] ? this.state.dataArray[21][8].text_segment_en : '',
                  es: this.state.dataArray[21][8] ? this.state.dataArray[21][8].text_segment_es : '',
                  zh: this.state.dataArray[21][8] ? this.state.dataArray[21][8].text_segment_zh : '',
                  tl: this.state.dataArray[21][8] ? this.state.dataArray[21][8].text_segment_tl : '',
                }
              ]
            }
          ],
          captions: [
            {
              en: this.state.dataArray[22][0] ? this.state.dataArray[22][0].caption_en : '',
              es: this.state.dataArray[22][0] ? this.state.dataArray[22][0].caption_es : '',
              zh: this.state.dataArray[22][0] ? this.state.dataArray[22][0].caption_zh : '',
              tl: this.state.dataArray[22][0] ? this.state.dataArray[22][0].caption_tl : '',
            },
            {
              en: this.state.dataArray[22][1] ? this.state.dataArray[22][1].caption_en : '',
              es: this.state.dataArray[22][1] ? this.state.dataArray[22][1].caption_es : '',
              zh: this.state.dataArray[22][1] ? this.state.dataArray[22][1].caption_zh : '',
              tl: this.state.dataArray[22][1] ? this.state.dataArray[22][1].caption_tl : '',
            },
            {
              en: this.state.dataArray[22][2] ? this.state.dataArray[22][2].caption_en : '',
              es: this.state.dataArray[22][2] ? this.state.dataArray[22][2].caption_es : '',
              zh: this.state.dataArray[22][2] ? this.state.dataArray[22][2].caption_zh : '',
              tl: this.state.dataArray[22][2] ? this.state.dataArray[22][2].caption_tl : '',
            },
            {
              en: this.state.dataArray[22][3] ? this.state.dataArray[22][3].caption_en : '',
              es: this.state.dataArray[22][3] ? this.state.dataArray[22][3].caption_es : '',
              zh: this.state.dataArray[22][3] ? this.state.dataArray[22][3].caption_zh : '',
              tl: this.state.dataArray[22][3] ? this.state.dataArray[22][3].caption_tl : '',
            },
            {
              en: this.state.dataArray[22][4] ? this.state.dataArray[22][4].caption_en : '',
              es: this.state.dataArray[22][4] ? this.state.dataArray[22][4].caption_es : '',
              zh: this.state.dataArray[22][4] ? this.state.dataArray[22][4].caption_zh : '',
              tl: this.state.dataArray[22][4] ? this.state.dataArray[22][4].caption_tl : '',
            },
            {
              en: this.state.dataArray[22][5] ? this.state.dataArray[22][5].caption_en : '',
              es: this.state.dataArray[22][5] ? this.state.dataArray[22][5].caption_es : '',
              zh: this.state.dataArray[22][5] ? this.state.dataArray[22][5].caption_zh : '',
              tl: this.state.dataArray[22][5] ? this.state.dataArray[22][5].caption_tl : '',
            }
          ],
          slideshow: {
            btnText: {
              en: this.state.dataArray[23][0] ? this.state.dataArray[23][0].btn_txt_en : '',
              es: this.state.dataArray[23][0] ? this.state.dataArray[23][0].btn_txt_es : '',
              zh: this.state.dataArray[23][0] ? this.state.dataArray[23][0].btn_txt_zh : '',
              tl: this.state.dataArray[23][0] ? this.state.dataArray[23][0].btn_txt_tl : '',
            },
            title: {
              en: this.state.dataArray[23][0] ? this.state.dataArray[23][0].title_en : '',
              es: this.state.dataArray[23][0] ? this.state.dataArray[23][0].title_es : '',
              zh: this.state.dataArray[23][0] ? this.state.dataArray[23][0].title_zh : '',
              tl: this.state.dataArray[23][0] ? this.state.dataArray[23][0].title_tl : '',
            },
            subheader: {
              en: this.state.dataArray[23][0] ? this.state.dataArray[23][0].subheader_en : '',
              es: this.state.dataArray[23][0] ? this.state.dataArray[23][0].subheader_es : '',
              zh: this.state.dataArray[23][0] ? this.state.dataArray[23][0].subheader_zh : '',
              tl: this.state.dataArray[23][0] ? this.state.dataArray[23][0].subheader_tl : '',
            },
            slides: [
              {
                title: {
                  en: this.state.dataArray[24][0] ? this.state.dataArray[24][0].title_en : '',
                  es: this.state.dataArray[24][0] ? this.state.dataArray[24][0].title_es : '',
                  zh: this.state.dataArray[24][0] ? this.state.dataArray[24][0].title_zh : '',
                  tl: this.state.dataArray[24][0] ? this.state.dataArray[24][0].title_tl : '',
                },
                copy: {
                  en: this.state.dataArray[24][0] ? this.state.dataArray[24][0].copy_en : '',
                  es: this.state.dataArray[24][0] ? this.state.dataArray[24][0].copy_es : '',
                  zh: this.state.dataArray[24][0] ? this.state.dataArray[24][0].copy_zh : '',
                  tl: this.state.dataArray[24][0] ? this.state.dataArray[24][0].copy_tl : '',
                },
                captions: [
                  {
                    en: this.state.dataArray[25][0] ? this.state.dataArray[25][0].caption_en : '',
                    es: this.state.dataArray[25][0] ? this.state.dataArray[25][0].caption_es : '',
                    zh: this.state.dataArray[25][0] ? this.state.dataArray[25][0].caption_zh : '',
                    tl: this.state.dataArray[25][0] ? this.state.dataArray[25][0].caption_tl : '',
                  },
                  {
                    en: this.state.dataArray[25][1] ? this.state.dataArray[25][1].caption_en : '',
                    es: this.state.dataArray[25][1] ? this.state.dataArray[25][1].caption_es : '',
                    zh: this.state.dataArray[25][1] ? this.state.dataArray[25][1].caption_zh : '',
                    tl: this.state.dataArray[25][1] ? this.state.dataArray[25][1].caption_tl : '',
                  },
                  {
                    en: this.state.dataArray[25][2] ? this.state.dataArray[25][2].caption_en : '',
                    es: this.state.dataArray[25][2] ? this.state.dataArray[25][2].caption_es : '',
                    zh: this.state.dataArray[25][2] ? this.state.dataArray[25][2].caption_zh : '',
                    tl: this.state.dataArray[25][2] ? this.state.dataArray[25][2].caption_tl : '',
                  }
                ]
              },
              {
                title: {
                  en: this.state.dataArray[26][0] ? this.state.dataArray[26][0].title_en : '',
                  es: this.state.dataArray[26][0] ? this.state.dataArray[26][0].title_es : '',
                  zh: this.state.dataArray[26][0] ? this.state.dataArray[26][0].title_zh : '',
                  tl: this.state.dataArray[26][0] ? this.state.dataArray[26][0].title_tl : '',
                },
                copy: {
                  en: this.state.dataArray[26][0] ? this.state.dataArray[26][0].copy_en : '',
                  es: this.state.dataArray[26][0] ? this.state.dataArray[26][0].copy_es : '',
                  zh: this.state.dataArray[26][0] ? this.state.dataArray[26][0].copy_zh : '',
                  tl: this.state.dataArray[26][0] ? this.state.dataArray[26][0].copy_tl : '',
                },
                captions: [
                  // dataArray27 empty
                ]
              },
              {
                title: {
                  en: this.state.dataArray[28][0] ? this.state.dataArray[28][0].title_en : '',
                  es: this.state.dataArray[28][0] ? this.state.dataArray[28][0].title_es : '',
                  zh: this.state.dataArray[28][0] ? this.state.dataArray[28][0].title_zh : '',
                  tl: this.state.dataArray[28][0] ? this.state.dataArray[28][0].title_tl : '',
                },
                copy: {
                  en: this.state.dataArray[28][0] ? this.state.dataArray[28][0].copy_en : '',
                  es: this.state.dataArray[28][0] ? this.state.dataArray[28][0].copy_es : '',
                  zh: this.state.dataArray[28][0] ? this.state.dataArray[28][0].copy_zh : '',
                  tl: this.state.dataArray[28][0] ? this.state.dataArray[28][0].copy_tl : '',
                },
                captions: [
                  {
                    en: this.state.dataArray[29][0] ? this.state.dataArray[29][0].caption_en : '',
                    es: this.state.dataArray[29][0] ? this.state.dataArray[29][0].caption_es : '',
                    zh: this.state.dataArray[29][0] ? this.state.dataArray[29][0].caption_zh : '',
                    tl: this.state.dataArray[29][0] ? this.state.dataArray[29][0].caption_tl : '',
                  },
                  {
                    en: this.state.dataArray[29][1] ? this.state.dataArray[29][1].caption_en : '',
                    es: this.state.dataArray[29][1] ? this.state.dataArray[29][1].caption_es : '',
                    zh: this.state.dataArray[29][1] ? this.state.dataArray[29][1].caption_zh : '',
                    tl: this.state.dataArray[29][1] ? this.state.dataArray[29][1].caption_tl : '',
                  },
                  {
                    en: this.state.dataArray[29][2] ? this.state.dataArray[29][2].caption_en : '',
                    es: this.state.dataArray[29][2] ? this.state.dataArray[29][2].caption_es : '',
                    zh: this.state.dataArray[29][2] ? this.state.dataArray[29][2].caption_zh : '',
                    tl: this.state.dataArray[29][2] ? this.state.dataArray[29][2].caption_tl : '',
                  },
                  {
                    en: this.state.dataArray[29][3] ? this.state.dataArray[29][3].caption_en : '',
                    es: this.state.dataArray[29][3] ? this.state.dataArray[29][3].caption_es : '',
                    zh: this.state.dataArray[29][3] ? this.state.dataArray[29][3].caption_zh : '',
                    tl: this.state.dataArray[29][3] ? this.state.dataArray[29][3].caption_tl : '',
                  }
                ]
              }
            ]
          }
        }
      ]
    })
    this.setState ({
      dataLoaded: true
    })
  }

  _storyTouch() {
    this.setState({
      dateLastTouch: new Date()
    })
  }

  componentDidMount() {
    this._getData(0)
    this.setState({
      dateLastTouch: new Date()
    })
    setInterval(() => this._inactivityCheck(), 5000)
  }

  render() {
    return (
      <div id="app" className={this.state.preview ? 'preview' : ''} >
        <div id="container-translator">
          <Translator
            currentLanguage = {this.state.currentLanguage}
            handlerSelectLanguage={this.handlerSelectLanguage}
            handlerSelectCredits={this.handlerSelectCredits}
          />
        </div>
        <div id="container-credits"
          className={this.state.showCredits ? '' : 'hide-anim'}>
          <Credits
            currentLanguage = {this.state.currentLanguage}
            showCredits = {this.state.showCredits}
            handlerCloseCredits={this.handlerCloseCredits}
            dataCredits={this.state.dataCredits}
           />
        </div>
        <div
          id="container-menu"
          className={((this.state.currentIntro !== null) || (this.state.currentStory !== null)) ? 'hide' : ''}
          >
          <Menu
            currentLanguage = {this.state.currentLanguage}
            currentStory = {this.state.currentStory}
            currentOutro = {this.state.currentOutro}
            handlerSelectStory = {this.handlerSelectStory}
            dataTitle = {this.state.dataTitle}
            dataSubheader = {this.state.dataSubheader}
            dataMenu = {this.state.dataMenu}
          />
        </div>
        <div id="container-intro" className={this.state.currentIntro === null ? 'hide' : ''}>
          <Intro
            currentIntro = {this.state.currentIntro}
            handlerInitStory = {this.handlerInitStory}
          />
        </div>
        <div id="container-story" className={this.state.currentStory === null ? '' : ''}>
          <Story
            currentLanguage = {this.state.currentLanguage}
            currentStory = {this.state.currentStory}
            currentOutro = {this.state.currentOutro}
            handlerCloseStory = {this.handlerCloseStory}
            handlerInitOutro = {this.handlerInitOutro}
            handlerStoryTouch = {this.handlerStoryTouch}
            dataInstructions = {this.state.dataInstructions}
            dataStories = {this.state.dataStories}
          />
        </div>
        <div id="container-outro" className={this.state.currentOutro === null ? 'hide' : ''}>
          <Outro
            currentOutro = {this.state.currentOutro}
            handlerRestartMenu = {this.handlerRestartMenu}
          />
        </div>
      </div>
    )
  }
}

export default App
