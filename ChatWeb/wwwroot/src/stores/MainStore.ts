import LayoutStore from "./layoutStore";
import { History } from 'history/index';
import { createBrowserHistory } from 'history';


export default class MainStore {
    public readonly LayoutStore: LayoutStore;
    public readonly LocationInfo: History;

    constructor() {
        this.LayoutStore = new LayoutStore(this);
        this.LocationInfo = createBrowserHistory();
    }
}