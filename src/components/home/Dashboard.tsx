import { AnalyticInfo } from "@/types/dashboard.types";
import React from "react";
import DashboardWrapper from "./DashboardWrapper";

const Dashboard = () => {
  const userInfo: AnalyticInfo[] = [
    {
      header: "Total API Calls",
      value: 12,
    },
    {
      header: "Failed API Calls",
      value: 5,
    },
  ];

  return (
    <DashboardWrapper>
      <section className="  flex flex-col gap-y-4">
        <section className="grid grid-cols-2 gap-x-5">
          {userInfo.map((info) => (
            <Info key={info.header} info={info} />
          ))}
        </section>
      </section>
    </DashboardWrapper>
  );
};

function Info({ info }: { info: AnalyticInfo }) {
  return (
    <div className=" border rounded-xl p-4  space-y-2 border-gray-700 shadow-sm">
      <h2 className=" text-lg  font-medium">{info.header}</h2>
      <p className=" text-6xl  font-extrabold">{info.value}</p>
    </div>
  );
}

export default Dashboard;
