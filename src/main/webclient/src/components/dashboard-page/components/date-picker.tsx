import React, { FC, forwardRef, useMemo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  StyleObjectOrFn,
  Text,
  useTheme,
  css as chakraCSS,
  Icon,
  Box,
  HStack,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, Event } from "@mui/icons-material";
import { UIProps } from "../../../config/config";

const CustomInput = forwardRef<any, any>((props, ref) => {
  return (
    <InputGroup>
      <Input focusBorderColor='green.600' {...props} ref={ref} />
      <InputRightElement
        userSelect="none"
        pointerEvents="none"
        children={<Icon as={Event} />}
      />
    </InputGroup>
  );
});

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: any) => {
  return (
    <HStack pb={1} alignItems="center" textAlign="left" pl={4} pr={2}>
      <Text color="white" flex={1} fontSize="sm" fontWeight="medium">
        {new Intl.DateTimeFormat("en-AU", {
          year: "numeric",
          month: "long",
        }).format(date)}
      </Text>
      <IconButton
        borderRadius="full"
        size="sm"
        variant="ghost"
        aria-label="Previous Month"
        icon={<Icon as={ChevronLeft} />}
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      />
      <IconButton
        borderRadius="full"
        size="sm"
        variant="ghost"
        aria-label="Next Month"
        icon={<Icon as={ChevronRight} />}
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      />
    </HStack>
  );
};

function useDatePickerStyles() {
  const theme = useTheme();
  return useMemo(() => {
    const defaultStyles: StyleObjectOrFn = {
      p: 2,
      bg: UIProps.colors.background,
      border: "1px solid",
      borderColor: "gray.100",
      "& .react-datepicker": {
        "&--open": {
          borderColor: "green.500", // Zielone obramowanie dla otwartego kalendarza
        },
        "&__header": {
          bg: "green",
          borderBottom: "none",
        },
        "&__month": {
          mt: 0,
        },
        "&__day-name": {
          color: "gray.200",
          fontWeight: "medium",
          w: 7,
        },
        "&__day": {
          lineHeight: "28px",
          color: "gray.700",
          w: 7,
          h: 7,
          borderRadius: "full",
        },
        "&__day:not(.react-datepicker__day--selected, .react-datepicker__day--keyboard-selected):hover":
          {
            bg: "white",
            boxShadow: "0 0 1px 1px rgba(0,0,0,0.2)",
          },
        "&__day--today": {
          bg: "green.100",
          fontWeight: "400",
        },
        "&__day--selected, &__day--keyboard-selected": {
          bg: "green.700",
          color: "white",
        },
      },
    };
    return chakraCSS(defaultStyles)(theme);
  }, [theme]);
}

export interface DatePickerProps {
  value: Date;
  onChange: (date: Date | null) => void;
}

export const ChakraDatePicker: FC<DatePickerProps> = ({ value, onChange }) => {
  const styles = useDatePickerStyles();

  return (
    <Box sx={styles}>
      <ReactDatePicker
        dateFormat="dd MMMM, yyy"
        showPopperArrow={false}
        popperPlacement="bottom"
        calendarClassName="chakra-datepicker"
        selected={value}
        onChange={(date) =>
          Array.isArray(date) ? onChange(date[0]) : onChange(date)
        }
        customInput={<CustomInput />}
        renderCustomHeader={(props) => <CustomHeader {...props} />}
      />
    </Box>
  );
};
