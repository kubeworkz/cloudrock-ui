import { useRouter } from '@uirouter/react';

import { ENV } from '@cloudrock/configs/default';

export const useSupport = () => {
  const router = useRouter();
  if (!ENV.plugins.CLOUDROCK_SUPPORT) {
    router.stateService.go('errorPage.notFound');
  }
};
