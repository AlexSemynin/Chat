import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import './Main.css';
import { App } from './App';
import themes from "devextreme/ui/themes";
import MainStore from './stores/MainStore';

const mainStore = new MainStore();

const storeContext = React.createContext(mainStore);
export const useStores = () => React.useContext(storeContext);

//themes.initialized(() =>
ReactDOM.render(
    <storeContext.Provider value={{...mainStore}}>
        <Router history={mainStore.locationInfo}>
            <App />
        </Router>
    </storeContext.Provider>,
    document.getElementById('root')
)
//);