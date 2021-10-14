import { makeAutoObservable } from 'mobx'
import {} from 'mobx-react'
import IUser from 'ModelsDto/User';
import { StorageHelper } from '../services/StorageHelper';
import MainStore from './MainStore';

export default class AuthStore{

    private _mainStore: MainStore;

    constructor(mainStore: MainStore){
        this._mainStore = mainStore;
        makeAutoObservable(this);
    }

    public get isLogin(): IUser | null {
        return StorageHelper.get({name: "user"});
    }

    public login(): void{
        const user: IUser = {
            Id:"1",
            Email: "alex.semynin97@mail.ru",
            AccessToken: "cjnadsufh1437",
            ShortName: "superUser",
        };
        StorageHelper.set({name:"user", data: user})
    }
    
    public loguot(): void{
        const user = StorageHelper.get({name: "user"});
        if(!user)
            throw new Error();
        StorageHelper.remove({name: "user"});
    }

    public register(){

    }


}