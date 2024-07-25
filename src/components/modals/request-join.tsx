import { joinCompetitionAction } from "@/app/actions";
import { CompetitionTypesProps } from "@/utils/types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "../submit";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  competition: CompetitionTypesProps;
};

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });

const initialState = {
  message: "",
};

export default function RequestJoinModal({
  isOpen,
  onOpen,
  onOpenChange,
  competition,
}: Props) {
  const [state, formAction] = useFormState(joinCompetitionAction, initialState);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    console.log(state.message);
    if (
      state.message ===
      "Failed to join the competition. Please try again or contact us."
    ) {
      setRequestSent(true);
    }
  }, [state.message]);

  if (requestSent) {
    return (
      <Modal
        isOpen={isOpen}
        className={`${poppins.className}`}
        size="md"
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                className={`text-default-900 flex flex-row text-2xl gap-1`}
              >
                Request Join
              </ModalHeader>
              <ModalBody>
                <p className="text-default-900 text-medium text-center">
                  Your request to join the competition has been sent
                  successfully. You will receive a notification once your
                  request has been approved.
                </p>
                <ShieldCheckIcon className="h-20 w-20 mx-auto text-green-500" />
                <Button
                  onPress={onClose}
                  size="md"
                  variant="shadow"
                  radius="full"
                  color="success"
                  className="mt-4"
                >
                  Close
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      className={`${poppins.className}`}
      size="xl"
      onOpenChange={onOpenChange}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader
              className={`text-default-900 flex flex-row text-2xl gap-1`}
            >
              Request Join
            </ModalHeader>
            <ModalBody>
              <p className="text-default-900 text-medium text-center">
                Below is the information about the competition you are about to
                join. Go through it and make sure you understand the rules and
                regulations of the competition. If you have any questions, feel
                free to ask the competition admin.
              </p>

              <div className="col-span-3 flex flex-col items-center justify-center">
                {state.message !== "" &&
                state.message !== "Request join sent successfully" ? (
                  <p className="bg-red-100 rounded-md py-2 px-3 my-2 text-gray-900">
                    {state.message}
                  </p>
                ) : null}
              </div>

              <p className="text-gray-500 text-lg text-center mt-4">
                Competition Name:{" "}
                <span className="text-default-900">
                  {"competition.leagueName"}
                </span>
              </p>
              <p className="text-gray-500 text-lg text-center">
                Competition Duration:{" "}
                <span className="text-default-900">
                  {competition.competitionDuration}
                </span>
              </p>
              <p className="text-gray-500 text-lg text-center">
                Currency:{" "}
                <span className="text-default-900">
                  {"competition.currency"}
                </span>
              </p>
              <p className="text-gray-500 text-lg text-center">
                Penalty:
                <span className="text-default-900">
                  {competition.enableExcessTransferPenalty ? "Yes" : "No"}
                </span>
              </p>
              <p className="text-gray-500 text-lg text-center">
                Amount:{" "}
                <span className="text-default-900">{competition.amount}</span>
              </p>
            </ModalBody>

            <ModalFooter className="bg-gray-800 mt-4">
              <Button
                onPress={onClose}
                size="md"
                variant="shadow"
                radius="full"
                color="warning"
              >
                Cancel
              </Button>
              <form action={formAction}>
                <input
                  type="hidden"
                  name="leagueId"
                  value={competition.leagueId}
                  placeholder="Enter a message"
                  className="w-full border-1 border-gray-800 rounded-xl"
                />

                <input
                  type="hidden"
                  name="competition"
                  value={competition.competitionDuration}
                />

                <SubmitButton btnText="Send Request" />
              </form>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
