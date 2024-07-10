import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import CreateLeagueComponent from "../createLeague";
import { Poppins } from "next/font/google";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
};

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function CreateLeagueModal({
  isOpen,
  onOpen,
  onOpenChange,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      className={`${poppins.className}`}
      size="4xl"
      onOpenChange={onOpenChange}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader
              className={`text-default-900 flex flex-row text-2xl gap-1`}
            >
              Create League
              <Link href="/leagues" className="text-blue-500 text-sm">
                Learn more
              </Link>
            </ModalHeader>
            <ModalBody>
              <CreateLeagueComponent onClose={onClose} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
