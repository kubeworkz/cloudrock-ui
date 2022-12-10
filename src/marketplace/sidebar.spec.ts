import {
  getDefaultItems,
  getPublicServices,
  orgWorkspaceCallbackFn,
} from '@cloudrock/marketplace/sidebar';
import store from '@cloudrock/store/store';

import { customer } from './fixtures';

jest.mock('@cloudrock/configs/default', () => ({
  ENV: {
    plugins: {
      CLOUDROCK_AUTH_SOCIAL: {
        ENABLE_EDUTEAMS_SYNC: false,
      },
    },
  },
}));

jest.mock('@cloudrock/store/store');

const storeMock = store as jest.Mocked<typeof store>;

describe('Sidebar', () => {
  it('returns items for public services', () => {
    storeMock.getState.mockReturnValue({
      workspace: {
        customer: {
          ...customer,
        },
      },
    } as any);

    expect(orgWorkspaceCallbackFn()).toContainEqual(
      expect.objectContaining(getPublicServices(customer.uuid)),
    );
  });

  it('returns default sidebar items', () => {
    storeMock.getState.mockReturnValue({
      workspace: {
        customer: {
          ...customer,
          is_service_provider: false,
        },
      },
    } as any);
    expect(orgWorkspaceCallbackFn()).toEqual(
      expect.arrayContaining(getDefaultItems(customer.uuid)),
    );
  });
});
