import FormData from 'form-data';
import { X2jOptionsOptional } from 'fast-xml-parser';
export declare type Configs = {
    [conf: string]: string;
};
export declare type Form = {
    [conf: string]: string;
};
export default class WebService {
    apiKey: string;
    configs: RequestInit;
    bipbopLimit: ((fn: () => Promise<Response>) => Promise<Response>);
    constructor(apiKey?: string, userLimit?: number | null, configs?: Configs);
    private formData;
    private object;
    request(query: string, form?: Form | FormData, urlData?: Form): Promise<Response>;
    static parse(xmlStr: string, options?: X2jOptionsOptional): any;
}
