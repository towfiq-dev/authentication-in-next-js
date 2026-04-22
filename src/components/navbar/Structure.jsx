'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Structure = ({children, href, className}) => {
  const pathName = usePathname()
  const isActive = pathName
  return (
    <li>
      <Link href={href} className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all duration-300 font-medium ${isActive === href? 'border-2 border-blue-500 bg-green-400 rounded px-2 py-1' : ''} ${className} font-bold text-[17px] ml-4`}>
        {children}
      </Link>
    </li>
  );
};

export default Structure;