import { Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import firebase from "../utils/firebaseConfig";
export function CreateElement({ onReload }) {
  const [product, setproduct] = useState({
    name: "",
    description: "",
    stock: undefined,
    price: undefined,
  });

  const [errors, setErros] = useState({
    nameError: false,
    desError: false,
    stockError: false,
    priceError: false,
  });

  const onSubmitCreate = () => {
    setErros({
      nameError: product.name === "",
      desError: product.description === "",
      stockError: product.stock === undefined,
      priceError: product.price === undefined,
    });

    if (
      product.name !== "" &&
      product.description !== "" &&
      product.stock !== undefined &&
      product.price !== undefined
    ) {
      firebase
        .firestore()
        .collection(localStorage.getItem("userID"))
        .add(product)
        .then((docRef) => {
          onReload();
          setproduct({
            name: "",
            description: "",
            stock: undefined,
            price: undefined,
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  };

  return (
    <Container className="create">
      <Typography variant="h4">Create a product</Typography>

      <TextField
        error={errors.nameError}
        required
        className="text-input"
        type="text"
        label="Name"
        value={product.name}
        placeholder="Name"
        onChange={(event) =>
          setproduct({ ...product, name: event.target.value.toLowerCase() })
        }
      />
      <TextField
        error={errors.desError}
        required
        multiline
        rowsMax={4}
        className="text-input"
        type="text"
        label="Desciption"
        value={product.description}
        placeholder="Description"
        onChange={(event) =>
          setproduct({ ...product, description: event.target.value })
        }
      />
      <TextField
        error={errors.stockError}
        required
        className="text-input"
        type="number"
        label="Stock"
        value={product.stock || ""}
        placeholder="Stock"
        onChange={(event) =>
          setproduct({
            ...product,
            stock:
              Number(event.target.value) === 0
                ? undefined
                : Number(event.target.value),
          })
        }
      />
      <TextField
        error={errors.priceError}
        required
        className="text-input"
        type="number"
        label="Price"
        value={product.price || ""}
        placeholder="Price"
        onChange={(event) =>
          setproduct({
            ...product,
            price:
              Number(event.target.value) === 0
                ? undefined
                : Number(event.target.value),
          })
        }
      />
      <Button
        className="bt-create-submit"
        variant="contained"
        color="primary"
        onClick={onSubmitCreate}
      >
        Create
      </Button>
    </Container>
  );
}
