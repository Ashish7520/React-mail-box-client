import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Nav defaultActiveKey="/inbox" className="flex-column">
      <Nav.Item>
        <Link to="/inbox" className="nav-link">
          Inbox
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/sent" className="nav-link">
          Sent
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/draft" className="nav-link">
          Drafts
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/trash" className="nav-link">
          Trash
        </Link>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
