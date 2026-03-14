import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import likesReducer from './reducers/likesSlice'
import commentsReducer from './reducers/commentsSlice'

const rootReducer = combineReducers({
  user: userReducer,
  likes: likesReducer,
  comments: commentsReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']