import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  useDeleteCreditCardMutation,
  useGetCreditCardQuery,
  useUpdateCreditCardMutation,
} from "../../../features/credit-card/credit-card-api-slice";
import { AddCard, CardLoading, EmptyCard, UpdateCard } from "../components";
import { getColorBasedOnCardNumber, successToast } from "../../../utils/helper";
import { DeleteConfirmation } from "../../../components/ui/delete-confirmation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useDisclosure } from "../../../utils/hooks";
import { CreditCard } from "../../../components/ui/credit-card";
import { PlaceholderCard } from "../../dashboard/components";

const CreditCardList = () => {
  const { isOpen: openDelete, setOpen: setOpenDelete } =
    useDisclosure("delete-card");
  const { isOpen: openAddCard, setOpen: setOpenAddCard } =
    useDisclosure("add-card");
  const { isOpen: openEditCard, setOpen: setOpenEditCard } =
    useDisclosure("edit-card");
  const [selectedCard, setSelectedCard] = useState(null);
  const { data: creditCardData, isLoading: creditCardIsLoading } =
    useGetCreditCardQuery({});

  const [deleteCreditCard, { isLoading: deleteCreditCardIsLoading }] =
    useDeleteCreditCardMutation();

  const [updateCreditCard] = useUpdateCreditCardMutation();

  const deleteCreditCardHandler = () => {
    if (selectedCard) {
      deleteCreditCard(selectedCard.id)
        .unwrap()
        .then(() => {
          successToast("Credit card deleted successfully");
        })
        .finally(() => {
          setOpenDelete(false);
        });
    } else {
      setOpenDelete(false);
    }
  };

  const setActiveHandler = (details) => {
    updateCreditCard({
      details: {
        isSelected: true,
      },
      id: details.id,
    })
      .unwrap()
      .then(() => {
        successToast("Credit card set to active successfully");
      });
  };

  const editSelectHandler = (cardDetails) => {
    setSelectedCard(cardDetails);
    setOpenEditCard(true);
  };

  const deleteSelectHandler = (cardDetails) => {
    setSelectedCard(cardDetails);
    setOpenDelete(true);
  };

  const openAddCardHandler = () => {
    setOpenAddCard(true);
  };

  const hasCards = !!creditCardData?.creditCards.length;

  return (
    <>
      <Card className="w-full">
        <CardHeader className="lg:pb-[41px]">
          <div className="flex items-center justify-end">
            <Button onClick={openAddCardHandler} variant="outline">
              <PlusCircledIcon className="!h-5 !w-5" />
              Add card
            </Button>
          </div>
        </CardHeader>
        <CardContent
          className={cn(
            (hasCards || creditCardIsLoading) &&
              "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 grid-flow-row-dense"
          )}
        >
          {creditCardIsLoading ? (
            <CardLoading />
          ) : hasCards ? (
            <>
              {creditCardData.creditCards.map((card) => {
                const dark = getColorBasedOnCardNumber(card.id);
                return (
                  <CreditCard
                    key={card.id}
                    details={card}
                    dark={dark}
                    onDelete={deleteSelectHandler}
                    onActive={setActiveHandler}
                    onEdit={editSelectHandler}
                  />
                );
              })}
              <PlaceholderCard replace />
            </>
          ) : (
            <EmptyCard />
          )}
        </CardContent>
      </Card>
      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={deleteCreditCardHandler}
        isLoading={deleteCreditCardIsLoading}
      />
      <AddCard open={openAddCard} setOpen={setOpenAddCard} />
      <UpdateCard
        open={openEditCard}
        setOpen={setOpenEditCard}
        selectedCard={selectedCard}
      />
    </>
  );
};

export default CreditCardList;
