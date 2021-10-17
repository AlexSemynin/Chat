import { makeAutoObservable } from 'mobx'
import {} from 'mobx-react'
import IUser from 'ModelsDto/User';
import AuthService from '../services/AuthService';
import { StorageHelper } from '../services/StorageHelper';
import MainStore from './MainStore';

export default class AuthStore{

    private _mainStore: MainStore;
    private _service: AuthService;

    constructor(mainStore: MainStore, service: AuthService){
        this._mainStore = mainStore;
        this._service = service;
        makeAutoObservable(this);
    }

    public get isLogin(): IUser | null {
        return StorageHelper.get({name: "user"});
    }

    public async login(login: string, password: string): Promise<void> {
        
        const user = await this._service.login(login, password);
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