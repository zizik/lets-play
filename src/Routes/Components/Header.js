import React from "react";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import List, { ListItem, ListItemText } from "material-ui/List";
import Drawer from "material-ui/Drawer";
import styled from "styled-components";

const NavPanel = styled("div")`
  width: 250px;
`;

const HeaderPanel = styled(AppBar)`
  margin-bottom: 20px;
`;

const linkItems = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Users",
    route: "/users",
  },
  {
    name: "Games",
    route: "/games",
  },
  {
    name: "Create Invite",
    route: "/create-invite",
  },
  {
    name: "Register",
    route: "/register",
  },
  {
    name: "Login",
    route: "/login",
  },
];

class Home extends React.Component {
  state = {
    open: false,
  };

  toggleDrawer = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const links = linkItems.map(link => (
      <ListItem key={link.name} component={Link} to={link.route}>
        <ListItemText primary={link.name} />
      </ListItem>
    ));

    return (
      <HeaderPanel position="static" color="default">
        <Toolbar>
          <div>
            <IconButton color="inherit" aria-label="open navigation" onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Drawer open={this.state.open} onClose={this.toggleDrawer}>
              <NavPanel
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer}
                onKeyDown={this.toggleDrawer}
              >
                <List component="nav">{links}</List>
              </NavPanel>
            </Drawer>
          </div>
          <Typography variant="title" color="inherit">
            Title
          </Typography>
        </Toolbar>
      </HeaderPanel>
    );
  }
}

export default Home;
