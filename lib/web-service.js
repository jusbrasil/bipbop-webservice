import FormData from 'form-data';
import fetch from 'cross-fetch';
import objectAssign from 'object-assign';
import querystring from 'querystring';
import Parser from 'fast-xml-parser';
import promiseLimit from 'promise-limit';

const FREE_APIKEY = '6057b71263c21e4ada266c9d4d4da613';

const bipbopLimit = promiseLimit(5);

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
    return bipbopLimit(() => fetch(...this.object(q, form, urlData, (formContent) => {
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
