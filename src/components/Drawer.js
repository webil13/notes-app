import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Icon from "@material-ui/core/Icon";
import Backdrop from "@material-ui/core/Backdrop";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useHistory, useLocation } from "react-router";

import PWAInstallerPrompt from "react-pwa-installer-prompt";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  active: {
    background: theme.palette.primary.light,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  stretch: {
    flexGrow: "1",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer - 1,
  },
  getApp: {
    marginTop: "9em",
    border: "1px solid inherit",
  },
  getAppBtn: {
    border: "1px solid inherit",
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLinkClick = () => {
    if (open) {
      handleDrawerClose();
    }
  };

  const navLinks = [
    {
      item: "All Notes",
      key: 1,
      icon: <HomeOutlinedIcon color="primary" />,
      path: "/",
    },
    {
      item: "Trash",
      key: 2,
      icon: <DeleteOutlinedIcon color="primary" />,
      path: "/trash",
    },
    {
      item: "Add New",
      key: 3,
      icon: <AddIcon color="primary" />,
      path: "/create",
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.stretch} variant="h6" noWrap>
            Notes
          </Typography>
          <Icon>
          <svg width="21" height="21" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="63" height="63" fill="#E5E5E5"/>
<g filter="url(#filter0_i)">
<rect width="63" height="63" rx="3" fill="#F9F9F9"/>
</g>
<rect x="1.5" y="1.5" width="60" height="60" rx="1.5" stroke="#5A9AAF" stroke-width="3"/>
<path d="M12.3846 52.6716C31.2308 59.1331 20.9422 42.1848 36.0769 45.1331C47.9231 47.4408 42.2693 31.1331 50.6154 31.1331" stroke="#5A9AAF" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M27.9082 27.6709C26.2114 30.9914 24.422 33.9741 22.7379 36.376L16.8935 33.0308C17.8484 30.3146 19.1837 27.2089 20.8261 23.9892C22.1051 21.4821 23.4373 19.1664 24.7379 17.1463L30.9898 20.7247C30.9901 20.724 30.9905 20.7234 30.9909 20.7227C31.3376 20.0871 31.4967 19.3338 31.5186 18.5457L25.9387 15.3519C28.9101 11.0883 31.5652 8.61307 32.8226 9.2545C33.7004 9.70226 33.7485 11.5929 33.1167 14.3635L33.6864 14.1194C34.017 14.8907 34.3824 16.1416 34.4898 17.5437C34.597 18.9414 34.458 20.6313 33.6245 22.1593C32.365 24.4685 30.9863 27.5245 30.4556 28.7627L27.9082 27.6709ZM16.2103 35.1214L21.4531 38.1223C19.0538 41.2168 16.9999 42.8917 15.9396 42.3508C14.8529 41.7965 15.0379 39.0306 16.2103 35.1214Z" fill="#5A9AAF"/>
<defs>
<filter id="filter0_i" x="0" y="0" width="66" height="66" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="3" operator="dilate" in="SourceAlpha" result="effect1_innerShadow"/>
<feOffset dx="3" dy="3"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
</filter>
</defs>
</svg>
          </Icon>
          <PWAInstallerPrompt
            render={({ onClick }) => (
              <IconButton
                onClick={onClick}
                edge="end"
                size="medium"
                color="inherit"
              >
                <GetAppIcon />
              </IconButton>
            )}
            // callback={(data) => console.log(data)}
          />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <List onClick={handleLinkClick}>
          {navLinks.map((navLink) => (
            <>
              <ListItem
                button
                key={navLink.key}
                onClick={() => history.push(navLink.path)}
                onChange={handleLinkClick}
                className={
                  location.pathname == navLink.path ? classes.active : null
                }
              >
                <ListItemIcon>{navLink.icon}</ListItemIcon>
                <ListItemText primary={navLink.item} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Drawer>
      <Backdrop
        className={classes.backdrop}
        open={open}
        onClick={handleLinkClick}
      />
    </div>
  );
}
