import React,{useState}from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
export default function MenuBar() {
  const pathname = window.location.pathname;
  const path=pathname==='Posts'? 'Posts':pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path)
  const handleActiveItem=(e,{name})=>setActiveItem(name)
  return (
    <Menu secondary pointing color='teal'>
      <Menu.Menu position="left">
        <Menu.Item name="Victors" active={true}  />
      </Menu.Menu>
      <Menu.Menu position="right">

        <Menu.Item
          name="Profile"
          active={activeItem === "Profile"}
          as={Link}
          to="/Profile"
          onClick={handleActiveItem}
        />
          <Menu.Item
          name="Posts"
          active={activeItem === "Posts"}
          as={Link}
          to="/Posts"
          onClick={handleActiveItem}
        />
        <Menu.Item
          name="Contact"
          active={activeItem === "Contact"}
          as={Link}
          to="/Contact"
          onClick={handleActiveItem}
        />
      </Menu.Menu>
    </Menu>
  );
}
