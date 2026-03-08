import React from "react";
import { Icon } from "@iconify/react";

function DashBoardCard({ title, value, description, className, children }) {
  return (
    <div className={`flex flex-col justify-between h-40 p-4 shadow-md rounded-2xl ${className}`}>
      
      <div className="flex items-center justify-between">
        <p className="font-medium">{title}</p>
        <Icon icon="prime:arrow-up-right" width="24" height="24" className="opacity-80"/>
      </div>

      <div className="flex">
        {children ? children : <div className="text-4xl font-semibold">{value}</div>}
      </div>

      <p className="text-sm opacity-80">{description}</p>

    </div>
  );
}

export default DashBoardCard;