import LayoutStore from "./layoutStore";
import { History } from 'history/index';
import { createBrowserHistory } from 'history';


export default class MainStore {
    public readonly layoutStore: LayoutStore;
    public readonly locationInfo: History;

    constructor() {
        this.layoutStore = new LayoutStore(this);
        this.locationInfo = createBrowserHistory();
    }
}