import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Link from "next/link";
import Box from "@mui/material/Box";
import { useAuth } from "../../utils/Auth";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useApolloClient, useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import Typography from "@mui/material/Typography";

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    logoutUser
  }
`;

const Menus = () => {
  const apolloClient = useApolloClient();
  const router = useRouter();
  const { setAuthenticated } = useAuth();
  const [logout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <List
      sx={{
        mt:10,
        color: "text.secondary",
        cursor: "pointer",
        "&:hover": {
          color: "white",
        },
        
      }}
    >
      <Link href='/' passHref>
        <ListItem
          sx={{
            color: "text.secondary",
            cursor: "pointer",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Typography
          sx={{
            fontWeight:"bold",
            color: "text.secondary",
            cursor: "pointer",
            "&:hover": {
              color: "primary.main",
            },
          }}
          >
            Dashboard
          </Typography>
        </ListItem>
      </Link>

      <Link href='/about' passHref>
        <ListItem  sx={{
            color: "text.secondary",
            cursor: "pointer",
            "&:hover": {
              color: "primary.main",
            },
          }}>
          <ListItemIcon >
            <InboxIcon />
          </ListItemIcon>
          <Typography
          sx={{
            fontWeight:"bold",
            color: "text.secondary",
            cursor: "pointer",
            "&:hover": {
              color: "primary.main",
            },
          }}
          >
           About
          </Typography>

        </ListItem>
      </Link>
      <Link href='/signin' passHref>
        <ListItem  sx={{
            color: "text.secondary",
            cursor: "pointer",
            "&:hover": {
              color: "primary.main",
            },
          }}>
          <ListItemIcon sx={{ color: "primary.light" }}>
            <InboxIcon />
          </ListItemIcon>
          <Typography
          sx={{
            fontWeight:"bold",
            color: "text.secondary",
            cursor: "pointer",
            "&:hover": {
              color: "primary.main",
            },
          }}
          >
           Signin
          </Typography>

        </ListItem>
      </Link>

      <ListItem
         sx={{
          color: "text.secondary",
          cursor: "pointer",
          "&:hover": {
            color: "primary.main",
          },
        }}
        onClick={async () => {
          try {
            await logout();
            setAuthenticated(false);
            apolloClient.resetStore();
          } catch (erorr) {
            console.log(erorr);
          }
        }}
      >
        <ListItemIcon sx={{ color: "primary.light" }}>
          <InboxIcon />
        </ListItemIcon>
        <Typography
          sx={{
            fontWeight:"bold",
            color: "text.secondary",
            cursor: "pointer",
            "&:hover": {
              color: "primary.main",
            },
          }}
          >
           Logout
          </Typography>

      </ListItem>


    </List>
  );
};

export default Menus;
