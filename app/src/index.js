import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store/store'

import Router from './router/Router'

import './assets/style.scss'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </Provider>
    )
}

render(<App />, document.getElementById('app'));

if (module.hot) {
    module.hot.accept();
}