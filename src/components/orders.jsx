import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'OrderId', label: 'OrderId'},
  { id: 'book', label: 'Book'},
  {id: 'price',label: 'Price'},
  {id: 'quantity', label: 'Quantity'},
  {id: 'total',label: 'Total'},
];

function createData(OrderId, book, price, quantity) {
  return { OrderId, book, price, quantity };
}

const rows = [
  createData('1', 'IN',5,2),
  createData('2', 'CN',5,2),
  createData('3', 'IT',5,2),
  createData('4', 'US',5,2),
  createData('5', 'CA',5,2),
  createData('6', 'AU',5,2),
  createData('7', 'DE',5,2),
  createData('8', 'IE',5,2),
  createData('9', 'MX',5,2),
  createData('10', 'JP',5,6),
  createData('11', 'FR',5,6),
  createData('12', 'GB',5,6),
  createData('13', 'RU',5,6),
  createData('14', 'NG',5,6),
  createData('15', 'BR',5,6),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '90vh',
  },
});

export default function BookOrders() {
  const classes = useStyles();

  

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={'center'}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      <TableCell key={row.OrderId} align={'center'}>
                        {row.OrderId}
                      </TableCell>
                      <TableCell key={row.book} align={'center'}>
                        {row.book}
                      </TableCell>
                      <TableCell key={row.price} align={'center'}>
                        {row.price}
                      </TableCell>
                      <TableCell key={row.quantity} align={'center'}>
                        {row.quantity}
                      </TableCell>
                      <TableCell key={`Total=${row.OrderId}`} align={'center'}>
                        {row.price * row.quantity}
                      </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}