import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/shadcn/lib/utils";
import { Button } from "@/shadcn/ui/button";
import { Calendar } from "@/shadcn/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { setDate } from "@/slices/reservation/selectionSlice";
import { useSelector, useDispatch } from "react-redux";

export default function DatePicker() {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.selection.date);
  const handleSelect = (selectedDate) => {
    console.log("Shadcn selection: ", selectedDate);
    dispatch(setDate(selectedDate.toISOString()));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"minimal"}
          className={cn(
            "border w-full justify-start text-left font-normal bg-transparent",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-googleBlue" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="text-white">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={(date) =>
            date <= new Date(new Date().setDate(new Date().getDate() - 1))
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
