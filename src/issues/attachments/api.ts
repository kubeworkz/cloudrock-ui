import Axios from 'axios';

import { ENV } from '@cloudrock/configs/default';
import { sendForm } from '@cloudrock/core/api';

export const getAttachments = (issue: string) => {
  return Axios.get(`${ENV.apiEndpoint}api/support-attachments/`, {
    params: {
      issue,
    },
  });
};

export const putAttachment = (issueUrl: string, file: File) => {
  return sendForm('POST', `${ENV.apiEndpoint}api/support-attachments/`, {
    issue: issueUrl,
    file,
  });
};

export const deleteAttachment = (uuid: string) => {
  return Axios.delete(`${ENV.apiEndpoint}api/support-attachments/{${uuid}}/`);
};
