import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import './app.scss'

import AppStore from './App.Store'
import AppComponent from './components/app'

ReactDom.render(
  <Provider store={AppStore}>
    <AppComponent />
  </Provider>,
  document.getElementById('react-app')
)
