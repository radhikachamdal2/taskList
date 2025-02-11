import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

interface HeaderProps {
  navigationHeader: string;
}

const Header: React.FC<HeaderProps> = ({ navigationHeader }) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h1"
            noWrap
            sx={{
              fontWeight: 700,
              fontSize: "1.5rem",
            }}
          >
            {navigationHeader}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Avatar />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
