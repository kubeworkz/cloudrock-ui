import { getScopeChartOptions } from '@cloudrock/dashboard/chart';
import { getEventStats } from '@cloudrock/events/api';
import { translate } from '@cloudrock/i18n';
import { getUserChecklistScore } from '@cloudrock/marketplace-checklist/api';
import { User } from '@cloudrock/workspace/types';

export async function loadCharts(user: User, hasChecklists: boolean) {
  const eventStats = (
    await getEventStats({
      scope: user.url,
      page_size: 12,
    })
  ).reverse();
  const dates = eventStats.map((row) =>
    translate('{count} user events in {date}', {
      count: row.count,
      date: `${row.month}-${row.year}`,
    }),
  );
  const values = eventStats.map((row) => row.count);
  const events = {
    chart: getScopeChartOptions(dates, values),
    title: translate('User events this month'),
    current: eventStats[eventStats.length - 1].count,
  };
  if (hasChecklists) {
    const checklists = await getUserChecklistScore(user.uuid);
    return { events, checklists };
  } else {
    return { events };
  }
}
