import React,{useState} from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Menu, Segment, Sidebar } from "semantic-ui-react";

import "./App.css";
import MenuBar from "./components/Menu";
import Contact from "./views/contacts";
import Post from "./views/posts";
import Profile from "./views/profile";
import SingleCard from "./views/singleCard";

function App() {
  const pathname = window.location.pathname;
  const path = pathname === "Posts" ? "Posts" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleActiveItem = (e, { name }) => setActiveItem(name);
  return (

    <div style={{height:'100vh'}} >
          <Router>
      <Sidebar.Pushable as={Segment}  >
        <Sidebar
        as={Menu}
          animation="push"
          icon="labeled"
          inverted
          vertical
          visible
          width="thin"
        >

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

        </Sidebar>
        <Sidebar.Pusher>
          <Switch>
            <Route exact path="/Profile" component={Profile} />
            <Route exact path="/Posts" component={Post} />
            <Route exact path="/Contact" component={Contact} />
            <Route exact path="/Contact/:contactId" component={SingleCard} />
          </Switch>
        </Sidebar.Pusher>
      </Sidebar.Pushable>


    </Router>
    </div>

  );
}

export default App;
