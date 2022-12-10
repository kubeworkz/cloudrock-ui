import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { FieldArray, reduxForm } from 'redux-form';

import { post } from '@cloudrock/core/api';
import { SubmitButton } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';

import { StaticRoute, StaticRoutesTable } from './StaticRoutesTable';

interface OwnProps {
  resolve: {
    router: {
      uuid: string;
      routes: StaticRoute[];
    };
  };
}

interface FormData {
  routes: StaticRoute[];
}

const enhance = compose(
  connect<{}, {}, OwnProps>((_, ownProps) => ({
    initialValues: { routes: ownProps.resolve.router.routes },
  })),
  reduxForm<FormData, OwnProps>({
    form: 'SetRoutesDialog',
  }),
);

export const SetRoutesDialog = enhance(
  ({ resolve, invalid, submitting, handleSubmit }) => {
    const dispatch = useDispatch();
    const setRoutes = async (formData: FormData) => {
      try {
        await post(`/openstack-routers/${resolve.router.uuid}/set_routes/`, {
          routes: formData.routes,
        });
        dispatch(showSuccess(translate('Static routes update was scheduled.')));
        dispatch(closeModalDialog());
      } catch (e) {
        dispatch(
          showErrorResponse(e, translate('Unable to update static routes.')),
        );
      }
    };

    return (
      <form onSubmit={handleSubmit(setRoutes)} className="form-horizontal">
        <ModalDialog
          title={translate('Update static routes')}
          footer={
            <>
              <CloseDialogButton />
              <SubmitButton
                disabled={invalid}
                submitting={submitting}
                label={translate('Update')}
              />
            </>
          }
        >
          <FieldArray
            name="routes"
            component={StaticRoutesTable}
            fixedIps={resolve.router.fixed_ips}
          />
        </ModalDialog>
      </form>
    );
  },
);
