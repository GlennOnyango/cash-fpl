"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Create from "@/components/createLeague/league";
import ManagerPageNavbar from "@/components/navbars/manager-nav";

export default function Page() {
  const disabledKeys = ["rules", "types", "amounts"];
  return (
    <ManagerPageNavbar>
      <div className="grow flex w-full flex-col justify-center items-center">
        <Tabs disabledKeys={disabledKeys} aria-label="Options">
          <Tab key="create" title="Create Leagues">
            <Card>
              <CardBody>
                <Create />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="rules" title="Select League Rules">
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="types" title="Select League Type">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>

          <Tab key="amounts" title="Set Payment Amounts">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </ManagerPageNavbar>
  );
}
