import { Size, Image } from '@cloudrock/azure/common/types';
import { ENV } from '@cloudrock/configs/default';
import { getSelectData } from '@cloudrock/core/api';
import { returnReactSelectAsyncPaginateObject } from '@cloudrock/core/utils';
import { formatFlavor } from '@cloudrock/resource/utils';

export const getSizeLabel = (size: Size): string => {
  const summary = formatFlavor({
    disk: size.os_disk_size_in_mb + size.resource_disk_size_in_mb,
    cores: size.number_of_cores,
    ram: size.memory_in_mb,
  });
  const name = size.name.replace(/_/g, ' ');
  return `${name} (${summary})`;
};

export const getImageLabel = (image: Image): string =>
  `${image.publisher} ${image.name} ${image.sku}`;

export const loadLocationOptions = async (
  settings_uuid: string,
  query: string,
  prevOptions,
  currentPage: number,
) => {
  const response = await getSelectData('/azure-locations/', {
    settings_uuid,
    name: query,
    page: currentPage,
    page_size: ENV.pageSize,
    has_sizes: true,
  });
  return returnReactSelectAsyncPaginateObject(
    response,
    prevOptions,
    currentPage,
  );
};

export const loadSizeOptions = async (
  settings_uuid: string,
  location_uuid: string,
  zone: number,
  query: string,
  prevOptions,
  currentPage: number,
) => {
  const response = await getSelectData('/azure-sizes/', {
    settings_uuid,
    location_uuid,
    zone,
    name: query,
    page: currentPage,
    page_size: ENV.pageSize,
    has_sizes: true,
  });
  return returnReactSelectAsyncPaginateObject(
    response,
    prevOptions,
    currentPage,
  );
};

export const loadImageOptions = async (
  settings_uuid: string,
  location_uuid: string,
  query: string,
  prevOptions,
  currentPage: number,
) => {
  const response = await getSelectData('/azure-images/', {
    settings_uuid,
    location_uuid,
    name: query,
    page: currentPage,
    page_size: ENV.pageSize,
    has_sizes: true,
  });
  return returnReactSelectAsyncPaginateObject(
    response,
    prevOptions,
    currentPage,
  );
};
