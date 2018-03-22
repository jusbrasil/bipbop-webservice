import FormData from 'form-data';
import fetch from 'cross-fetch';
import objectAssign from 'object-assign';
import querystring from 'querystring';
import Parser from 'fast-xml-parser';

const FREE_APIKEY = '6057b71263c21e4ada266c9d4d4da613';

export default class WebService {
  constructor(apiKey = FREE_APIKEY) {
    this.apiKey = apiKey;
  }

  object(q, form = {}, urlData = {}, prepareFormData = formContent => formContent) {
    return [`https://irql.bipbop.com.br/?${querystring.stringify(objectAssign(urlData, {
      apiKey: this.apiKey,
      q,
    }))}`, objectAssign({
      method: Object.keys(form).length ? 'POST' : 'GET',
      body: prepareFormData(form),
    })];
  }

  request(q, form = {}, urlData = {}) {
    return fetch(...this.object(q, form, urlData, formContent => new FormData(formContent)));
  }

  static parse(xmlStr) {
    return Parser.parse(xmlStr);
  }
}
