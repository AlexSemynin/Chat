import IUser from "ModelsDto/User";
import { StorageHelper } from "./StorageHelper";


export default class BaseService {
    protected baseUrl = "/api";

    public async Get<T>(path: string, headers?: Headers): Promise<T>{
        // let headers = externalHeaders ?? new Headers();
        // this.SetDefaultHeaders(headers);
        try{
            const responce = headers ?
                await fetch(this.baseUrl + path, {headers})
                : await fetch(this.baseUrl);
            if(!responce.ok){
                if(responce.status === 401)
                    throw new Error("Ошибка авторизации");
                const errorMessage = await responce.text();
                throw new Error(`Ошибка в запросе\n ${errorMessage}`);
            }
            return <T> await responce.json();
        }catch(e: any){
            throw new Error(e);
        }
    }

    public async Post<T>(path: string, body: BodyInit, externalHeaders?: Headers): Promise<T>{
        let headers = externalHeaders ?? new Headers();
        this.SetDefaultHeaders(headers);
        try {
            const responce = await fetch(this.baseUrl + path, {
                method: "POST",
                headers,
                body
            });
            if(!responce.ok){
                if(responce.status === 401)
                    throw new Error("Ошибка авторизации");
                const errorMessage = await responce.text();
                throw new Error(`Ошибка в запросе\n ${errorMessage}`);
            }
            return <T> await responce.json();
        } catch(e: any) {
            throw new Error(e);
        }
    }


    private SetDefaultHeaders(currentHeaders: Headers){
        this.SetAuthHeader(currentHeaders);
        this.SetDefaultContentTypeHeader(currentHeaders);
    }

    private SetAuthHeader(headers: Headers){
        if(!headers.get("Authorization")){
            const currentUser: IUser = StorageHelper.get({name: "user"});
            if(currentUser !== null)
            headers.append("Authorization", `Bearer ${currentUser.AccessToken}`);
        }
    }

    private SetDefaultContentTypeHeader(headers: Headers){
        if(!headers.get("Content-Type")){
            headers.append("Content-Type", "application/json");
        }
    }
}