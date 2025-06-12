import React from 'react';
import { LuLoader } from 'react-icons/lu';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <LuLoader className="animate-spin text-blue-600" size={48} />
        <p className="text-gray-600 font-medium">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
