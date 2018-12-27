import get from 'lodash/get';
import pickBy from 'lodash/pickBy';
import Parser from 'fast-xml-parser';

import Exception from './exception';

const pickValid = obj => pickBy(obj, x => (x !== null && typeof x !== 'undefined'));

export default class Subkey {
  constructor(webService, service = 'BIPBOPAPIKEY') {
    this.webService = webService;
    this.service = service;
  }

  static parser(request) {
    return request.then(response => response.text())
      .then(response => Parser.parse(response, {
        parseNodeValue: false,
        parseAttributeValue: false,
        ignoreAttributes: false,
        attributeNamePrefix: '@',
      }))
      .then((response) => {
        const message = get(response, 'BPQL.header.exception');
        if (message) {
          throw new Exception({
            message,
            code: Number.parseInt(get(response, 'BPQL.header.@exception.code'), 10),
          });
        }

        return get(response, 'BPQL.body');
      });
  }

  create(alias, password = null, {
    name, cpf, cnpj, email, phone, zipcode,
  } = {}) {
    return Subkey.parser(this.webService.request(`INSERT INTO '${this.service}'.'SUBKEY'`, pickValid({
      alias, password, name, cpf, cnpj, email, phone, zipcode,
    })));
  }

  enable(username) {
    return Subkey.parser(this.webService.request(`SELECT FROM '${this.service}'.'ENABLE'`, {
      username,
    }));
  }

  disable(username) {
    return Subkey.parser(this.webService.request(`SELECT FROM '${this.service}'.'DISABLE'`, {
      username,
    }));
  }

  changeStatus(username) {
    return Subkey.parser(this.webService.request(`SELECT FROM '${this.service}'.'CHANGESTATUS'`, {
      username,
    }));
  }

  list({
    skip, limit, username, last,
  } = {}) {
    return Subkey.parser(this.webService.request(`SELECT FROM '${this.service}'.'LIST'`, pickValid({
      skip, limit, username, last,
    })));
  }
}
