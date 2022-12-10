export const SERVICE_USAGE_FETCH_START = 'cloudrock/providers/support/FETCH_START';
export const SERVICE_USAGE_FETCH_DONE = 'cloudrock/providers/support/FETCH_DONE';
export const SERVICE_USAGE_FETCH_ERROR = 'cloudrock/providers/support/FETCH_ERROR';
export const SERVICE_SELECT = 'cloudrock/providers/support/SERVICE_SELECT';
export const INFO_PANEL_SHOW = 'cloudrock/providers/support/INFO_PANEL_SHOW';
export const INFO_PANEL_HIDE = 'cloudrock/providers/support/INFO_PANEL_HIDE';
export const USAGE_DATA_CLEAN = 'cloudrock/providers/support/USAGE_DATA_CLEAN';

export const fetchServiceUsageStart = () => ({
  type: SERVICE_USAGE_FETCH_START,
});

export const fetchServiceUsageDone = (data) => {
  return {
    type: SERVICE_USAGE_FETCH_DONE,
    payload: { data },
  };
};

export const fetchServiceUsageError = (error: object) => {
  return {
    type: SERVICE_USAGE_FETCH_ERROR,
    payload: { error },
  };
};

export const serviceProviderSelect = (uuid: string) => {
  return {
    type: SERVICE_SELECT,
    payload: { uuid },
  };
};

export const showInfoPanel = () => {
  return {
    type: INFO_PANEL_SHOW,
  };
};

export const hideInfoPanel = () => {
  return {
    type: INFO_PANEL_HIDE,
  };
};

export const cleanUsageData = () => {
  return {
    type: USAGE_DATA_CLEAN,
  };
};
