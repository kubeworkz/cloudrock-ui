import { useRef, FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';

import { formatFilesize } from '@cloudrock/core/utils';
import { translate } from '@cloudrock/i18n';

const FileListComponent = ({ files }) =>
  files instanceof FileList && files.length > 0 ? (
    <ul>
      {Array.from(files).map((file, index) => (
        <li key={index}>
          {translate('{name} ({size})', {
            name: file.name,
            size: formatFilesize(file.size, 'B'),
          })}
        </li>
      ))}
    </ul>
  ) : null;

export const FileField: FunctionComponent<{ input; disabled }> = ({
  input,
  disabled,
}) => {
  const fileInput = useRef<HTMLInputElement>();
  return (
    <div>
      <input
        type="file"
        ref={fileInput}
        multiple={true}
        style={{ display: 'none' }}
        onChange={input.onChange}
      />
      <Button
        disabled={disabled}
        onClick={() => {
          fileInput.current.click();
        }}
      >
        {translate('Select some files')}
      </Button>
      <FileListComponent files={input.value} />
    </div>
  );
};
