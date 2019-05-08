import ErrorCodes from "./error-codes";

import ExceptionInternalUserBlocked from "./exception-internal-user-blocked";
import ExceptionTableNotFound from "./exception-table-not-found";
import ExceptionNotFound from "./exception-not-found";
import ExceptionInvalidArgument from "./exception-invalid-argument";
import ExceptionMissingArgument from "./exception-missing-argument";
import ExceptionMultipleResultsFound from "./exception-multiple-results-found";
import ExceptionBlockedIp from "./exception-blocked-ip";
import ExceptionUnexpectedHttpCode from "./exception-unexpected-http-code";
import ExceptionRemoteSiteUnderMaintenance from "./exception-remote-site-under-maintenance";
import ExceptionAuthenticationFailure from "./exception-authentication-failure";
import ExceptionInternalServerError from "./exception-internal-server-error";
import ExceptionQueryLimit from "./exception-query-limit";
import ExceptionPasswordRequired from "./exception-password-required";
import ExceptionJusticeSecret from "./exception-justice-secret";
import ExceptionExpectedDataNotFound from "./exception-expected-data-not-found";
import ExceptionCaptchaBreakFailed from "./exception-captcha-break-failed";
import ExceptionInternalPushLabel from "./exception-internal-push-label";
import ExceptionUnderMaintenance from "./exception-under-maintenance";
import ExceptionSiteMessage from "./exception-site-message";
import ExceptionBlockedByConfig from "./exception-blocked-by-config";
import ExceptionLegalReview from "./exception-legal-review";
import ExceptionResourceUnavailable from "./exception-resource-unavailable";
import ExceptionInternalEmailUnchecked from "./exception-internal-email-unchecked";
import ExceptionInternalNotReady from "./exception-internal-not-ready";
import ExceptionOutdated from "./exception-outdated";
import ExceptionWithoutProceedings from "./exception-without-proceedings";
import ExceptionEmailUnchecked from "./exception-email-unchecked";
import ExceptionBlockedUser from "./exception-blocked-user";
import ExceptionUnknown from "./exception-unknown";

const Exceptions = {
    [ErrorCodes.E_INTERNAL_USER_BLOCKED]: ExceptionInternalUserBlocked,
    [ErrorCodes.E_TABLE_NOT_FOUND]: ExceptionTableNotFound,
    [ErrorCodes.E_NOT_FOUND]: ExceptionNotFound,
    [ErrorCodes.E_INVALID_ARGUMENT]: ExceptionInvalidArgument,
    [ErrorCodes.E_MISSING_ARGUMENT]: ExceptionMissingArgument,
    [ErrorCodes.E_MULTIPLE_RESULTS_FOUND]: ExceptionMultipleResultsFound,
    [ErrorCodes.E_BLOCKED_IP]: ExceptionBlockedIp,
    [ErrorCodes.E_UNEXPECTED_HTTP_CODE]: ExceptionUnexpectedHttpCode,
    [ErrorCodes.E_REMOTE_SITE_UNDER_MAINTENANCE]: ExceptionRemoteSiteUnderMaintenance,
    [ErrorCodes.E_AUTHENTICATION_FAILURE]: ExceptionAuthenticationFailure,
    [ErrorCodes.E_INTERNAL_SERVER_ERROR]: ExceptionInternalServerError,
    [ErrorCodes.E_QUERY_LIMIT]: ExceptionQueryLimit,
    [ErrorCodes.E_PASSWORD_REQUIRED]: ExceptionPasswordRequired,
    [ErrorCodes.E_JUSTICE_SECRET]: ExceptionJusticeSecret,
    [ErrorCodes.E_EXPECTED_DATA_NOT_FOUND]: ExceptionExpectedDataNotFound,
    [ErrorCodes.E_CAPTCHA_BREAK_FAILED]: ExceptionCaptchaBreakFailed,
    [ErrorCodes.E_INTERNAL_PUSH_LABEL]: ExceptionInternalPushLabel,
    [ErrorCodes.E_UNDER_MAINTENANCE]: ExceptionUnderMaintenance,
    [ErrorCodes.E_SITE_MESSAGE]: ExceptionSiteMessage,
    [ErrorCodes.E_BLOCKED_BY_CONFIG]: ExceptionBlockedByConfig,
    [ErrorCodes.E_LEGAL_REVIEW]: ExceptionLegalReview,
    [ErrorCodes.E_RESOURCE_UNAVAILABLE]: ExceptionResourceUnavailable,
    [ErrorCodes.E_INTERNAL_EMAIL_UNCHECKED]: ExceptionInternalEmailUnchecked,
    [ErrorCodes.E_INTERNAL_NOT_READY]: ExceptionInternalNotReady,
    [ErrorCodes.E_OUTDATED]: ExceptionOutdated,
    [ErrorCodes.E_WITHOUT_PROCEEDINGS]: ExceptionWithoutProceedings,
    [ErrorCodes.E_EMAIL_UNCHECKED]: ExceptionEmailUnchecked,
    [ErrorCodes.E_BLOCKED_USER]: ExceptionBlockedUser,
    [ErrorCodes.E_UNKNOWN]: ExceptionUnknown,
}

export default Exceptions;