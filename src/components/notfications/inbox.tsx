import { Button } from "@nextui-org/react";
import React from "react";

export default function InboxNotifications() {
  return (
    <div
      className="overflow-y-auto p-2"
      style={{
        height: "38vh",
      }}
    >
      <div className="border-b border-divider pb-2 px-2">
        <div className="flex flex-row">
          <h5 className="text-black text-sm">
            Spider Web League{" "}
            <p className="text-gray-500 leading-7">
              accepted your join request
            </p>
          </h5>
        </div>
        <div className="flex flex-row gap-2  justify-between my-2">
          <p className="text-black">23 min ago</p>

          <Button size="sm" color="warning">
            Pay
          </Button>

          <Button size="sm" color="warning" variant="ghost">
            Cancel
          </Button>
        </div>
      </div>

      <div className="border-b border-divider pb-2 px-2">
        <div className="flex flex-row">
          <h5 className="text-black text-sm">
            Spider Web League{" "}
            <p className="text-gray-500 leading-7">
              accepted your join request
            </p>
          </h5>
        </div>
        <div className="flex flex-row gap-2  justify-between my-2">
          <p className="text-black">23 min ago</p>

          <Button size="sm" color="warning">
            Pay
          </Button>

          <Button size="sm" color="warning" variant="ghost">
            Cancel
          </Button>
        </div>
      </div>

      <div className="border-b border-divider pb-2 px-2">
        <div className="flex flex-row">
          <h5 className="text-black text-sm">
            Spider Web League{" "}
            <p className="text-gray-500 leading-7">
              accepted your join request
            </p>
          </h5>
        </div>
        <div className="flex flex-row gap-2  justify-between my-2">
          <p className="text-black">23 min ago</p>

          <Button size="sm" color="warning">
            Pay
          </Button>

          <Button size="sm" color="warning" variant="ghost">
            Cancel
          </Button>
        </div>
      </div>

      <div className="border-b border-divider pb-2 px-2">
        <div className="flex flex-row">
          <h5 className="text-black text-sm">
            Spider Web League{" "}
            <p className="text-gray-500 leading-7">
              accepted your join request
            </p>
          </h5>
        </div>
        <div className="flex flex-row gap-2  justify-between my-2">
          <p className="text-black">23 min ago</p>

          <Button size="sm" color="warning">
            Pay
          </Button>

          <Button size="sm" color="warning" variant="ghost">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
