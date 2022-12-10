import { triggerTransition } from '@uirouter/redux';
import { reset, change, getFormValues } from 'redux-form';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import { format } from '@cloudrock/core/ErrorMessageFormatter';
import { Action } from '@cloudrock/core/reducerActions';
import { translate } from '@cloudrock/i18n';
import * as api from '@cloudrock/marketplace/common/api';
import { Category } from '@cloudrock/marketplace/types';
import { handleMarketplaceErrorResponse } from '@cloudrock/marketplace/utils';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { router } from '@cloudrock/router';
import {
  showError,
  showErrorResponse,
  showSuccess,
} from '@cloudrock/store/notify';
import { updateEntity } from '@cloudrock/table/actions';
import {
  getCustomer,
  getUser,
  isOwnerOrStaff as isOwnerOrStaffSelector,
  isServiceManagerSelector,
} from '@cloudrock/workspace/selectors';

import {
  setStep,
  loadDataSuccess,
  loadDataError,
  isAddingOfferingImage,
} from './actions';
import * as constants from './constants';
import { PUBLIC_OFFERINGS_FILTER_FORM_ID } from './constants';
import { getPlans, getAttributes, getOfferingComponents } from './selectors';
import { OfferingFormData, OfferingUpdateFormData } from './types';
import {
  filterPluginsData,
  formatOfferingRequest,
  planWithoutComponent,
  planWithoutQuotas,
  updatePublicOfferingsList,
} from './utils';

function* loadCategories() {
  const categories: Category[] = yield call(api.getCategories);
  const pluginsData = yield call(api.getPlugins);
  const plugins = filterPluginsData(pluginsData);
  return { categories, plugins };
}

function* loadData() {
  try {
    const data = yield loadCategories();
    yield put(loadDataSuccess({ ...data, offering: undefined }));
  } catch {
    yield put(loadDataError());
  }
}

function* removeOfferingComponent(action) {
  const plans = yield select(getPlans);
  const newPlans = plans.map((plan) =>
    planWithoutComponent(plan, action.payload.component),
  );
  yield put(change(constants.FORM_ID, 'plans', newPlans));
}

function* removeOfferingQuotas(action) {
  const plans = yield select(getPlans);
  const newPlans = plans.map((plan) =>
    planWithoutQuotas(plan, action.payload.component),
  );
  yield put(change(constants.FORM_ID, 'plans', newPlans));
}

function* handleCategoryChange(action) {
  const category: Category = action.payload.category;
  const values = yield select(getAttributes);
  const attributes = values === undefined ? {} : { ...values };
  for (const section of category.sections) {
    for (const attribute of section.attributes) {
      if (
        attributes[attribute.key] === undefined &&
        attribute.default !== null
      ) {
        attributes[attribute.key] = attribute.default;
      }
    }
  }
  yield put(change(constants.FORM_ID, 'category', category));
  yield put(change(constants.FORM_ID, 'attributes', attributes));
}

function* createOffering(action: Action<OfferingFormData>) {
  const { thumbnail, document, ...rest } = action.payload;
  const customer = yield select(getCustomer);
  try {
    const components = yield select(getOfferingComponents, rest.type.value);
    const offeringRequest = formatOfferingRequest(rest, components, customer);
    const response = yield call(api.createProviderOffering, offeringRequest);
    if (thumbnail) {
      const offeringId = response.data.uuid;
      yield call(api.uploadOfferingThumbnail, offeringId, thumbnail);
    }
    if (document && document.file) {
      yield call(api.uploadOfferingDocument, response.data.url, document);
    }
  } catch (error) {
    const errorMessage = `${translate('Unable to create offering.')} ${format(
      error,
      handleMarketplaceErrorResponse,
    )}`;
    yield put(showError(errorMessage));
    yield put(constants.createOffering.failure());
    return;
  }
  yield call(() => router.stateService.go('marketplace-vendor-offerings'));
  yield put(reset(constants.FORM_ID));
  yield put(setStep('Overview'));
  yield put(showSuccess(translate('Offering has been created.')));
  yield put(constants.createOffering.success());
}

function* updateOffering(action: Action<OfferingUpdateFormData>) {
  const { offeringUuid, thumbnail, ...rest } = action.payload;
  const components = yield select(getOfferingComponents, rest.type.value);
  try {
    const offeringRequest = formatOfferingRequest(rest, components);
    yield call(api.updateProviderOffering, offeringUuid, offeringRequest);
    if (thumbnail instanceof File || thumbnail === '') {
      yield call(api.uploadOfferingThumbnail, offeringUuid, thumbnail);
    }
  } catch (error) {
    const errorMessage = `${translate('Unable to update offering.')} ${format(
      error,
      handleMarketplaceErrorResponse,
    )}`;
    yield put(showError(errorMessage));
    yield put(constants.updateOffering.failure());
    return;
  }
  yield put(constants.updateOffering.success());
  yield put(reset(constants.FORM_ID));
  yield put(showSuccess(translate('Offering has been updated.')));
  yield put(triggerTransition('marketplace-vendor-offerings', {}));
}

function* updateOfferingState(action) {
  const { offering, stateAction, reason, isPublic, refreshOffering } =
    action.payload;
  try {
    const response = yield call(
      api.updateProviderOfferingState,
      offering.uuid,
      stateAction,
      reason,
    );
    yield put(
      updateEntity(constants.OFFERING_TABLE_NAME, offering.uuid, {
        ...offering,
        state: response.state,
      }),
    );
    yield put(showSuccess(translate('Offering state has been updated.')));
    if (isPublic) {
      refreshOffering();
    }
    if (stateAction === 'pause') {
      yield put(closeModalDialog());
    }
  } catch (error) {
    const errorMessage = `${translate(
      'Unable to update offering state.',
    )} ${format(error)}`;
    yield put(showError(errorMessage));
  }
}

function* loadOffering(action) {
  const { offeringUuid } = action.payload;
  try {
    const data = yield loadCategories();
    const offering = yield call(api.getProviderOffering, offeringUuid);
    yield put(loadDataSuccess({ offering, ...data }));
  } catch {
    yield put(loadDataError());
  }
}

function* addOfferingImage(action: Action<any>) {
  const { formData, offering } = action.payload;
  try {
    const response = yield call(api.uploadOfferingImage, formData, offering);
    yield put(showSuccess(translate('Image has been added.')));
    if (response.status === 201) {
      yield put(closeModalDialog());
      yield loadOffering({
        payload: {
          offeringUuid: offering.uuid,
        },
      });
    }
  } catch (error) {
    const errorMessage = `${translate('Unable to add image.')} ${format(
      error,
    )}`;
    yield put(showError(errorMessage));
  }
  yield put(isAddingOfferingImage(false));
}

function* removeOfferingImage(action: Action<any>) {
  const { offering, image } = action.payload;
  try {
    yield call(api.deleteOfferingImage, image.uuid);
    yield put(showSuccess(translate('Image has been removed.')));
    yield put(closeModalDialog());
    yield loadOffering({
      payload: {
        offeringUuid: offering.uuid,
      },
    });
  } catch (error) {
    const errorMessage = `${translate('Unable to remove image.')} ${format(
      error,
    )}`;
    yield put(showError(errorMessage));
  }
}

function* addOfferingLocation(action: Action<any>) {
  try {
    const { offering } = action.payload;
    yield call(api.updateProviderOffering, offering.uuid, offering);
    const customer = yield select(getCustomer);
    const isServiceManager = yield select(isServiceManagerSelector);
    const isOwnerOrStaff = yield select(isOwnerOrStaffSelector);
    const user = yield select(getUser);
    const formData = yield select(
      getFormValues(PUBLIC_OFFERINGS_FILTER_FORM_ID),
    );
    if (formData) {
      yield put(
        updatePublicOfferingsList(
          customer,
          isServiceManager && !isOwnerOrStaff,
          user,
          formData.state,
        ),
      );
    }
    yield put(showSuccess(translate('Location has been saved successfully.')));
    yield put(closeModalDialog());
  } catch (error) {
    const errorMessage = `${translate('Unable to save location.')} ${format(
      error,
    )}`;
    yield put(showError(errorMessage));
  }
}

function* googleCalendarSync(action: Action<any>) {
  const { uuid } = action.payload;
  try {
    yield call(api.syncGoogleCalendar, uuid);
    yield put(
      showSuccess(translate('Google Calendar has been synced successfully.')),
    );
    yield put(closeModalDialog());
  } catch (error) {
    const errorMessage = `${translate(
      'Unable to sync Google Calendar.',
    )} ${format(error)}`;
    yield put(showError(errorMessage));
  }
}

function* googleCalendarPublish(action: Action<any>) {
  const { uuid } = action.payload;
  try {
    yield call(api.publishGoogleCalendar, uuid);
    yield put(
      showSuccess(
        translate('Google Calendar has been published successfully.'),
      ),
    );
    yield put(closeModalDialog());
  } catch (error) {
    const errorMessage = `${translate(
      'Unable to publish Google Calendar.',
    )} ${format(error)}`;
    yield put(showError(errorMessage));
  }
}

function* googleCalendarUnpublish(action: Action<any>) {
  const { uuid } = action.payload;
  try {
    yield call(api.unpublishGoogleCalendar, uuid);
    yield put(
      showSuccess(
        translate('Google Calendar has been unpublished successfully.'),
      ),
    );
    yield put(closeModalDialog());
  } catch (error) {
    const errorMessage = `${translate(
      'Unable to unpublish Google Calendar.',
    )} ${format(error)}`;
    yield put(showError(errorMessage));
  }
}

function* pullRemoteOfferingDetails(action: Action<any>) {
  const { uuid } = action.payload;
  try {
    yield call(api.pullRemoteOfferingDetails, uuid);
    yield put(
      showSuccess(
        translate('Offering details synchronization has been scheduled.'),
      ),
    );
  } catch (error) {
    yield put(
      showErrorResponse(
        error,
        translate('Unable to synchronize offering details.'),
      ),
    );
  }
}

function* pullRemoteOfferingUsers(action: Action<any>) {
  const { uuid } = action.payload;
  try {
    yield call(api.pullRemoteOfferingUsers, uuid);
    yield put(
      showSuccess(
        translate('Offering users synchronization has been scheduled.'),
      ),
    );
  } catch (error) {
    yield put(
      showErrorResponse(
        error,
        translate('Unable to synchronize offering users.'),
      ),
    );
  }
}

function* pullRemoteOfferingUsage(action: Action<any>) {
  const { uuid } = action.payload;
  try {
    yield call(api.pullRemoteOfferingUsage, uuid);
    yield put(
      showSuccess(
        translate('Offering usage synchronization has been scheduled.'),
      ),
    );
  } catch (error) {
    yield put(
      showErrorResponse(
        error,
        translate('Unable to synchronize offering usage.'),
      ),
    );
  }
}

function* pullRemoteOfferingResources(action: Action<any>) {
  const { uuid } = action.payload;
  try {
    yield call(api.pullRemoteOfferingResources, uuid);
    yield put(
      showSuccess(
        translate('Offering resources synchronization has been scheduled.'),
      ),
    );
  } catch (error) {
    yield put(
      showErrorResponse(
        error,
        translate('Unable to synchronize offering resources.'),
      ),
    );
  }
}

function* pullRemoteOfferingOrderItems(action: Action<any>) {
  const { uuid } = action.payload;
  try {
    yield call(api.pullRemoteOfferingOrderItems, uuid);
    yield put(
      showSuccess(
        translate('Offering order items synchronization has been scheduled.'),
      ),
    );
  } catch (error) {
    yield put(
      showErrorResponse(
        error,
        translate('Unable to synchronize offering order items.'),
      ),
    );
  }
}

function* pullRemoteOfferingInvoices(action: Action<any>) {
  const { uuid } = action.payload;
  try {
    yield call(api.pullRemoteOfferingInvoices, uuid);
    yield put(
      showSuccess(
        translate('Offering invoices synchronization has been scheduled.'),
      ),
    );
  } catch (error) {
    yield put(
      showErrorResponse(
        error,
        translate('Unable to synchronize offering invoices.'),
      ),
    );
  }
}

function* updateConfirmationMessage(action: Action<any>) {
  const { offeringUuid, templateConfirmationMessage, secretOptions } =
    action.payload;
  try {
    yield call(
      api.updateProviderOfferingConfirmationMessage,
      offeringUuid,
      templateConfirmationMessage,
      secretOptions,
    );
    yield put(
      showSuccess(
        translate('Confirmation message has been updated successfully.'),
      ),
    );
    yield put(constants.updateConfirmationMessage.success());
    yield put(closeModalDialog());
  } catch (error) {
    const errorMessage = `${translate(
      'Unable to update confirmation message.',
    )} ${format(error)}`;
    yield put(showError(errorMessage));
    yield put(constants.updateConfirmationMessage.failure());
  }
}

function* updateAccessPolicy(action: Action<any>) {
  const { offeringUuid, divisions } = action.payload;
  try {
    yield call(api.updateProviderOfferingAccessPolicy, offeringUuid, divisions);
    const customer = yield select(getCustomer);
    const isServiceManager = yield select(isServiceManagerSelector);
    const isOwnerOrStaff = yield select(isOwnerOrStaffSelector);
    const user = yield select(getUser);
    const formData = yield select(
      getFormValues(PUBLIC_OFFERINGS_FILTER_FORM_ID),
    );
    if (formData) {
      yield put(
        updatePublicOfferingsList(
          customer,
          isServiceManager && !isOwnerOrStaff,
          user,
          formData.state,
        ),
      );
    }
    yield put(
      showSuccess(translate('Access policy has been updated successfully.')),
    );
    yield put(constants.setAccessPolicy.success());
    yield put(closeModalDialog());
  } catch (error) {
    const errorMessage = `${translate(
      'Unable to update access policy.',
    )} ${format(error)}`;
    yield put(showError(errorMessage));
    yield put(constants.setAccessPolicy.failure());
  }
}

function* updateOfferingLogo(action: Action<any>) {
  const { offeringUuid, formData } = action.payload;
  try {
    yield call(api.updateProviderOfferingLogo, offeringUuid, formData);
    const customer = yield select(getCustomer);
    const isServiceManager = yield select(isServiceManagerSelector);
    const isOwnerOrStaff = yield select(isOwnerOrStaffSelector);
    const user = yield select(getUser);
    const filterFormData = yield select(
      getFormValues(PUBLIC_OFFERINGS_FILTER_FORM_ID),
    );
    yield put(
      updatePublicOfferingsList(
        customer,
        isServiceManager && !isOwnerOrStaff,
        user,
        filterFormData.state,
      ),
    );
    yield put(showSuccess(translate('Logo has been updated successfully.')));
    yield put(constants.updateOfferingLogo.success());
    yield put(closeModalDialog());
  } catch (error) {
    const errorMessage = `${translate('Unable to update logo.')} ${format(
      error,
    )}`;
    yield put(showError(errorMessage));
    yield put(constants.updateOfferingLogo.failure());
  }
}

export default function* () {
  yield takeEvery(constants.REMOVE_OFFERING_COMPONENT, removeOfferingComponent);
  yield takeEvery(constants.REMOVE_OFFERING_QUOTAS, removeOfferingQuotas);
  yield takeEvery(constants.CATEGORY_CHANGED, handleCategoryChange);
  yield takeEvery(constants.LOAD_DATA_START, loadData);
  yield takeEvery(constants.LOAD_OFFERING_START, loadOffering);
  yield takeEvery(constants.createOffering.REQUEST, createOffering);
  yield takeEvery(constants.updateOffering.REQUEST, updateOffering);
  yield takeEvery(constants.UPDATE_OFFERING_STATE, updateOfferingState);
  yield takeEvery(constants.ADD_OFFERING_IMAGE, addOfferingImage);
  yield takeEvery(constants.REMOVE_OFFERING_IMAGE, removeOfferingImage);
  yield takeEvery(constants.ADD_OFFERING_LOCATION, addOfferingLocation);
  yield takeEvery(constants.GOOGLE_CALENDAR_SYNC, googleCalendarSync);
  yield takeEvery(constants.GOOGLE_CALENDAR_PUBLISH, googleCalendarPublish);
  yield takeEvery(constants.GOOGLE_CALENDAR_UNPUBLISH, googleCalendarUnpublish);
  yield takeEvery(constants.GOOGLE_CALENDAR_UNPUBLISH, googleCalendarUnpublish);
  yield takeEvery(
    constants.PULL_REMOTE_OFFERING_DETAILS,
    pullRemoteOfferingDetails,
  );
  yield takeEvery(
    constants.PULL_REMOTE_OFFERING_USERS,
    pullRemoteOfferingUsers,
  );
  yield takeEvery(
    constants.PULL_REMOTE_OFFERING_USAGE,
    pullRemoteOfferingUsage,
  );
  yield takeEvery(
    constants.PULL_REMOTE_OFFERING_RESOURCES,
    pullRemoteOfferingResources,
  );
  yield takeEvery(
    constants.PULL_REMOTE_OFFERING_ORDER_ITEMS,
    pullRemoteOfferingOrderItems,
  );
  yield takeEvery(
    constants.PULL_REMOTE_OFFERING_INVOICES,
    pullRemoteOfferingInvoices,
  );
  yield takeEvery(
    constants.updateConfirmationMessage.REQUEST,
    updateConfirmationMessage,
  );
  yield takeEvery(constants.setAccessPolicy.REQUEST, updateAccessPolicy);
  yield takeEvery(constants.updateOfferingLogo.REQUEST, updateOfferingLogo);
}
