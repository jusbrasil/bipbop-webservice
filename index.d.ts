import FormData from 'form-data';
export declare type Form = {
    [conf: string]: string;
};
/**
 * A classe WebService é responsável para que aplicações possam
 * se comunicar com a BIPBOP com facilidade usando o esquema fetch
 * https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch
 *
 * ```ts
 * import WebService from 'bipbop-webservice'
 * const maxClients: number = 10;
 * const fetchOptions: RequestInit = {}; // https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch
 * const webService: WebService = new WebService('bipbop-apikey', maxClients, fetchOptions);
 * const response: Response = await webService.request("SELECT FROM 'INFO'.'INFO'");
 * const responseBody: string = await response.text();
 * console.log(responseBody);
 * ```
 */
export default class WebService {
    configs: RequestInit;
    apiKey: string;
    private bipbopLimit;
    /**
     * Inicializa uma consulta
     *
     * @param apiKey Chave de API da BIPBOP (https://www.bipbop.com.br)
     * @param userLimit Quantidade máxima de consultas simultâneas
     * @param configs Configurações do fetch (https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch)
     */
    constructor(apiKey?: string, userLimit?: number | null, configs?: RequestInit);
    private static formData;
    private object;
    private validate;
    private throwException;
    /**
     * Realiza uma requisição
     *
     * @param query Consulta a BIPBOP (ex.: SELECT FROM 'INFO'.'INFO')
     * @param form Parâmetros da consulta - POST
     * @param urlData Parâmetros da consulta - GET
     */
    request(query: string, form?: Form | FormData, urlData?: Form): Promise<Response>;
    /**
     * Faz o parser de uma requisição BIPBOP
     * @param responsePromise Request inicializado
     * @returns No caso de um XML retorna um Document (https://developer.mozilla.org/pt-BR/docs/Web/API/Document), se não, um tipo qualquer.
     */
    static parse(responsePromise: Promise<Response> | Response): Promise<any>;
}
