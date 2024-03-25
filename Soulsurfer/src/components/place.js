import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core";
import {
  Avatar,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from "axios";
import styles from "../CSS/adminpanel.module.css";

function AdminPanel() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [homestay, setHomestay] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedHomestay, setSelectedHomestay] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetchPlace();
  }, []);

  const fetchPlace = async () => {
    const response = await axios
      .get("http://localhost:7000/admin/adminpanellist")
      .then((response) => {
        setHomestay(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/admin/deleted/${id}`);
      setHomestay(homestay.filter((place) => place._id !== id));
    } catch (error) {
      console.error("There was an error deleting the place:", error);
    }
  };

  const handleEdit = (id) => {
    history.push(`/adminpaneledit/${id}`);
  };

  const handleShow = (id) => {
    const selectedPlace = homestay.find((place) => place._id === id);
    setSelectedHomestay(selectedPlace);
    setOpenDialog(true);
  };

  return (
    <div className="admin-panel">
      <div className={styles.adminpanel}>
        <h5 className={styles.adminpanel_text}>Admin Panel</h5>
      </div>
      <div className={styles.adminpanels}>
        <a href="/quarter#/adminpanelcreate">ADD NEW PLACE</a>
      </div>

      {matches ? (
        <List>
          {homestay.map((place) => (
            <ListItem key={place._id}>
              <ListItemAvatar>
                <Avatar
                  alt={place.name}
                  src={`http://localhost:7000/upload/${place.image}`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={place.place}
                secondary={
                  <span
                    className={
                      place.status === "Not Available"
                        ? styles.statusRed
                        : styles.statusGreen
                    }
                  >
                    {` ${place.status} `}
                  </span>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEdit(place._id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(place._id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => handleShow(place._id)}>
                  <VisibilityIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Paper className="admin-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Place</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Description</TableCell>
                <TableCell style={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {homestay.map((place) => (
                <TableRow key={place.id}>
                  <TableCell>
                    <img
                      alt={place.place}
                      src={`http://localhost:7000/upload/${place.image}`}
                      style={{ width: "150px", height: "150px" }}
                    />
                    <TableCell>{place.place}</TableCell>
                  </TableCell>
                  <TableCell>{place.details}</TableCell>
                  <TableCell>
                    {" "}
                    <span
                      className={
                        place.status === "Not Available"
                          ? styles.statusRed
                          : styles.statusGreen
                      }
                    >
                      {place.status}
                    </span>
                  </TableCell>
                  <TableCell>{place.description}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <IconButton onClick={() => handleEdit(place._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(place._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Homestay Details</DialogTitle>
        <DialogContent>
          {selectedHomestay && (
            <div>
              <p>Place: {selectedHomestay.place}</p>
              <p>Details: {selectedHomestay.details}</p>
              <p>Status: {selectedHomestay.status}</p>
              <p>Description: {selectedHomestay.description}</p>
              <img
                src={`http://localhost:7000/upload/${selectedHomestay.image}`}
              />
            </div>
          )}
        </DialogContent>
        <Button onClick={() => setOpenDialog(false)} color="primary">
          Close
        </Button>
      </Dialog>
    </div>
  );
}

export default AdminPanel;
