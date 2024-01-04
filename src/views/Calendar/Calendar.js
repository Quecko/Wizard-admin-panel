import React, { useState } from 'react';
import DatePicker, { Calendar as MultiDatePickerCalendar, DateObject } from "react-multi-date-picker";

const Calendar = () => {
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('assets/img/dashboardimg', false, /\.(png|jpe?g|svg)$/));

  const [dates, setDates] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(12),
    new DateObject().setDay(14).add(1, "month"),
    new DateObject().setDay(23).add(1, "month"),
  ]);

  return (
    <div className='main-calendar'>
      {/* <img src="/dashboard-assets/issonns.svg" className="img-fluid" /> */}
      <DatePicker
        value={dates}
        onChange={setDates}
        multiple
        numberOfMonths={2}
        placeholderText="Select Dates"
        className="custom-datepicker" // Add a custom class for the date picker
      />
    </div>
  );
}

export default Calendar;
