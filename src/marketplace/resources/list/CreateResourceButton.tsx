import { triggerTransition } from '@uirouter/redux';
import { connect } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { ActionButton } from '@cloudrock/table/ActionButton';

interface OwnProps {
  category_uuid: string;
}

interface DispatchProps {
  onClick(): void;
}

const PureCreateResourceButton = (props: OwnProps & DispatchProps) => (
  <ActionButton
    action={props.onClick}
    icon="fa fa-plus"
    title={translate('Add resource')}
  />
);

const mapDispatchToProps = (dispatch, ownProps: OwnProps) => {
  return {
    onClick: () =>
      dispatch(
        triggerTransition('marketplace-category-project', {
          category_uuid: ownProps.category_uuid,
        }),
      ),
  };
};

const connector = connect(null, mapDispatchToProps);

export const CreateResourceButton = connector(PureCreateResourceButton);
