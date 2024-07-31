import { Button } from "@nextui-org/react";
import React from "react";

export default function CompetitionsNotifications() {
  return (
    <div className="border-b border-divider pb-4 px-2">
      <div className="flex flex-row gap-2 ">
        <h5 className="text-black text-xl">League Name</h5>
        <p className="text-gray-500 leading-7">accepted your join request</p>
      </div>
      <div className="flex flex-row gap-2  my-2">
        <p className="text-black">23 min ago</p>
        <p className="text-black"> Competition</p>
      </div>
      <div >
        <Button size="sm" color="warning">
          Pay
        </Button>
      </div>
    </div>
  );
}
