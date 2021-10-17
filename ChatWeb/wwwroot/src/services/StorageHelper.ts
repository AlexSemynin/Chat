import IUser from "ModelsDto/User";
import { dxThemes } from "stores/layoutStore";


type StorageType = 
    | { name: 'layoutSettings', data?: dxThemes }
    | { name: 'user', data?: IUser };

export class StorageHelper{
    private static readonly storage = window.localStorage;

    static get<T>(type: StorageType): T{
        const data = this.storage.getItem(type.name);
        return data ? JSON.parse(data) : null;
        // switch(type.name){
        //     case "layoutSettings":
        //         return data ? <dxThemes>JSON.parse(data) : null;
        //     case "user":
        //         return data ? <IUser>JSON.parse(data) : null;
        //     default:
        //         return null;  
        //}
    }

    static set(type: StorageType){
        if(!type.data)
            return;
        this.storage.setItem(type.name, JSON.stringify(type.data));
    }

    static remove(type: StorageType){
        const obj = this.storage.getItem(type.name);
        if(!obj)
            return;
        this.storage.removeItem(type.name);
    }

}
