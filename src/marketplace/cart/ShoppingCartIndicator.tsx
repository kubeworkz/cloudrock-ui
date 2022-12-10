import { FC } from 'react';
import { connect } from 'react-redux';

import { NavbarIndicator } from '@cloudrock/navigation/header/NavbarIndicator';
import { RootState } from '@cloudrock/store/reducers';
import { getProject } from '@cloudrock/workspace/selectors';
import { Project } from '@cloudrock/workspace/types';

import { getCount } from './store/selectors';

interface CartIndicatorProps {
  count: number;
  project: Project;
}

const PureCartIndicator: FC<CartIndicatorProps> = (props) =>
  props.project ? (
    <NavbarIndicator
      state={'marketplace-checkout'}
      params={{ uuid: props.project.uuid }}
      iconClass="fa fa-shopping-cart"
      labelClass="label label-warning"
      count={props.count}
    />
  ) : null;

const mapStateToProps = (state: RootState) => ({
  count: getCount(state),
  project: getProject(state),
});

export const ShoppingCartIndicator =
  connect(mapStateToProps)(PureCartIndicator);
