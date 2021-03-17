/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebaseConfig";
import Header from "../header/header";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CreateElement } from "../../components/createElement";
import DataCell from "../../components/dataCell";

export default function MainView() {
  const history = useHistory();
  const [reload, setReload] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    let datafirebase = [];
    if (localStorage.getItem("userID") === null) {
      history.push("/login");
    } else {
      firebase
        .firestore()
        .collection(localStorage.getItem("userID"))
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            datafirebase.push({ ...doc.data(), id: doc.id });
          });
          setData(datafirebase);
        });
    }
  }, [reload]);

  const onsubmit = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("userID");
        history.push("/login");
      });
  };

  const onSubmitUpdate = (doc, data) => {
    firebase
      .firestore()
      .collection(localStorage.getItem("userID"))
      .doc(doc)
      .update(data)
      .then(() => {
        onReload();
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const onSubmitDelete = (doc) => {
    firebase
      .firestore()
      .collection(localStorage.getItem("userID"))
      .doc(doc)
      .delete()
      .then(() => {
        onReload();
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const onReload = () => setReload(!reload);

  return (
    <Container className="main-content" maxWidth={false} disableGutters={true}>
      <Header onsubmit={onsubmit} />

      <Container
        className="container-body"
        maxWidth={false}
        disableGutters={true}
      >
        <CreateElement onReload={onReload} />
        {data.length === 0 ? (
          <Typography variant="h3">
            No products were found with this user
          </Typography>
        ) : (
          <TableContainer className="table-container">
            <Table className="table" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Descrition</TableCell>
                  <TableCell align="center">Stock</TableCell>
                  <TableCell align="center">Price $</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((elem) => (
                  <DataCell
                    key={elem.id}
                    elem={elem}
                    onSubmitUpdate={onSubmitUpdate}
                    onSubmitDelete={onSubmitDelete}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Container>
  );
}
