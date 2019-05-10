import FormData from 'form-data';
import fetch from 'cross-fetch';
import querystring from 'querystring';
import managerPromise from 'promise-limit';
import { DOMParser } from 'xmldom';
import ExceptionUnknown from './exception-unknown';
import ErrorCodes from './error-codes';
import Exceptions from './exceptions';

/**
 * Chave de API livre ao público para comunicação anônima
 */
const defaultApiKey: string = '6057b71263c21e4ada266c9d4d4da613';

export type Form = {[conf: string]: string};

type FormPrepare = (data: Form | FormData | undefined | null) => FormData | undefined;

/**
 * A classe WebService é responsável para que aplicações possam
 * se comunicar com a BIPBOP com facilidade usando o esquema fetch
 * https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch
 * 
 * @example
 * ```typescript
 *import WebService from 'bipbop-webservice/web-service';
 *
 *const maxClients = 10;
 *const fetchOptions: RequestInit = {}; // https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch
 *const apiKey = '<secret>'; // Chave de API da BIPBOP (https://www.bipbop.com.br)
 *
 *new WebService(apiKey, maxClients, fetchOptions)
 *  .request("SELECT FROM 'INFO'.'INFO'")
 *  .then(r => r.text())
 *  .then(r => console.log(r));
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

  private static formData(f: Form | FormData | null | undefined) : FormData | undefined {
    if (f === null || typeof f === "undefined") return undefined;
    if (f instanceof FormData) return f;
    if (!Object.keys(f).length) return undefined;
    const formData = new FormData();
    Object.keys(f).forEach((key) => formData.append(key, f[key]));
    return formData;
  }

  private object(query: string, form?: Form | FormData, urlData?: Form, prepareFormData: FormPrepare = WebService.formData) : [string, RequestInit] {
    return [`https://irql.bipbop.com.br/?${querystring.stringify({
      apiKey: this.apiKey,
      q: query,
      ...urlData
    })}`, {
      ...this.configs, 
      method: form && Object.keys(form).length ? 'POST' : 'GET',
      body: prepareFormData(form),
    }];
  }

  private async validate(responsePromise: Promise<Response> | Response) : Promise<Response> {
    const response = await Promise.resolve(responsePromise);
    if (!response.ok) {
      const xml = await response.text();
      const domParser = new DOMParser();
      const dom = domParser.parseFromString(xml);  
      if (!WebService.throwException(dom))
        throw ExceptionUnknown.factory('Unknown exception', ErrorCodes.E_UNKNOWN, false);
    }
    return response;
  }

  static throwException(dom: Document) : boolean {
    const tagExceptions = dom.getElementsByTagName('exception');
    if (!tagExceptions.length) return false;

    const exceptions = Array.from(tagExceptions).filter((node: Element) => {
      const parentNode = node.parentNode;
      if (parentNode === null) return false;
      if (parentNode.nodeName !== 'header') return false;
      if (parentNode.parentNode === null) return false;
      if (parentNode.parentNode.nodeName !== 'BPQL') return false;
      if (parentNode.parentNode.parentNode !== dom) return false;
      return true;
    });

    if (!exceptions.length) return false;

    const exception = exceptions.pop();
    if (!exception) return false;

    const code = exception.getAttribute('code');
    const exceptionCode: ErrorCodes = code ? parseInt(code, 10) : ErrorCodes.E_UNKNOWN;
    const ExceptionClass = exceptionCode in Exceptions ? Exceptions[exceptionCode] : ExceptionUnknown;

    throw ExceptionClass.factory(
      exception.textContent === null ? undefined : exception.textContent,
      exceptionCode,
      exception.getAttribute('push') === 'true');
  }

  /**
   * Realiza uma requisição
   * 
   * @param query Consulta a BIPBOP (ex.: SELECT FROM 'INFO'.'INFO')
   * @param form Parâmetros da consulta - POST
   * @param urlData Parâmetros da consulta - GET
   */
  request(query: string, form: Form | FormData = {}, urlData: Form = {}) : Promise<Response> {
    return this.bipbopLimit(() => this.validate(fetch(...this.object(query, form, urlData))));
  }

  /**
   * Faz o parser de uma requisição BIPBOP
   * @param responsePromise Request inicializado
   * @returns No caso de um XML retorna um Document (https://developer.mozilla.org/pt-BR/docs/Web/API/Document), se não, um tipo qualquer.
   */
  static async parse(responsePromise: Promise<Response> | Response) : Promise<any> {
    const response = await Promise.resolve(responsePromise);
    const contentType = response.headers.get('content-type') || '';
    const type = (contentType.split(';', 2).shift() || '').split('/').pop() || '';
    const xml = await response.text();
    switch (type) {
      case 'json': return JSON.parse(xml);
      case 'xml': return new DOMParser().parseFromString(xml);
    }
    throw ExceptionUnknown.factory('Unable to determine response type', ErrorCodes.E_UNKNOWN, false);
  }
}
