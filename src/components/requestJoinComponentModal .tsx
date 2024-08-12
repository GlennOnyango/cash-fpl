"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import React from "react";
import { CompetitionTypesProps } from "@/utils/types";
import RequestJoinModal from "./modals/request-join";

type Props = {
  competition: CompetitionTypesProps;
};

export default function RequestJoinComponentModal({ competition }: Props) {
  // Modal create league
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex items-center justify-start">
      <RequestJoinModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        competition={competition}
      />

      <Button
        onPress={onOpen}
        size="sm"
        variant="shadow"
        radius="full"
        color="warning"
      >
        Join
      </Button>
    </div>
  );
}
