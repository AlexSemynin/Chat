import { LinearGauge } from "devextreme-react";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { StorageHelper } from "../services/StorageHelper";
import MainStore from "./MainStore";
import themes from "devextreme/ui/themes";


export default class LayoutStore {
    private _mainStore;

    constructor(mainStore: MainStore) {
        makeObservable(this);
        this._mainStore = mainStore;
        this.Theme = <dxThemes>StorageHelper.get({ name: "layoutSettings" }) ?? dxThemes.Dark; //при задании начальной темы - смотри ./public/index.html: head: link "dx-theme": data-active: true

        themes.current(this.Theme);
        StorageHelper.set({name:"layoutSettings", data: this.Theme});
        //document.querySelector('body')?.style.setProperty('--linearGradient', this.Theme==dxThemes.Light ? grad.day : grad.night);
    }

    @observable
    Theme: dxThemes;

    @action
    SwitchTheme(theme: dxThemes) {
        if (theme == this.Theme)
            return;

        runInAction(()=>{
            this.Theme = theme;
            StorageHelper.set({name:"layoutSettings", data: theme});
            themes.current(this.Theme);
        })
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
        runInAction(()=>{
            StorageHelper.set({name:"layoutSettings", data: this.Theme});
            themes.current(this.Theme);
        })

    }

}

export enum dxThemes {
    Dark = "generic.dark",
    Light = "generic.light"
}