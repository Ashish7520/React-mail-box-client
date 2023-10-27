import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/inbox">Inbox</Link>
        </li>
        <li>
          <Link to="/sent">Sent</Link>
        </li>
        <li>
          <Link to="/draft">Drafts</Link>
        </li>
        <li>
          <Link to="/trash">Trash</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
