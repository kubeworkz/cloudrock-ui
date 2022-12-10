import { useCurrentStateAndParams } from '@uirouter/react';
import { FunctionComponent } from 'react';
import { Panel } from 'react-bootstrap';
import Select from 'react-select';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { reactSelectMenuPortaling } from '@cloudrock/form/utils';
import { translate } from '@cloudrock/i18n';
import { ChecklistSelectorOption } from '@cloudrock/marketplace-checklist/types';
import { useTitle } from '@cloudrock/navigation/title';

import { CustomerMap } from './CustomerMap';
import { StatsTable } from './StatsTable';
import { useChecklistOverview } from './useChecklist';

export const ChecklistOverview: FunctionComponent = () => {
  useTitle(translate('Compliance'));
  const {
    params: { category },
  } = useCurrentStateAndParams();
  const state = useChecklistOverview(category);

  if (state.checklistLoading) {
    return <LoadingSpinner />;
  } else if (state.checklistErred) {
    return <>{translate('Unable to load checklists.')}</>;
  } else if (state.checklistOptions) {
    if (!state.checklist) {
      return <>{translate('There are no checklist yet.')}</>;
    }
    return (
      <>
        <Select
          getOptionValue={({ uuid }: ChecklistSelectorOption) => uuid}
          getOptionLabel={({ name }: ChecklistSelectorOption) => name}
          value={state.checklist}
          onChange={state.setChecklist}
          options={state.checklistOptions}
          isClearable={false}
          {...reactSelectMenuPortaling()}
        />
        {state.statsLoading ? (
          <LoadingSpinner />
        ) : state.statsErred ? (
          <>{translate('Unable to load compliance overview.')}</>
        ) : (
          <Panel className="m-t-md">
            <CustomerMap customers={state.statsList} />
            <StatsTable
              stats={state.statsList}
              scopeTitle={translate('Organization')}
            />
          </Panel>
        )}
      </>
    );
  } else {
    return null;
  }
};
