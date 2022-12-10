import { connect } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { ActionsDropdown } from '@cloudrock/marketplace/offerings/actions/ActionsDropdown';
import { removeOfferingImage } from '@cloudrock/marketplace/offerings/store/actions';
import { getOffering } from '@cloudrock/marketplace/offerings/store/selectors';
import { Offering, Image } from '@cloudrock/marketplace/types';
import { waitForConfirmation } from '@cloudrock/modal/actions';
import { RootState } from '@cloudrock/store/reducers';
import { getUser } from '@cloudrock/workspace/selectors';

const openDialog = async (dispatch, image: Image, offering: Offering) => {
  try {
    await waitForConfirmation(
      dispatch,
      translate('Confirmation'),
      translate('Are you sure you want to delete the image?'),
    );
  } catch {
    return;
  }
  dispatch(removeOfferingImage(offering, image));
};

const mapStateToProps = (state: RootState) => ({
  user: getUser(state),
  offering: getOffering(state).offering,
});

const mapDispatchToProps = (dispatch) => ({
  openConfirmationDialog: (image: Image, offering: Offering) =>
    openDialog(dispatch, image, offering),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  actions: [
    {
      label: translate('Delete'),
      handler: () =>
        dispatchProps.openConfirmationDialog(ownProps.row, stateProps.offering),
      visible: stateProps.user.is_staff,
    },
  ].filter((row) => row.visible),
});

const enhance = connect(mapStateToProps, mapDispatchToProps, mergeProps);

export const ImagesActions = enhance(ActionsDropdown);
