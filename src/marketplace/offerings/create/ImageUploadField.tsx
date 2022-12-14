import { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';

import { FileUploadField } from '@cloudrock/form';
import { FileUploadFieldProps } from '@cloudrock/form/FileUploadField';
import { translate } from '@cloudrock/i18n';
import { ActionButton } from '@cloudrock/table/ActionButton';

const getImageUrl = (image) => {
  if (image instanceof File) {
    return URL.createObjectURL(image);
  }
  if (typeof image === 'string') {
    return image;
  }
  return '';
};

export const ImageUploadField: FunctionComponent<FileUploadFieldProps> = (
  props,
) => {
  if (!props.input.value) {
    return <FileUploadField {...props} />;
  }
  return (
    <div style={{ maxHeight: 200, maxWidth: 200 }}>
      <Row>
        <Col md={5}>
          <div className="image">
            <img
              src={getImageUrl(props.input.value)}
              alt={translate('Image here')}
            />
          </div>
        </Col>
        <Col md={7}>
          <div>
            <FileUploadField
              className="btn btn-sm btn-primary m-b-sm"
              {...props}
            />
          </div>
          {props.input.value && (
            <ActionButton
              className="btn btn-sm btn-danger m-b-sm"
              title={translate('Remove')}
              action={() => props.input.onChange(null)}
              icon="fa fa-trash"
            />
          )}
        </Col>
      </Row>
    </div>
  );
};
