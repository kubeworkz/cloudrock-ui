import { connect } from 'react-redux';

import { RootState } from '@cloudrock/store/reducers';
import { getUser } from '@cloudrock/workspace/selectors';

import { UserEvents } from './UserEvents';

const mapsStateToProps = (state: RootState) => ({ user: getUser(state) });

export const CurrentUserEvents = connect(mapsStateToProps)(UserEvents);
