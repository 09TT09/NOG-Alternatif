import React from 'react';
import Navbar from '@/src/components/Navbar/Navbar';

function AdminDashboard() {
  return (
    <div className="flex w-full h-screen max-h-screen bg-white">
      <Navbar />
      <div className="bg-white grow"></div>
    </div>
  )
};

export default AdminDashboard;