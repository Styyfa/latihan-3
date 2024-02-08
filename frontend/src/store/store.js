import { configureStore } from '@reduxjs/toolkit'
import features from '../features/redux.js'

const store = configureStore({
    reducer: {
        auth: features
    }
})

console.log(store.getState())

export default store