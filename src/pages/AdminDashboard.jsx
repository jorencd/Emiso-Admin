import Sidebar from "../components/common/sidebar/Sidebar";
import DashBoardCard from "../components/common/cards/DashBoardCard";
import dashboardCardData from "../assets/data/cardData";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const readerData = [
  { day: "Mon", readers: 20 },
  { day: "Tue", readers: 35 },
  { day: "Wed", readers: 40 },
  { day: "Thu", readers: 28 },
  { day: "Fri", readers: 58 },
];

function AdminDashboard() {
  return (
    <div className="flex w-full h-full gap-x-2 ">
      <Sidebar />

      <div className="w-full h-screen p-2 px-10 border border-green-700">
        <h1 className="mt-3 text-xl font-bold text-neutral-700">Dashboard</h1>
        <p className="mb-4 text-neutral-500">
          Your library, your progress, your stories.
        </p>
        <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-4">
          {dashboardCardData.map((card) => (
            <DashBoardCard
              key={card.id}
              title={card.title}
              icon={card.icon}
              value={card.value}
              description={card.description}
              className={card.className}
              arrow={card.arrow}
            >
              {card.title === "Active Readers" ? (
                <ResponsiveContainer width="100%" height={60}>
                  <LineChart data={readerData}>
                    <Line
                      type="monotone"
                      dataKey="readers"
                      stroke="#6366f1"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : null}
            </DashBoardCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
