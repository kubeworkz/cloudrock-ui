import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { post } from '@cloudrock/core/api';
import { SubmitButton } from '@cloudrock/form';
import { renderValidationWrapper } from '@cloudrock/form/FieldValidationWrapper';
import { InputField } from '@cloudrock/form/InputField';
import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { showError, showSuccess } from '@cloudrock/store/notify';

import { validatePrivateCIDR } from '../utils';

import { formatAddressList } from './utils';

interface AllowedAddressPair {
  ip_address: string;
  mac_address: string;
}

interface OwnProps {
  resolve: {
    internalIp: {
      allowed_address_pairs: AllowedAddressPair[];
    };
    instance: {
      url: string;
    };
  };
}

interface FormData {
  pairs: AllowedAddressPair[];
}

const ValidatedInputField = renderValidationWrapper(InputField);

const PairRow = ({ pair, onRemove }) => (
  <tr>
    <td>
      <Field
        name={`${pair}.ip_address`}
        component={ValidatedInputField}
        validate={validatePrivateCIDR}
      />
    </td>
    <td>
      <Field name={`${pair}.mac_address`} component={ValidatedInputField} />
    </td>
    <td>
      <Button bsStyle="default" onClick={onRemove}>
        <i className="fa fa-trash" /> {translate('Remove')}
      </Button>
    </td>
  </tr>
);

const PairAddButton = ({ onClick }) => (
  <Button bsStyle="default" onClick={onClick}>
    <i className="fa fa-plus" /> {translate('Add pair')}
  </Button>
);

const PairsTable: React.FC<any> = ({ fields }) =>
  fields.length > 0 ? (
    <>
      <Table
        responsive={true}
        bordered={true}
        striped={true}
        className="m-t-md"
      >
        <thead>
          <tr>
            <th>{translate('Internal network mask (CIDR)')}</th>
            <th>{translate('MAC address (optional)')}</th>
            <th>{translate('Actions')}</th>
          </tr>
        </thead>

        <tbody>
          {fields.map((pair, index) => (
            <PairRow
              key={pair}
              pair={pair}
              onRemove={() => fields.remove(index)}
            />
          ))}
        </tbody>
      </Table>
      <PairAddButton onClick={() => fields.push({})} />
    </>
  ) : (
    <PairAddButton onClick={() => fields.push({})} />
  );

const enhance = compose(
  connect<{}, {}, OwnProps>((_, ownProps) => ({
    initialValues: { pairs: ownProps.resolve.internalIp.allowed_address_pairs },
  })),
  reduxForm<FormData, OwnProps>({
    form: 'SetAllowedAddressPairsDialog',
  }),
);

export const SetAllowedAddressPairsDialog = enhance(
  ({ resolve, invalid, submitting, handleSubmit }) => {
    const dispatch = useDispatch();
    const setAllowedAddressPairs = async (formData: FormData) => {
      try {
        await post(
          `/openstacktenant-instances/${resolve.instance.uuid}/update_allowed_address_pairs/`,
          {
            subnet: resolve.internalIp.subnet,
            allowed_address_pairs: formData.pairs || [],
          },
        );
        dispatch(
          showSuccess(translate('Allowed address pairs update was scheduled.')),
        );
        dispatch(closeModalDialog());
      } catch (e) {
        dispatch(
          showError(translate('Unable to update allowed address pairs.')),
        );
      }
    };

    return (
      <form
        onSubmit={handleSubmit(setAllowedAddressPairs)}
        className="form-horizontal"
      >
        <ModalDialog
          title={translate(
            'Set allowed address pairs ({instance} / {ipAddress})',
            {
              instance: resolve.instance.name,
              ipAddress: formatAddressList(resolve.internalIp),
            },
          )}
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
          <FieldArray name="pairs" component={PairsTable} />
        </ModalDialog>
      </form>
    );
  },
);
