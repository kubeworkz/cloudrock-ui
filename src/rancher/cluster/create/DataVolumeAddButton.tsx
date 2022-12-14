import { withTranslation, TranslateProps } from '@cloudrock/i18n';

interface DataVolumeAddButtonProps extends TranslateProps {
  onClick(): void;
}

export const DataVolumeAddButton = withTranslation(
  (props: DataVolumeAddButtonProps) => (
    <button type="button" className="btn btn-default" onClick={props.onClick}>
      <i className="fa fa-plus" /> {props.translate('Add data volume')}
    </button>
  ),
);
