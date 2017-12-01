import React from 'react';
import { Link } from 'react-router-dom';

function AdminNavigation() {
  return (
    <div id="admin-nav">
      <Link to="/admin/messages"><span className="nav-tab">Messages</span></Link>
      <Link to="/admin/users"><span className="nav-tab">Users</span></Link>
    </div>
  );
}

export default AdminNavigation;
