// components/Header.tsx
import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center z-10">
      <Link className="flex items-center justify-center" href="#">
        <span className="font-bold">Santa Clara Quant</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
          Home
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/projects">
          Projects
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/team">
          Our Team
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/events">
          Events
        </Link>
      </nav>
    </header>
  );
};

export default Header;