import objectAssign from 'object-assign';
import map from 'lodash/map';
import pickBy from 'lodash/pickBy';

const PUSH_APPEND_REGEX = /^push/i;

const pushParameters = {
  callback: 'pushCallback',
  juristekCallback: 'juristekCallback',
  at: 'pushAt',
  document: 'pushDocument',
  documentCharset: 'pushDocumentCharset',
  documentContentType: 'pushDocumentContentType',
  everyCase: 'pushEveryCase',
  expire: 'pushExpire',
  id: 'pushId',
  interval: 'pushInterval',
  label: 'pushLabel',
  locked: 'pushLocked',
  maxCallbackTrys: 'pushMaxCallbackTrys',
  maxVersion: 'pushMaxVersion',
  priority: 'pushPriority',
  query: 'pushQuery',
  tags: 'pushTags',
  tryIn: 'pushTryIn',
  version: 'pushVersion',
  webSocketDeliver: 'pushWebSocketDeliver',
  weekdays: 'pushWeekdays',
};

export { pushParameters };

export default class Push {
  constructor(ws, pushController = 'PUSH') {
    this.ws = ws;
    this.pushController = pushController;
    this.debug = false;
  }

  request(method, table, form = {}) {
    const query = `${method} '${this.pushController}'.'${table}'`;
    return Promise.resolve()
      .then(() => this.ws[this.debug ? 'object' : 'request'](query, form));
  }

  static filterPush(filter) {
    return objectAssign({}, ...map(filter, (v, k) => ({ [k.replace(PUSH_APPEND_REGEX, '')]: v, [k]: v })));
  }

  static idOrLabel({ pushId, pushLabel }) {
    return Push.filterPush(pickBy({
      [pushParameters.id]: pushId,
      [pushParameters.label]: pushLabel,
    }, value => !!value));
  }

  deleteJob(parameters) {
    return this.request('DELETE FROM', 'JOB', Push.idOrLabel(parameters));
  }

  deleteJobs() {
    return this.request('DELETE FROM', 'JOBS');
  }

  insertJob(parameters) {
    return this.request('INSERT INTO', 'JOB', parameters);
  }

  selectDeletedDocument(id) {
    return this.request('SELECT FROM', 'DELETEDDOCUMENT', id ? { id } : {});
  }

  selectDeletedJob(id) {
    return this.request('SELECT FROM', 'DELETEDJOB', id ? { id } : {});
  }

  selectDocument(parameters) {
    return this.request('SELECT FROM', 'DOCUMENT', Push.idOrLabel(parameters));
  }

  selectForceCallback(parameters) {
    return this.request('SELECT FROM', 'FORCECALLBACK', Push.idOrLabel(parameters));
  }

  selectFullReport(parameters) {
    return this.request('SELECT FROM', 'FULLREPORT', Push.filterPush(parameters));
  }

  selectHistory(id) {
    return this.request('SELECT FROM', 'HISTORY', { id });
  }

  selectJob(parameters) {
    return this.request('SELECT FROM', 'JOB', Push.filterPush(parameters));
  }

  selectReport(parameters) {
    return this.request('SELECT FROM', 'REPORT', Push.filterPush(parameters));
  }

  selectReportRemoved(parameters) {
    return this.request('SELECT FROM', 'REPORTREMOVED', Push.filterPush(parameters));
  }

  updateJob(parameters) {
    return this.request('UPDATE', 'JOB', Object.assign(Push.idOrLabel(parameters), parameters));
  }
}
