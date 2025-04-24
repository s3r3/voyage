// GuestSelector.tsx
import { useGuestStore } from '../../store/useGuestStore';
import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

const GuestSelector = () => {
  const { adults, children, rooms, increment, decrement } = useGuestStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown saat klik di luar komponen
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative font-sans">
      {/* Tombol Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2  rounded-lg   text-[#07689F]"
      >
        <Icon icon="tabler:user" className="w-5 h-5" />
        <span className="text-sm font-medium">
          {adults} Adult · {children} Children · {rooms} Room
        </span>
        <Icon
          icon={isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}
          className="w-5 h-5"
        />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-20">
          {['adults', 'children', 'rooms'].map((type) => (
            <div
              key={type}
              className="flex justify-between items-center py-2 border-b last:border-b-0"
            >
              <span className="text-sm font-medium capitalize text-gray-700">
                {type}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decrement(type as any)}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Icon icon="mdi:minus" className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-lg font-semibold w-6 text-center">
                  {type === 'adults' ? adults : type === 'children' ? children : rooms}
                </span>
                <button
                  onClick={() => increment(type as any)}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Icon icon="mdi:plus" className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestSelector;