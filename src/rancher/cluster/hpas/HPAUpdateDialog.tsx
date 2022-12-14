import { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { reduxForm } from 'redux-form';

import { StringField, SelectField, NumberField, TextField } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { ActionDialog } from '@cloudrock/modal/ActionDialog';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { updateHPA } from '@cloudrock/rancher/api';
import { HPA } from '@cloudrock/rancher/types';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';
import { updateEntity } from '@cloudrock/table/actions';

import { MetricOption, HPAUpdateFormData } from './types';
import {
  getMetricNameOptions,
  getTargetTypeOptions,
  serializeMetrics,
  metricSelector,
  FORM_ID,
} from './utils';

interface OwnProps {
  resolve: {
    hpa: HPA;
  };
}

const useHPAUpdateDialog = (originalHPA) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const callback = useCallback(
    async (formData: HPAUpdateFormData) => {
      try {
        setSubmitting(true);
        const response = await updateHPA(originalHPA.uuid, {
          name: formData.name,
          description: formData.description,
          min_replicas: formData.min_replicas,
          max_replicas: formData.max_replicas,
          metrics: serializeMetrics(formData),
        });
        const hpa = response.data;
        dispatch(updateEntity('rancher-hpas', hpa.uuid, hpa));
      } catch (error) {
        dispatch(
          showErrorResponse(
            error,
            translate('Unable to update horizontal pod autoscaler.'),
          ),
        );
        setSubmitting(false);
        return;
      }
      dispatch(
        showSuccess(translate('Horizontal pod autoscaler has been updated.')),
      );
      dispatch(closeModalDialog());
    },
    [dispatch],
  );
  return {
    submitting,
    callback,
  };
};

export const HPAUpdateDialog = reduxForm<HPAUpdateFormData, OwnProps>({
  form: FORM_ID,
})((props) => {
  const { hpa } = props.resolve;
  const { submitting, callback } = useHPAUpdateDialog(hpa);

  const metricNameOptions = useMemo<MetricOption[]>(getMetricNameOptions, []);

  const targetTypeOptions = useMemo(getTargetTypeOptions, []);

  useEffectOnce(() => {
    const metric = hpa.metrics[0];
    props.initialize({
      name: hpa.name,
      description: hpa.description,
      min_replicas: hpa.min_replicas,
      max_replicas: hpa.max_replicas,
      metric_name: metricNameOptions.find(
        (option) => option.value === metric.name,
      ),
      target_type: targetTypeOptions.find(
        (option) =>
          option.value.toLocaleLowerCase() ===
          metric.target.type.toLocaleLowerCase(),
      ),
      quantity: metric.target.utilization || metric.target.averageValue,
    });
  });

  const metric: MetricOption = useSelector(metricSelector);

  return (
    <ActionDialog
      title={translate('Update horizontal pod autoscaler')}
      submitLabel={translate('Submit')}
      onSubmit={props.handleSubmit(callback)}
      submitting={submitting}
    >
      <StringField name="name" label={translate('Name')} required={true} />
      <TextField
        name="description"
        label={translate('Description')}
        required={false}
      />
      <NumberField
        name="min_replicas"
        label={translate('Min replicas')}
        required={true}
        min={1}
        max={10}
      />
      <NumberField
        name="max_replicas"
        label={translate('Max replicas')}
        required={true}
        min={1}
        max={10}
      />
      <SelectField
        name="metric_name"
        label={translate('Metric name')}
        required={true}
        options={metricNameOptions}
        isClearable={true}
      />
      <SelectField
        name="target_type"
        label={translate('Target type')}
        required={true}
        options={targetTypeOptions}
        isClearable={true}
      />
      <NumberField
        name="quantity"
        label={translate('Quantity')}
        required={true}
        unit={metric ? metric.unitDisplay : undefined}
      />
    </ActionDialog>
  );
});
