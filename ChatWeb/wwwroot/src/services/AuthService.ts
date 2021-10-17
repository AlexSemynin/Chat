import IUser from "../ModelsDto/User";
import BaseService from "./BaseService";

export default class AuthService extends BaseService {
    
    public login(login: string, password: string) : Promise<IUser> {
        return super.PostAuth("/login", JSON.stringify({
            Login: login,
            Password: password
        }));
    }

    public register(login: string, password: string, shortName: string, birthDay: Date) : Promise<boolean> {
        return super.PostAuth("/register", JSON.stringify({
            Login: login,
            Password: password,
            ShortName: shortName,
            BirthDay: birthDay, //todo: подумать насчет UTF и обменом временем в целом
        }));
    }


}