import { advanceTo, clear } from 'jest-date-mock';

import * as marketplaceApi from '@cloudrock/marketplace/common/api';
import * as slurmApi from '@cloudrock/slurm/details/api';

import { loadCharts } from './utils';

const componentUsages = require('./fixtures/component-usages.json');
const userUsages = require('./fixtures/user-usages.json');

jest.mock('@cloudrock/slurm/details/api');
jest.mock('@cloudrock/marketplace/common/api');

const slurmApiMock = slurmApi as jest.Mocked<typeof slurmApi>;
const marketplaceApiMock = marketplaceApi as jest.Mocked<typeof marketplaceApi>;

describe('SLURM allocation usage chart formatter', () => {
  beforeEach(() => {
    advanceTo(new Date(2020, 6, 1));
    slurmApiMock.getAllocationUserUsages.mockResolvedValue(userUsages);
    marketplaceApiMock.getComponentUsages.mockResolvedValue(componentUsages);
  });

  afterEach(() => {
    clear();
  });

  it('parses data and returns eChart option correctly', async () => {
    const charts = await loadCharts('allocationUrl', 'resourceUuid');
    expect(charts).toMatchSnapshot();
  });
});
