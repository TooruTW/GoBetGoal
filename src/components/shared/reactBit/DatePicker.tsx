"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";

interface DatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "選擇開始日期",
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  // 將字串日期轉換為 Date 物件
  const date = value ? new Date(value) : undefined;

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // 將日期轉換為 YYYY-MM-DD 格式的字串
      const dateString = dayjs(selectedDate).format("YYYY-MM-DD");

      onChange?.(dateString);
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="datePicker"
            id="date"
            size="datePicker"
            className="w-full justify-between font-normal py-2.5 text-p px-4"
          >
            {date ? date.toLocaleDateString() : placeholder}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0  bg-schema-surface-container-highest text-schema-on-surface"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleDateSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
