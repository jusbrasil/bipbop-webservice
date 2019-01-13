import FormData from 'form-data';
import fetch from 'cross-fetch';
import objectAssign from 'object-assign';
import querystring from 'querystring';
import Parser from 'fast-xml-parser';
import { managerPromise } from 'promise-limit-manager';

const FREE_APIKEY = '6057b71263c21e4ada266c9d4d4da613';

const { defaultLimit, promiseLimit } = managerPromise('bipbopWebService');

defaultLimit(20);

export default class WebService {
  constructor(apiKey = FREE_APIKEY, userLimit = null, configs = {}) {
    const limit = (userLimit !== null && userLimit > 10) ? 10 : userLimit;
    this.bipbopLimit = promiseLimit(limit);
    this.apiKey = apiKey;
    this.configs = configs;
  }

  object(q, form = {}, urlData = {}, prepareFormData = formContent => formContent) {
    return [`https://irql.bipbop.com.br/?${querystring.stringify(objectAssign(urlData, {
      apiKey: this.apiKey,
      q,
    }))}`, objectAssign({}, this.configs, {
      method: Object.keys(form).length ? 'POST' : 'GET',
      body: prepareFormData(form),
    })];
  }

  request(q, form = {}, urlData = {}) {
    return this.bipbopLimit(() => fetch(...this.object(q, form, urlData, (formContent) => {
      const formData = new FormData();
      Object.keys(formContent).forEach((key) => {
        formData.append(key, formContent[key]);
      });
      return formData;
    })));
  }

  static parse(xmlStr, options = {
    parseNodeValue: false,
    parseAttributeValue: false,
    attributeNamePrefix: '@',
  }) {
    return Parser.parse(xmlStr, options);
  }
}
