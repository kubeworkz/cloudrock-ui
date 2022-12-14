import { connect } from 'react-redux';
import { compose } from 'redux';

import { TranslateProps, withTranslation } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';

interface OwnProps {
  label?: string;
  className?: string;
}

interface DispatchProps {
  dismiss(): void;
}

type Props = TranslateProps & OwnProps & DispatchProps;

const PureCloseDialogButton = ({
  translate,
  dismiss,
  label,
  className,
}: Props) => (
  <button
    type="button"
    className={className || 'btn btn-default'}
    onClick={dismiss}
  >
    <>{label || translate('Cancel')}</>
  </button>
);

const mapDispatchToProps = (dispatch) => ({
  dismiss: () => dispatch(closeModalDialog()),
});

const enhance = compose(
  connect<{}, DispatchProps, OwnProps>(undefined, mapDispatchToProps),
  withTranslation,
);

export const CloseDialogButton = enhance(PureCloseDialogButton);
