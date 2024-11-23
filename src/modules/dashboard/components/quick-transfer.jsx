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
import { Button } from "@/components/ui/button";
import { ICON } from "../../../utils/constants";
import PayDialogue from "./pay-dialogue";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { amountSchema } from "../../../schema";
import { defaultAmountValues } from "../utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { EmptyChart } from "../charts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  return (
    <>
      <Card className="border-0">
        <CardContent className="px-[18px] lg:px-[30px] pb-[20px] lg:pb-[35px] pt-[10px] lg:pt-[35px] flex flex-col gap-[22px] lg:gap-[29px] 2xl:aspect-[445/276] lg:grid lg:grid-rows-[1fr_auto]">
          <>
            <Carousel
              plugins={[plugin.current]}
              opts={{
                align: "start",
              }}
              className="grid grid-cols-[1fr_auto] gap-[22px] lg:gap-[28px] items-center"
              onMouseEnter={plugin.current.stop()}
              onMouseLeave={plugin.current.reset()}
            >
              <CarouselContent>
                {accountIsLoading ? (
                  new Array(8).fill(null).map((_, index) => {
                    return (
                      <CarouselItem
                        key={index}
                        className="w-[60px] lg:w-[85px] basis-1/3 md:basis-1/4 lg:basis-1/5 2xl:basis-1/3"
                      >
                        <div className="flex flex-col items-center gap-[12px] lg:gap-[15px]">
                          <Skeleton className="rounded-full h-[50px] w-[50px] lg:w-[70px] lg:h-[70px]" />
                          <div className="flex flex-col items-center w-full gap-2">
                            <Skeleton className="h-[18px] w-full lg:text-[16px] max-w-[60px] lg:max-w-[85px]" />
                            <Skeleton className="h-[18px] w-full text-[12px] lg:text-[15px]" />
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })
                ) : accountData?.results?.length ? (
                  accountData.results.map((account) => {
                    const isSelected = selectedAccountId === account.id;
                    return (
                      <CarouselItem
                        key={account.id}
                        className="w-[60px] lg:w-[85px] basis-1/3 md:basis-1/4 lg:basis-1/5 2xl:basis-1/3"
                      >
                        <div
                          onClick={selectAccountHandler.bind(null, account.id)}
                          className="flex flex-col items-center gap-[12px] lg:gap-[15px]"
                        >
                          <Avatar className="h-[50px] w-[50px] lg:w-[70px] lg:h-[70px]">
                            <AvatarImage
                              className="object-cover"
                              src={account.imageUrl}
                              alt={`@${account.name}`}
                            />
                            <AvatarFallback className="uppercase text-background bg-primary lg:text-[22px]">
                              {getInitials(account.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col items-center">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span
                                  className={cn(
                                    "capitalize text-[12px] lg:text-[16px] truncate max-w-[60px] lg:max-w-[85px]",
                                    isSelected && "font-black"
                                  )}
                                >
                                  {account.name}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent className="bg-foreground">
                                <p>{account.name}</p>
                              </TooltipContent>
                            </Tooltip>

                            <span
                              className={cn(
                                "text-muted capitalize text-[12px] lg:text-[15px] truncate",
                                isSelected && "font-black"
                              )}
                            >
                              {account.identity}
                            </span>
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })
                ) : (
                  <EmptyChart message="No accounts added" />
                )}
              </CarouselContent>
              <CarouselNext />
            </Carousel>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-[auto_1fr] sm:flex sm:justify-between items-center text-nowrap gap-[25px]">
                  <span className="text-muted text-[12px] lg:text-[16px]">
                    Write Amount
                  </span>
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
                              className="pl-[15px] lg:pl-[30px] w-full lg:w-[265px] pr-[115px] lg:pr-[155px] rounded-full lg:rounded-full bg-muted-tertiary border-0"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button
                      disabled={!selectedAccountId || !form.formState.isValid}
                      className="absolute right-0 top-0 h-full rounded-full lg:rounded-full w-[100px] lg:w-[125px] flex gap-[9px] lg:gap-[11px] items-center px-[21px] lg:px-[24px] py-[12px] lg:py-[16px] text-[13px] lg:text-[16px]"
                      type="submit"
                    >
                      Send
                      <img
                        src={ICON.icons.plane}
                        className="h-[14px] lg:h-[22px]"
                        alt="send"
                      />
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </>
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
