import * as slurmApi from '@cloudrock/slurm/details/api';

import {
  getField,
  renderSummary,
  resource,
  associations,
} from './SlurmAllocationSummary.fixture';

jest.mock('@cloudrock/core/Link', () => {
  return {
    Link: ({ label, children }) => <a>{label || children}</a>,
  };
});
jest.mock('@cloudrock/slurm/details/api');

const slurmApiMock = slurmApi as jest.Mocked<typeof slurmApi>;

jest.mock('@cloudrock/configs/default', () => ({
  ENV: {
    plugins: {
      CLOUDROCK_FREEIPA: { ENABLED: true, USERNAME_PREFIX: 'cloudrock_' },
      CLOUDROCK_MARKETPLACE: { ENABLE_RESOURCE_END_DATE: true },
    },
  },
}));

describe('SlurmAllocationSummary', () => {
  it('renders quota usage', async () => {
    const wrapper = await renderSummary({ resource });
    expect(getField(wrapper, 'CPU')).toBe('2.00h of 40.00h');
    expect(getField(wrapper, 'GPU')).toBe('0.00h of ∞');
    expect(getField(wrapper, 'RAM')).toBe('1 GB-h of 1 GB-h');
  });

  it('renders login details', async () => {
    const wrapper = await renderSummary({ resource });
    expect(getField(wrapper, 'Login with')).toBe('ssh admin@example.com');
  });

  it('renders placeholder if login details are absent', async () => {
    const wrapper = await renderSummary({
      resource: { ...resource, username: undefined },
    });
    expect(getField(wrapper, 'Login with')).toBe(
      'FreeIPA account needs to be set up.',
    );
  });

  it('renders submit details for SLURM', async () => {
    slurmApiMock.getSlurmAssociations.mockResolvedValue(associations);
    const wrapper = await renderSummary({ resource });
    expect(getField(wrapper, 'Submit with')).toBe('sbatch -A VALID_ID');
  });

  it("renders message for SLURM when association between user and allocation doesn't exist", async () => {
    slurmApiMock.getSlurmAssociations.mockResolvedValue([]);
    const wrapper = await renderSummary({ resource });
    expect(getField(wrapper, 'Submit with')).toBe(
      'Your account is not authorized to use this allocation',
    );
  });

  it('renders documentation link', async () => {
    slurmApiMock.getSlurmAssociations.mockResolvedValue(associations);
    const homepage = 'https://example.com/';
    const resource_data = { ...resource, homepage };
    const wrapper = await renderSummary({ resource: resource_data });
    const link = wrapper.find({ label: 'Submit with' }).find('a').first();
    expect(link.prop('href')).toBe(homepage);
  });
});
