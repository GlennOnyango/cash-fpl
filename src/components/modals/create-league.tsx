import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import CreateLeagueComponent from "../createLeague";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
};

export default function CreateLeagueModal({
  isOpen,
  onOpen,
  onOpenChange,
}: Props) {
  return (
    <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col text-2xl gap-1">
              Create League
            </ModalHeader>
            <ModalBody>
              <CreateLeagueComponent />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
