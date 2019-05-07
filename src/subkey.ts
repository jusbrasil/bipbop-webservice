import get from 'lodash/get';
import Exception from './exception';
import WebService, { Form } from './web-service';
import forEach from 'lodash/forEach';

const pickValid = (obj: {[id: string]: string | undefined | null}): Form => {
  const f: Form = {};
  forEach(obj, (v, k) => {
    if (v === null) return;
    if (typeof v === 'undefined') return;
    f[k] = v;
  });
  return f;
}

type RegistrationData = {
  name?: string,
  cpf?: string,
  cnpj?: string,
  email?: string,
  phone?: string,
  zipcode?: string,
};

type ListParameters = {
  skip?: number,
  limit?: number,
  username?: string,
  last?: string,
};

export default class Subkey {
	public webService: WebService;
	public service: string;

  constructor(webService: WebService, service: string = 'BIPBOPAPIKEY') {
    this.webService = webService;
    this.service = service;
  }

  private static async parser(request: Promise<Response> | Response) : Promise<any> {
    const response = await Promise.resolve(request);
    const responseBody = await response.text();
    const parsedContent = WebService.parse(responseBody, {
      parseNodeValue: false,
      parseAttributeValue: false,
      ignoreAttributes: false,
      attributeNamePrefix: '@',
    });
    const message = get(parsedContent, 'BPQL.header.exception');
    if (message) {
      throw Exception.factory(message, Number.parseInt(get(parsedContent, 'BPQL.header.@exception.code'), 10));
    }
    return get(parsedContent, 'BPQL.body');
  }

  create(alias: string, password: string | null = null, { name, cpf, cnpj, email, phone, zipcode }: RegistrationData = {}) {
    return Subkey.parser(this.webService.request(`INSERT INTO '${this.service}'.'SUBKEY'`, pickValid({
      alias, password, name, cpf, cnpj, email, phone, zipcode,
    })));
  }

  enable(username: string) {
    return Subkey.parser(this.webService.request(`SELECT FROM '${this.service}'.'ENABLE'`, {
      username,
    }));
  }

  disable(username: string) {
    return Subkey.parser(this.webService.request(`SELECT FROM '${this.service}'.'DISABLE'`, {
      username,
    }));
  }

  changeStatus(username: string) {
    return Subkey.parser(this.webService.request(`SELECT FROM '${this.service}'.'CHANGESTATUS'`, {
      username,
    }));
  }

  list({ skip, limit, username, last }: ListParameters = {}) {
    return Subkey.parser(this.webService.request(`SELECT FROM '${this.service}'.'LIST'`, pickValid({
      skip: skip ? skip.toString() : null, limit: limit ? limit.toString() : null, username, last,
    })));
  }
}
