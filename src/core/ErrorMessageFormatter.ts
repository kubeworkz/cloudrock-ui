import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';

export const formatErrorObject = (error) =>
  Object.keys(error)
    .map((key) => `${key}: ${error[key]}`)
    .join(', ');

export const format = (response, parseResponse?) => {
  /*
  Empty response or status code -1 denotes network error.
  Usually it is caused by one of the following reasons:

  - client is not connected to the internet;
  - server is down;
  - server is inaccessible via VPN;
  - server is located in another domain and didn't return valid CORS headers;
  - request has timed out;
  - request was aborted, ie manually cancelled by the client.

  See also: https://fetch.spec.whatwg.org/#concept-filtered-response
  */

  if (response && response.isAxiosError) {
    response = response.response;
  }

  if (!response || response.status === -1) {
    return translate(
      'Unfortunately, connection to server has failed. Please check if you can connect to {apiEndpoint} from your browser and contact support if the error continues.',
      { apiEndpoint: ENV.apiEndpoint },
    );
  }

  if (!response.hasOwnProperty('status')) {
    return response;
  }

  let message = `${response.status}: ${response.statusText}.`;

  if (response.data) {
    if (parseResponse) {
      message += ' ' + parseResponse(response, message);
    }
    if (response.data.non_field_errors) {
      message += ' ' + response.data.non_field_errors;
    } else if (response.data.detail) {
      message += ' ' + response.data.detail;
    } else if (Array.isArray(response.data)) {
      message +=
        ' ' +
        response.data
          .map((item) => {
            if (typeof item === 'object') {
              return formatErrorObject(item);
            } else {
              return item;
            }
          })
          .join('. ');
    } else if (typeof response.data === 'object') {
      message += ' ' + formatErrorObject(response.data);
    }
  }

  return message;
};
