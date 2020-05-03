import React, { createContext, useState } from "react";

export const CalendarContext = createContext();

export const CalendarProvider = ({ initialCalendarState, children }) => {
  const [calendarData, setCalendarData] = useState(initialCalendarState);

  return (
    <CalendarContext.Provider
      value={{
        calendarState: [calendarData, setCalendarData],
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
