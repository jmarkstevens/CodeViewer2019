import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import './app.scss'
import './styles/twilightj.css'

import AppStore from './app-store'
import AppComponent from './components/app'

ReactDom.render(
  <Provider store={AppStore}>
    <AppComponent />
  </Provider>,
  document.getElementById('react-app')
)
