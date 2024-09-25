"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from 'react';
import Header from '@/components/ui/header'; // Adjust the import path if necessary
import Footer from "./ui/footer";

// Mock data for events
const events = [
  { id: 1, date: "2024-09-26", title: "Campus Fair", content: "Outside SCIDI from 5pm" },
  { id: 2, date: "2024-10-29", title: "Guest Speaker!" },
  { id: 3, date: "2024-10-03", title: "Weekly Meeting", content: "Details to follow" },
  { id: 4, date: "2024-10-07", title: "Interviews Begin", content: "Details to follow" },
];

export function EventsPage() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const isToday = (day: number) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };

  const changeMonth = (increment: number) => {
    setCurrentDate(new Date(currentYear, currentMonth + increment, 1));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow overflow-auto p-4 text-center">
        <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none p-4">
          Upcoming Events
        </h1>
        <div className="flex justify-center flex-grow overflow-hidden">
          <div className="event-grid w-2/3 flex flex-col h-full">
            <div className="flex justify-between items-center mb-2">
              <Button variant="outline" onClick={() => changeMonth(-1)}>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <Button variant="outline" onClick={() => changeMonth(1)}>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-grow overflow-auto">
              <div className="grid grid-cols-7 gap-0.5 h-full">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                    {day}
                  </div>
                ))}
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square"></div>
                ))}
                {days.map((day) => {
                  const date = new Date(currentYear, currentMonth, day);
                  const dateString = date.toISOString().split("T")[0];
                  const eventForDay = events.find((event) => event.date === dateString);

                  return (
                    <div
                      key={day}
                      className={`aspect-square p-1 border border-gray-200 rounded-md flex flex-col text-black ${isToday(day) ? "bg-blue-100" : "bg-white"
                        } ${eventForDay ? "border-blue-300" : ""}`}
                      style={{ flexGrow: 1, flexShrink: 1, flexBasis: '0%', height: '129px' }} // Make squares dynamically adjust size
                    >
                      <div className={`text-right text-xs font-semibold ${isToday(day) ? "font-bold" : ""}`}>
                        {day}
                      </div>
                      {eventForDay && (
                        <div className="flex items-center justify-center text-center w-full h-full p-2">
                          <span className="text-[#b30738] text-lg leading-tight break-words overflow-hidden">
                            {eventForDay.title}
                            {eventForDay.content && (
                              <span className="block text-sm text-gray-500 mt-1">
                                {eventForDay.content}
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default EventsPage;

