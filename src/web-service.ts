import FormData from 'form-data';
import fetch from 'cross-fetch';
import querystring from 'querystring';
import managerPromise from 'promise-limit';

const defaultApiKey: string = '6057b71263c21e4ada266c9d4d4da613';

export type Configs = {[conf: string]: string};
export type Form = {[conf: string]: string};

type FormPrepare = (data: Form | FormData) => FormData | null;


export default class WebService {
	public apiKey: string;
	public configs: RequestInit;
  public bipbopLimit: ((fn: () => Promise<Response>) => Promise<Response>)

  constructor(apiKey: string = defaultApiKey, userLimit: number | null = 5, configs: Configs = {}) {
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

  request(query: string, form: Form | FormData = {}, urlData: Form = {}) : Promise<Response> {
    return this.bipbopLimit(() => fetch(...this.object(query, form, urlData)));
  }
}
