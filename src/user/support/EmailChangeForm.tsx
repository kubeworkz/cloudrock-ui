import { SubmitButton } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { UserDetails } from '@cloudrock/workspace/types';

import { useEmailChange } from './useEmailChange';

export const EmailChangeForm = ({ user }: { user: UserDetails }) => {
  const { handleSubmit, submitting, email, setEmail } = useEmailChange(user);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      {user.requested_email && (
        <div className="form-group">
          <label htmlFor="emailAddress">{translate('Requested email')}</label>
          <p className="form-control-static">{user.requested_email}</p>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="emailAddress">{translate('New email address')}</label>
        <input
          type="email"
          id="emailAddress"
          className="form-control"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <SubmitButton
        disabled={!email || submitting}
        submitting={submitting}
        label={translate('Verify email')}
      />
    </form>
  );
};
