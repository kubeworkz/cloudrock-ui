import { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withTranslation, TranslateProps } from '@cloudrock/i18n';
import { showError, showSuccess } from '@cloudrock/store/notify';
import { ActionButton } from '@cloudrock/table/ActionButton';
import { deleteEntity } from '@cloudrock/table/actions';

import { showHookRemoveConfirmation } from './actions';
import { removeHook } from './api';
import * as constants from './constants';

const mapDispatchToProps = (dispatch) => ({
  showConfirmDialog: (action: () => void) =>
    dispatch(showHookRemoveConfirmation(action)),
  removeEntity: (id: string) =>
    dispatch(deleteEntity(constants.HOOK_LIST_ID, id)),
  showError: (message: string) => dispatch(showError(message)),
  showSuccess: (message: string) => dispatch(showSuccess(message)),
});

interface OwnProps {
  uuid: string;
  url: string;
}

interface DispatchProps {
  showConfirmDialog: (action: () => void) => void;
  removeEntity: (id: string) => void;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
}

interface HookRemoveButtonState {
  removing: boolean;
}

class HookRemoveButtonComponent extends Component<
  OwnProps & DispatchProps & TranslateProps,
  HookRemoveButtonState
> {
  state = {
    removing: false,
  };

  async removeHook(uuid: string, url: string) {
    try {
      this.setState({ removing: true });
      await removeHook(url);
      this.props.removeEntity(uuid);
      this.props.showSuccess(this.props.translate('Hook has been removed.'));
    } catch (e) {
      this.props.showError(this.props.translate('Unable to remove hook.'));
    }
  }

  render() {
    const { uuid, url } = this.props;
    return (
      <ActionButton
        title={this.props.translate('Remove')}
        action={() =>
          this.props.showConfirmDialog(() => this.removeHook(uuid, url))
        }
        icon={this.state.removing ? 'fa fa-spinner fa-spin' : 'fa fa-trash'}
        disabled={this.state.removing}
      />
    );
  }
}

const enhance = compose(
  connect<{}, DispatchProps, OwnProps>(null, mapDispatchToProps),
  withTranslation,
);

export const HookRemoveButton = enhance(HookRemoveButtonComponent);
