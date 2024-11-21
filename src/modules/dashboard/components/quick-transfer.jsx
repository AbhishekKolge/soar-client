import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { useGetAccountQuery } from "../../../features/account/account-api-slice";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "../../../utils/helper";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { truncate } from "lodash";
import { Button } from "@/components/ui/button";
import { ICON } from "../../../utils/constants";
import PayDialogue from "./pay-dialogue";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { amountSchema } from "../../../schema";
import { defaultAmountValues } from "../utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { EmptyChart } from "../charts";

const QuickTransfer = () => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const { data: accountData, isLoading: accountIsLoading } = useGetAccountQuery(
    {}
  );

  const selectAccountHandler = (id) => {
    setSelectedAccountId((prevState) => {
      if (prevState === id) {
        return null;
      }
      return id;
    });
  };

  const form = useForm({
    resolver: zodResolver(amountSchema),
    defaultValues: defaultAmountValues,
    mode: "onChange",
  });

  function onSubmit(values) {
    setAmount(values.amount);
    setOpen(true);
    form.reset();
  }

  if (accountIsLoading) {
    return <Skeleton className="rounded-[15px] aspect-[1.61/1]" />;
  }

  return (
    <>
      <Card>
        <CardContent className="h-full py-[30px] px-[30px] lg:px-[25px] lg:py-[35px] aspect-[1.61/1] grid gap-[29px]">
          {accountData?.results?.length ? (
            <>
              <Carousel
                plugins={[plugin.current]}
                opts={{
                  align: "start",
                }}
                className="w-[88%] mt-auto"
                onMouseEnter={plugin.current.stop()}
                onMouseLeave={plugin.current.reset()}
              >
                <CarouselContent>
                  {accountData.results.map((account) => {
                    const isSelected = selectedAccountId === account.id;
                    return (
                      <CarouselItem
                        key={account.id}
                        className="md:basis-1/2 lg:basis-1/3"
                      >
                        <div
                          onClick={selectAccountHandler.bind(null, account.id)}
                          className="flex flex-col items-center gap-[15px] cursor-pointer aspect-[1.61/1]"
                        >
                          <Avatar className="h-[70px] w-[70px]">
                            <AvatarImage
                              className="object-cover"
                              src={account.imageUrl}
                              alt={`@${account.name}`}
                            />
                            <AvatarFallback className="uppercase text-background bg-primary">
                              {getInitials(account.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col items-center">
                            <span
                              className={cn(
                                "capitalize transition-all ease-in-out duration-50",
                                isSelected && "font-black"
                              )}
                            >
                              {truncate(account.name, {
                                length: 10,
                              })}
                            </span>
                            <span
                              className={cn(
                                "text-muted capitalize text-[15px] transition-all ease-in-out duration-50",
                                isSelected && "font-black"
                              )}
                            >
                              {truncate(account.identity, {
                                length: 10,
                              })}
                            </span>
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselNext />
              </Carousel>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <div className="mt-auto flex items-center gap-[27px] justify-between">
                    <span className="text-muted">Write Amount</span>
                    <div className="relative">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                disabled={!selectedAccountId}
                                placeholder="$"
                                {...field}
                                type="number"
                                className="lg:rounded-[50px] w-[265px] border-muted-tertiary bg-muted-tertiary py-4 px-[30px] pr-[140px]"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Button
                        disabled={!selectedAccountId || !form.formState.isValid}
                        className="bg-foreground flex gap-[11px] w-[125px] items-center lg:rounded-[50px] absolute right-0 top-0"
                        type="submit"
                      >
                        Send
                        <img
                          src={ICON.icons.plane}
                          className="w-[26px]"
                          alt="send"
                        />
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </>
          ) : (
            <EmptyChart />
          )}
        </CardContent>
      </Card>
      <PayDialogue
        open={open}
        setOpen={setOpen}
        id={selectedAccountId}
        amount={amount}
      />
    </>
  );
};

export default QuickTransfer;
