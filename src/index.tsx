import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { setupStore } from './store/store'
// import { Action } from '@reduxjs/toolkit'
// import {createStore, applyMiddleware} from 'redux'
// import { rootReducer } from './store/reducers/rootReduser'
// import thunk from 'redux-thunk'

// const localStorageMiddleware = ({ getState }: any) => {
//     return (next: any) => (action: Action) => {
//         const result = next(action)
//         localStorage.setItem('appState', JSON.stringify(getState()))
//         return result
//     }
// }

// const reHydrateStore = () => {
//     if (localStorage.getItem('appState') !== null) {
//         return JSON.parse(localStorage.getItem('appState') || '')
//     }
// }

// const store = createStore(
//     rootReducer,
//     reHydrateStore(),
//     applyMiddleware(thunk, localStorageMiddleware)
// )

// store.subscribe(() => {
//     localStorage.setItem('appState', JSON.stringify(store.getState()))
// })
const store = setupStore(); 

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </Provider>
)
