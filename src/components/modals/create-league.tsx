import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import CreateLeagueComponent from "../createLeague";
import { Poppins } from "next/font/google";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
};

type currency = {
  currency: string;
  minWeekly: number;
  minMonthly: number;
  minSeasonal: number;
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
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className={`flex flex-col text-2xl gap-1`}>
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
