﻿import LayoutStore from "./layoutStore";
import AuthStore from "./AuthStore";
import { History } from 'history/index';
import { createBrowserHistory } from 'history';


export default class MainStore {
    public readonly layoutStore: LayoutStore;
    public readonly locationInfo: History;
    public readonly authStore: AuthStore;

    constructor() {
        this.layoutStore = new LayoutStore(this);
        this.locationInfo = createBrowserHistory();
        this.authStore = new AuthStore(this);
    }
}