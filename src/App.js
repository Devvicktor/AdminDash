import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

import "./App.css";

import Contact from "./views/contacts";
import Post from "./views/posts";
import Profile from "./views/profile";
import SingleCard from "./views/singleCard";
import SinglePost from "./views/SinglePost";
import UpdatePost from "./views/updatePost";

function App() {
  const pathname = window.location.pathname;
  const path = pathname === "Posts" ? "Posts" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const [visible, setVisible] = useState(false);

  const handleActiveItem = (e, { name }) => setActiveItem(name);
  return (
    <div style={{ height: "100vh" }}>
      <Router>
        <Menu secondary pointing color="teal">
          <Menu.Menu>
            <Menu.Item>
              <Icon name="bars" color="teal" onClick={() => setVisible(true)} />
            </Menu.Item>
            <Menu.Item
              name="Devvicktor"
              icon={<Icon size="large" color="olive" name="gem" />}
              active={true}
              as={Link}
              to="/"
              onClick={handleActiveItem}
            />
          </Menu.Menu>
        </Menu>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            vertical
            visible={visible}
            width="thin"
            onClick={() => setVisible(false)}
          >
            <Menu.Item
              name="Profile"
              active={activeItem === "Profile"}
              as={Link}
              to="/Profile"
              onClick={(handleActiveItem, () => setVisible(false))}
            />
            <Menu.Item
              name="Posts"
              active={activeItem === "Posts"}
              as={Link}
              to="/Posts"
              onClick={(handleActiveItem, () => setVisible(false))}
            />
            <Menu.Item
              name="Contact"
              active={activeItem === "Contact"}
              as={Link}
              to="/Contact"
              onClick={(handleActiveItem, () => setVisible(false))}
            />
          </Sidebar>
          <Sidebar.Pusher>
            <Switch>
              <Route exact path="/Profile" component={Profile} />
              <Route exact path="/Posts" component={Post} />
              <Route exact path="/Contact" component={Contact} />
              <Route exact path="/Contact/:contactId" component={SingleCard} />
              <Route exact path="/posts/:postId" component={SinglePost} />
              <Route exact path="/Post-update/:postId" component={UpdatePost} />
            </Switch>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Router>
    </div>
  );
}

export default App;
