import { FunctionComponent } from 'react';
import { useAsyncFn, useEffectOnce } from 'react-use';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { loadCategories } from '@cloudrock/dashboard/api';
import { translate } from '@cloudrock/i18n';
import { WorkspaceType } from '@cloudrock/workspace/types';

import { CategoryResources } from './CategoryResources';
import { Scope } from './types';

interface CategoryResourcesListProps<ScopeType = Scope> {
  scope: ScopeType;
  scopeType: WorkspaceType;
}

const LoadingErred = ({ loadData }) => (
  <div className="text-center">
    <h3>{translate('Unable to load charts.')}</h3>
    <button onClick={loadData} type="button" className="btn btn-default">
      <i className="fa fa-refresh" /> {translate('Reload')}
    </button>
  </div>
);

export const CategoryResourcesList: FunctionComponent<CategoryResourcesListProps> =
  (props) => {
    const [{ loading, error, value }, callback] = useAsyncFn(
      () => loadCategories(props.scopeType, props.scope),
      [props.scope],
    );
    useEffectOnce(() => {
      callback();
    });

    if (loading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <LoadingErred loadData={callback} />;
    }
    return (
      <>
        {Array.isArray(value)
          ? value.map((category, index) => (
              <CategoryResources key={index} category={category} />
            ))
          : null}
      </>
    );
  };
