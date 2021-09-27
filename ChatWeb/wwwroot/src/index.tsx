import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import './Main.css';
import { App } from './App';
import themes from "devextreme/ui/themes";
import MainStore from './stores/MainStore';

const mainStore = new MainStore();

//themes.initialized(() =>
ReactDOM.render(
    <Provider MainStore={mainStore} {...mainStore}>
        <Router history = {mainStore.LocationInfo}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)
//);