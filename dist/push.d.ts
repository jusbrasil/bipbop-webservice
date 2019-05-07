import WebService, { Form } from './web-service';
export declare enum PushParameters {
    callback = "pushCallback",
    juristekCallback = "juristekCallback",
    at = "pushAt",
    document = "pushDocument",
    documentCharset = "pushDocumentCharset",
    documentContentType = "pushDocumentContentType",
    everyCase = "pushEveryCase",
    expire = "pushExpire",
    id = "pushId",
    interval = "pushInterval",
    label = "pushLabel",
    locked = "pushLocked",
    maxCallbackTrys = "pushMaxCallbackTrys",
    maxVersion = "pushMaxVersion",
    priority = "pushPriority",
    query = "pushQuery",
    tags = "pushTags",
    tryIn = "pushTryIn",
    version = "pushVersion",
    webSocketDeliver = "pushWebSocketDeliver",
    weekdays = "pushWeekdays"
}
export default class Push {
    ws: WebService;
    pushController: string;
    constructor(ws: WebService, pushController?: string);
    private request;
    static filterPush(filter: Form): Form;
    static idOrLabel({ pushId, pushLabel }: Form): Form;
    deleteJob(parameters: Form): Promise<Response>;
    deleteJobs(): Promise<Response>;
    insertJob(parameters: Form): Promise<Response>;
    updateJob(parameters: Form): Promise<Response>;
    selectDeletedDocument(id: string): Promise<Response>;
    selectDeletedJob(id: string): Promise<Response>;
    selectDocument(parameters: Form): Promise<Response>;
    selectForceCallback(parameters: Form): Promise<Response>;
    selectFullReport(parameters: Form): Promise<Response>;
    selectHistory(id: string): Promise<Response>;
    selectJob(parameters: Form): Promise<Response>;
    selectReport(parameters: Form): Promise<Response>;
    selectReportRemoved(parameters: Form): Promise<Response>;
}
