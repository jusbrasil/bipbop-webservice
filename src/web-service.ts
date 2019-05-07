import FormData from 'form-data';
import fetch from 'cross-fetch';
import querystring from 'querystring';
import managerPromise from 'promise-limit';

/**
 * Chave de API livre ao público para comunicação anônima
 */
const defaultApiKey: string = '6057b71263c21e4ada266c9d4d4da613';

export type Form = {[conf: string]: string};

type FormPrepare = (data: Form | FormData) => FormData | null;

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
	public configs: RequestInit;
  public apiKey: string;

  private bipbopLimit: ((fn: () => Promise<Response>) => Promise<Response>)

  /**
   * Inicializa uma consulta 
   * 
   * @param apiKey Chave de API da BIPBOP (https://www.bipbop.com.br)
   * @param userLimit Quantidade máxima de consultas simultâneas
   * @param configs Configurações do fetch (https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch)
   */
  constructor(apiKey: string = defaultApiKey, userLimit: number | null = 5, configs: RequestInit = {}) {
    let limit = userLimit !== null ? (userLimit > 10 ? 10 : userLimit) : 10;
    this.bipbopLimit = managerPromise<Response>(limit);
    this.apiKey = apiKey;
    this.configs = configs;
  }

  private formData(f: Form | FormData) : FormData {
    if (f instanceof FormData) return f;

    const formData = new FormData();
    Object.keys(f).forEach((key) => formData.append(key, f[key]));
    return formData;
  }

  private object(query: string, form: Form | FormData = {}, urlData: Form = {}, prepareFormData: FormPrepare = this.formData) : [string, RequestInit] {
    return [`https://irql.bipbop.com.br/?${querystring.stringify({
      apiKey: this.apiKey,
      q: query,
      ...urlData
    })}`, {
      ...this.configs, 
      method: Object.keys(form).length ? 'POST' : 'GET',
      body: prepareFormData(form),
    }];
  }

  /**
   * Realiza uma requisição
   * 
   * @param query Consulta a BIPBOP (ex.: SELECT FROM 'INFO'.'INFO')
   * @param form Parâmetros da consulta - POST
   * @param urlData Parâmetros da consulta - GET
   */
  request(query: string, form: Form | FormData = {}, urlData: Form = {}) : Promise<Response> {
    return this.bipbopLimit(() => fetch(...this.object(query, form, urlData)));
  }
}
