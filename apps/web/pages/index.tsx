import { NextPage } from "next";
import { privatePage } from "../router";

const Dashboard: NextPage = () => {
  return (
    <div>
      <h1>DASHBOARD</h1>
    </div>
  );
};

export default privatePage(Dashboard);
