import { connect } from 'react-redux';

import { TranslateProps, withTranslation } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { ActionButton } from '@cloudrock/table/ActionButton';

interface ProjectRemoveDialogProps extends TranslateProps {
  resolve: {
    action: () => void;
    projectName: string;
  };
  dismiss: () => void;
}

const PureProjectRemoveDialog = withTranslation(
  (props: ProjectRemoveDialogProps) => (
    <ModalDialog
      title={props.translate('Project removal')}
      footer={[
        <ActionButton
          key={1}
          title={props.translate('Yes')}
          action={() => {
            props.resolve.action();
            props.dismiss();
          }}
          className="btn btn-sm btn-danger"
        />,
        <CloseDialogButton key={2} className="btn btn-sm btn-default" />,
      ]}
    >
      {props.translate(
        'Are you sure you would like to delete project {projectName}?',
        { projectName: props.resolve.projectName },
      )}
    </ModalDialog>
  ),
);

const mapDispatchToProps = (dispatch) => ({
  dismiss: () => dispatch(closeModalDialog()),
});

export const ProjectRemoveDialog = connect(
  null,
  mapDispatchToProps,
)(PureProjectRemoveDialog);
