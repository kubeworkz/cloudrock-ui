import eventsRegistry from '@cloudrock/events/registry';
import { getUserContext } from '@cloudrock/events/utils';
import { gettext } from '@cloudrock/i18n';

eventsRegistry.registerGroup({
  title: gettext('Authentication events'),
  context: getUserContext,
  events: [
    {
      key: 'auth_logged_in_with_username',
      title: gettext(
        'User {user_link} authenticated successfully with username and password.',
      ),
    },
    {
      key: 'auth_logged_in_with_smart_id_ee',
      title: gettext(
        'User {user_link} authenticated successfully with Smart ID EE.',
      ),
    },
    {
      key: 'auth_logged_in_with_saml2',
      title: gettext('User {user_link} authenticated successfully with SAML2.'),
    },
    {
      key: 'auth_logged_out_with_saml2',
      title: gettext('User {user_link} logged out successfully with SAML2.'),
    },
  ],
});
