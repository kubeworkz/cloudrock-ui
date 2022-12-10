import { get } from '@cloudrock/core/api';
import { getCustomer } from '@cloudrock/project/api';
import store from '@cloudrock/store/store';
import { UsersService } from '@cloudrock/user/UsersService';
import { setCurrentCustomer } from '@cloudrock/workspace/actions';
import {
  checkCustomerUser,
  getCustomer as getCustomerSelector,
} from '@cloudrock/workspace/selectors';
import { User } from '@cloudrock/workspace/types';

class CustomersServiceClass {
  getUsers(customerUuid) {
    return get<User[]>(`/customers/${customerUuid}/users/`).then(
      (response) => response.data,
    );
  }

  get(customerUuid) {
    return getCustomer(customerUuid);
  }

  isOwnerOrStaff() {
    const customer = getCustomerSelector(store.getState());
    return UsersService.getCurrentUser().then((user) => {
      return checkCustomerUser(customer, user);
    });
  }

  refreshCurrentCustomer(customerUuid) {
    return this.get(customerUuid).then((customer) => {
      store.dispatch(setCurrentCustomer(customer));
      return customer;
    });
  }
}
export const CustomersService = new CustomersServiceClass();
