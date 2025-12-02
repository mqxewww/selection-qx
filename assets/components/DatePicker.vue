<script lang="ts" setup>
import type { DateValue } from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { df } from "~/lib/utils.ts";

type Props = {
  hideIcon?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
};

const date = defineModel<DateValue>();
const props = defineProps<Props>();
</script>

<template>
  <Popover v-slot="{ close }">
    <PopoverTrigger as-child>
      <Button
        :class="`w-[20ch] justify-start text-left font-normal ${!date && 'text-muted-foreground'}`"
        :disabled="props.isDisabled"
        variant="outline"
      >
        <CalendarIcon v-if="!props.hideIcon" />
        {{ date ? df(date) : placeholder || "Choisissez une date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent align="start" class="w-auto p-0">
      <Calendar
        v-model="date"
        :default-placeholder="date"
        initial-focus
        layout="month-and-year"
        @update:model-value="close"
      />
    </PopoverContent>
  </Popover>
</template>
