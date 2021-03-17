import { Button, TableCell, TableRow, TextField } from "@material-ui/core";
import React, { useState } from "react";

export default function DataCell({ elem, onSubmitUpdate, onSubmitDelete }) {
  const [edit, setEdit] = useState(false);

  const [product, setproduct] = useState({
    name: elem.name,
    description: elem.description,
    stock: elem.stock,
    price: elem.price,
  });

  const [errors, setErros] = useState({
    nameError: false,
    desError: false,
    stockError: false,
    priceError: false,
  });

  const onsubmit = () => {
    console.log(product);
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
      onSubmitUpdate(elem.id, product);
      setEdit(false);
    }
  };
  return (
    <TableRow>
      <TableCell align="left">
        {edit ? (
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
        ) : (
          elem.name
        )}
      </TableCell>
      <TableCell className="descriptio-cell" align="left">
        {edit ? (
          <TextField
            error={errors.desError}
            required
            multiline
            rowsMax={12}
            className="text-input"
            type="text"
            label="Desciption"
            value={product.description}
            placeholder="Description"
            onChange={(event) =>
              setproduct({ ...product, description: event.target.value })
            }
          />
        ) : (
          elem.description
        )}
      </TableCell>
      <TableCell align="left">
        {edit ? (
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
        ) : (
          elem.stock
        )}
      </TableCell>
      <TableCell align="left">
        {edit ? (
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
        ) : (
          elem.price
        )}
      </TableCell>
      <TableCell align="left">
        {edit ? (
          <Button
            className="button"
            variant="contained"
            color="primary"
            onClick={onsubmit}
          >
            Save
          </Button>
        ) : (
          <Button
            className="button"
            variant="contained"
            color="primary"
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
        )}
      </TableCell>
      {!edit && (
        <TableCell align="right">
          <Button
            className="button"
            variant="contained"
            color="primary"
            onClick={() => onSubmitDelete(elem.id)}
          >
            Delete
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
}
