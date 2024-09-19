import React from 'react';
import Header from '@/components/ui/header'; // Adjust the import path if necessary

const EventsPage = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="mt-4">
          Welcome to the Projects page. Here you can find more information about our organization.
        </p>
      </main>
    </div>
  );
};

export default EventsPage;