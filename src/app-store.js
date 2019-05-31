import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import { startWs, wsMiddleware } from './actions'
import CombinedState from './reducers'

const middleware = [thunkMiddleware, wsMiddleware]

const useLogger = 0
if (useLogger) middleware.push(logger)

const store = createStore(CombinedState, applyMiddleware(...middleware))

startWs(store)

// store.dispatch({ type: 'ApiReadTree' })
store.dispatch({ type: 'ApiGetTreeData' })

export default store
