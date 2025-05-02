import React from 'react';

interface UserInfoProps {
  user: {
    FullName?: string; // Use FullName directly from the User table
    email?: string;
  };
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const getDisplayName = () => {
    return user?.FullName || user?.email || 'User'; // Fallback to email or a default value
  };

  const getInitials = (name?: string) => {
    if (!name || name.trim() === '') return '';
    const names = name.split(' ');
    return names.filter(Boolean).map(n => n[0].toUpperCase()).join('');
  };

  const displayName = getDisplayName();
  const initials = getInitials(displayName);

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold">
        {initials}
      </div>
      <span>{displayName}</span>
    </div>
  );
};

export default UserInfo;