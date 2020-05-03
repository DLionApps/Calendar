import React, { useContext, useEffect } from "react";

const useHolidays = (props) => {
  //  check the month holidays is exist in local memeory. is not call to API
  // get the holidays in that month
  // setup the holiday array and return it
  const holidaysInMonth = [
    {
      date: 7,
      isMercantile: true,
      isPublic: true,
      isBank: true,
      reason: " Uduwap Full Moon Poya Day",
    },
    {
      date: 10,
      isMercantile: false,
      isPublic: true,
      isBank: true,
      reason: " Good Friday",
    },
    {
      date: 12,
      isMercantile: true,
      isPublic: true,
      isBank: true,
      reason: " Day Prior Sinhala & Hindu New Year",
    },
    {
      date: 13,
      isMercantile: true,
      isPublic: true,
      isBank: true,
      reason: " Sinhala & Hindu New Year Day",
    },
    // {
    //   date: 17,
    //   isMercantile: true,
    //   isPublic: true,
    //   isBank: true,
    //   reason: " Uduwap Full Moon Poya Day",
    // },
    // {
    //   date: 19,
    //   isMercantile: false,
    //   isPublic: true,
    //   isBank: true,
    //   reason: " Good Friday",
    // },
    // {
    //   date: 22,
    //   isMercantile: true,
    //   isPublic: true,
    //   isBank: true,
    //   reason: " Day Prior Sinhala & Hindu New Year",
    // },
    // {
    //   date: 23,
    //   isMercantile: true,
    //   isPublic: true,
    //   isBank: true,
    //   reason: " Sinhala & Hindu New Year Day",
    // },
  ];

  return holidaysInMonth;
};

export default useHolidays;
