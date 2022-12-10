import { Division } from '@cloudrock/marketplace/types';

export const DivisionsField = (fieldProps) => {
  const divisions = fieldProps.fields
    .getAll()
    .map((division: Division) => division.name)
    .join(', ');
  return <div className="form-control-static">{divisions}</div>;
};
