"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import React from "react";
import { PlusIcon } from "./icons/PlusIcon";
import CreateLeagueModal from "./modals/create-league";

export default function CreateComponentModal() {
  // Modal create league
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <CreateLeagueModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
      <Button
        onPress={onOpen}
        size="sm"
        radius="full"
        endContent={<PlusIcon />}
        className="bg-foreground text-background"
      >
        Create league
      </Button>
    </>
  );
}
