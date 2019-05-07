import map from 'lodash/map';
import pickBy from 'lodash/pickBy';
import WebService, { Form } from './web-service';

const PUSH_APPEND_REGEX: RegExp = /^push/i;

export enum PushParameters {
  callback = 'pushCallback',
  juristekCallback = 'juristekCallback',
  at = 'pushAt',
  document  = 'pushDocument',
  documentCharset  = 'pushDocumentCharset',
  documentContentType  = 'pushDocumentContentType',
  everyCase  = 'pushEveryCase',
  expire  = 'pushExpire',
  id  = 'pushId',
  interval  = 'pushInterval',
  label  = 'pushLabel',
  locked  = 'pushLocked',
  maxCallbackTrys  = 'pushMaxCallbackTrys',
  maxVersion  = 'pushMaxVersion',
  priority  = 'pushPriority',
  query  = 'pushQuery',
  tags  = 'pushTags',
  tryIn  = 'pushTryIn',
  version  = 'pushVersion',
  webSocketDeliver  = 'pushWebSocketDeliver',
  weekdays  = 'pushWeekdays',
};

export default class Push {
		public ws: WebService;
		public pushController: string;

  constructor(ws : WebService, pushController: string = 'PUSH') {
    this.ws = ws;
    this.pushController = pushController;
  }

  private request(method: string, table: string, form: Form = {}) : Promise<Response> {
    const query = `${method} '${this.pushController}'.'${table}'`;
    return this.ws.request(query, form);
  }

  static filterPush(filter: Form) : Form {
    const newLocal: Form = {}
    map(filter, (v: string, k: string) => {
      newLocal[k.replace(PUSH_APPEND_REGEX, '')] = v;
      newLocal[k] = v;
    });
    return newLocal;
  }

  static idOrLabel({ pushId, pushLabel }: Form) : Form {
    return Push.filterPush(pickBy({
      [PushParameters.id]: pushId,
      [PushParameters.label]: pushLabel,
    }, (value: any) => value !== null && typeof value !== 'undefined' ));
 }

  deleteJob(parameters: Form) : Promise<Response> {
    return this.request('DELETE FROM', 'JOB', Push.idOrLabel(parameters));
  }

  deleteJobs() : Promise<Response> {
    return this.request('DELETE FROM', 'JOBS');
  }

  insertJob(parameters: Form) : Promise<Response> {
    return this.request('INSERT INTO', 'JOB', parameters);
  }

  updateJob(parameters: Form) : Promise<Response> {
    return this.request('UPDATE', 'JOB', Object.assign(Push.idOrLabel(parameters), parameters));
  }

  selectDeletedDocument(id: string) : Promise<Response> {
    return this.request('SELECT FROM', 'DELETEDDOCUMENT', id ? { id } : {});
  }

  selectDeletedJob(id: string) : Promise<Response> {
    return this.request('SELECT FROM', 'DELETEDJOB', id ? { id } : {});
  }

  selectDocument(parameters: Form) : Promise<Response> {
    return this.request('SELECT FROM', 'DOCUMENT', Push.idOrLabel(parameters));
  }

  selectForceCallback(parameters: Form) : Promise<Response> {
    return this.request('SELECT FROM', 'FORCECALLBACK', Push.idOrLabel(parameters));
  }

  selectFullReport(parameters: Form) : Promise<Response> {
    return this.request('SELECT FROM', 'FULLREPORT', Push.filterPush(parameters));
  }

  selectHistory(id: string) : Promise<Response> {
    return this.request('SELECT FROM', 'HISTORY', { id });
  }

  selectJob(parameters: Form) : Promise<Response> {
    return this.request('SELECT FROM', 'JOB', Push.filterPush(parameters));
  }

  selectReport(parameters: Form) : Promise<Response> {
    return this.request('SELECT FROM', 'REPORT', Push.filterPush(parameters));
  }

  selectReportRemoved(parameters: Form) : Promise<Response> {
    return this.request('SELECT FROM', 'REPORTREMOVED', Push.filterPush(parameters));
  }
}
