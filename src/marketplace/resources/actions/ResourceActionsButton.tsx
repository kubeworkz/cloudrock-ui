import { FunctionComponent } from 'react';
import { useBoolean } from 'react-use';

import { EditResourceEndDateAction } from '@cloudrock/marketplace/resources/actions/EditResourceEndDateAction';
import { MoveResourceAction } from '@cloudrock/marketplace/resources/actions/MoveResourceAction';
import { ChangePlanAction } from '@cloudrock/marketplace/resources/change-plan/ChangePlanAction';
import { SubmitReportAction } from '@cloudrock/marketplace/resources/report/SubmitReportAction';
import { SetBackendIdAction } from '@cloudrock/marketplace/resources/SetBackendIdAction';
import { TerminateAction } from '@cloudrock/marketplace/resources/terminate/TerminateAction';
import { Resource } from '@cloudrock/marketplace/resources/types';
import { ResourceActionComponent } from '@cloudrock/resource/actions/ResourceActionComponent';

import { ChangeLimitsAction } from '../change-limits/ChangeLimitsAction';

import { EditAction } from './EditAction';

const ActionsList = [
  EditAction,
  MoveResourceAction,
  SubmitReportAction,
  ChangePlanAction,
  ChangeLimitsAction,
  SetBackendIdAction,
  TerminateAction,
  EditResourceEndDateAction,
];

interface ResourceActionsButtonProps {
  resource: Resource;
  reInitResource?(): void;
  refreshList?(): void;
}

export const ResourceActionsButton: FunctionComponent<ResourceActionsButtonProps> =
  (props) => {
    const [open, onToggle] = useBoolean(false);

    return (
      <ResourceActionComponent
        open={open}
        onToggle={onToggle}
        actions={ActionsList}
        resource={props.resource}
        reInitResource={props.reInitResource}
        refreshList={props.refreshList}
      />
    );
  };
