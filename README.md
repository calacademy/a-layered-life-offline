# a-layered-life-offline
React web application for offline version of "A Layered Life" touchscreen interactive in "Giants
of Land and Sea" exhibit.

## Installation

Clone a-layered-life-offline repo locally.

Unpack node modules via Yarn:

```
$ cd a-layered-life-offline
$ yarn
```

Find fonts.zip, slides.zip, animations.zip, and data.zip files in team Google Drive:
```
+-- DME: Web & Interactive
|   +-- Exhibit Interactives
|   |   +-- Giants of Land and Sea Exhibit
|   |   |   +-- A Layered Life Static/Offline
|   |   |   |   +-- Technical
```

+ Unzip and copy 'fonts' directory into local root 'src' directory.
+ Unzip and copy 'slides' directory into local root 'src/img' directory.
+ Unzip and copy 'animations' directory into local root 'public' directory.
+ Unzip and copy 'data' directory into local root 'public' directory.

, and
unzip and copy  'images,' and 'movies' directories into local root
'static' directory.

## Development and Production Builds

Webpack build init scripts in package.json. Webpack config for 'start' script
automatically rebuilds to '/build' on src edit. Run local webserver on /build
dir for dev work (browser auto-refresh in place). While 'start' script is
running, Webpack will use development variable in .env.development file (see
  above). Stop 'start' script and run 'build' script to build app to /build
  using production variable in .env.production file (prior to deployment).

```
yarn start
yarn build
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
