import { LinearGauge } from "devextreme-react";
import { action, computed, makeObservable, observable } from "mobx";
import MainStore from "./MainStore";

export default class LayoutStore {
    private _mainStore;

    constructor(mainStore: MainStore) {
        makeObservable(this);
        this._mainStore = mainStore;
        this.Theme = <dxThemes>localStorage.getItem('theme') ?? dxThemes.Dark; //при задании начальной темы - смотри ./public/index.html: head: link "dx-theme": data-active: true
        localStorage.setItem('theme', this.Theme);
    }

    @observable
    Theme: dxThemes;

    @action
    SwitchTheme(theme: dxThemes) {
        if (theme == this.Theme)
            return;

        this.Theme = theme;
        localStorage.setItem('theme', theme);
    }

    @action
    ToggleTheme() {
        switch (this.Theme) {
            case dxThemes.Dark:
                this.Theme = dxThemes.Light;
                break;
            case dxThemes.Light:
                this.Theme = dxThemes.Dark;
                break;
            default:
                this.Theme = dxThemes.Light;
                break;
        }
        localStorage.setItem('theme', this.Theme);
    }

}

export enum dxThemes {
    Dark = "generic.dark",
    Light = "generic.light"
}