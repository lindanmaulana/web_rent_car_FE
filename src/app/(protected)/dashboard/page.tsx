import { getSession } from '@/actions/getSession';
import { DashboardMain } from '@/app/(protected)/dashboard/_components/dashboard-main';
const PageDashboard = async () => {
  const session = await getSession()

  const token = session.user.token

  return (
    <div className="w-full space-y-8">
      <DashboardMain token={token} />
    </div>
  );
};

export default PageDashboard;