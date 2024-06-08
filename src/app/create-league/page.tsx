"use client";
import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Create from "@/components/createLeague/league";
import ManagerPageNavbar from "@/components/navbars/manager-nav";
import Rules from "@/components/createLeague/rules";
import LeagueTypes from "@/components/createLeague/leagueType";

export default function Page() {
  const [disabledKeys, setDisabledKeys] = useState([
    "rules",
    "types",
    "amounts",
  ]);

  const [selected, setSelected] = React.useState("create");

  return (
    <ManagerPageNavbar>
      <div className="grow flex w-full flex-col justify-center items-center">
        <Tabs
          disabledKeys={disabledKeys}
          aria-label="Options"
          selectedKey={selected}
        >
          <Tab key="create" title="Create Leagues">
            <Card>
              <CardBody>
                <Create disKeys={setDisabledKeys} displayKey={setSelected} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="rules" title="Select League Rules">
            <Card>
              <CardBody>
                <Rules disKeys={setDisabledKeys} displayKey={setSelected} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="types" title="Select League Type">
            <Card>
              <CardBody>
                <LeagueTypes
                  disKeys={setDisabledKeys}
                  displayKey={setSelected}
                />
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
