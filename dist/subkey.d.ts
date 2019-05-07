import WebService from './web-service';
declare type RegistrationData = {
    name?: string;
    cpf?: string;
    cnpj?: string;
    email?: string;
    phone?: string;
    zipcode?: string;
};
declare type ListParameters = {
    skip?: number;
    limit?: number;
    username?: string;
    last?: string;
};
export default class Subkey {
    webService: WebService;
    service: string;
    constructor(webService: WebService, service?: string);
    private static parser;
    create(alias: string, password?: string | null, { name, cpf, cnpj, email, phone, zipcode }?: RegistrationData): Promise<any>;
    enable(username: string): Promise<any>;
    disable(username: string): Promise<any>;
    changeStatus(username: string): Promise<any>;
    list({ skip, limit, username, last }?: ListParameters): Promise<any>;
}
export {};
