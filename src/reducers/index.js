import { combineReducers } from 'redux'

import FileState from './file-reducer'
import TreeState from './tree-reducer'

export default combineReducers({ FileState, TreeState })
