import React from "react";
import Week from "./Week";
import uniqueId from "lodash/uniqueId";
import { makecalendar } from "./calendarFuntion";

const Calendar = ({ value, modalHandle }) => {
  let calendar = makecalendar(value);

  return (
    <article
      style={{
        fontSize: "1.6rem",
        display: "flex",
        flexDirection: "column",
        border: "1px solid tomato",
        flexGrow: 1,
      }}
    >
      {calendar &&
        calendar.map((week) => (
          <Week week={week} modalHandle={modalHandle} key={uniqueId()} />
        ))}
    </article>
  );
};

export default Calendar;