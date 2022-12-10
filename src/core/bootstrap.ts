import Axios from 'axios';

import { afterBootstrap } from '@cloudrock/afterBootstrap';
import { ENV } from '@cloudrock/configs/default';

const CONFIG_FILE = 'scripts/configs/config.json';

export async function loadConfig() {
  let frontendSettings, backendSettings;
  try {
    const frontendResponse = await Axios.get(CONFIG_FILE);
    frontendSettings = frontendResponse.data;
  } catch (response) {
    if (!response) {
      throw new Error(`Unable to fetch client configuration file.`);
    } else if (response.status === 404) {
      // fallback to default configuration
      frontendSettings = {
        apiEndpoint: 'http://localhost:8080/',
      };
    } else {
      throw new Error(response);
    }
  }

  // Axios swallows JSON parse error
  if (typeof frontendSettings !== 'object') {
    throw new Error(
      `Unable to parse client configuration file ${CONFIG_FILE}.`,
    );
  }

  try {
    const backendResponse = await Axios.get(
      `${frontendSettings.apiEndpoint}api/configuration/`,
    );
    backendSettings = backendResponse.data;
  } catch (response) {
    if (!response) {
      throw new Error(
        `Unfortunately, connection to server has failed. Please check if you can connect to ${frontendSettings.apiEndpoint} from your browser and contact support if the error continues.`,
      );
    } else if (response.status >= 400) {
      throw new Error(
        `Unable to fetch server configuration. Error message: ${response.statusText}`,
      );
    } else {
      throw new Error(response);
    }
  }

  const config = {
    ...frontendSettings,
    plugins: backendSettings,
    languageChoices: backendSettings.LANGUAGES.map(([code, label]) => ({
      code,
      label,
    })),
    defaultLanguage: backendSettings.LANGUAGE_CODE,
    FEATURES: backendSettings.FEATURES,
  };
  Object.assign(ENV, config);
  afterBootstrap();
  return true;
}
