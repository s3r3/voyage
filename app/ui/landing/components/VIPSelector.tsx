"use client";

import React from 'react';
import { Icon } from '@iconify/react';
import { useVIPStore } from '../../../store/useVIPStore'; // Adjust path as needed

const VIPSelector = () => {
  const { isVIP, setVIPStatus } = useVIPStore();

  const handleVIPChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setVIPStatus(event.target.value === 'true');
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded h-[56px]">
      <Icon icon="tabler:badge-ad" className="w-6 h-6 text-[#07689F]" /> {/* Placeholder icon */}
      <div className="flex flex-col">
        <label htmlFor="vip-status" className="text-xs font-medium text-gray-600">VIP Condition</label>
        <select
          id="vip-status"
          value={isVIP ? 'true' : 'false'}
          onChange={handleVIPChange}
          className="text-sm px-2 py-1 border-none focus:outline-none w-full bg-transparent"
        >
          <option value="false">Regular</option>
          <option value="true">VIP</option>
        </select>
      </div>
    </div>
  );
};

export default VIPSelector;