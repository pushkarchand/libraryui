import React,{useState, useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Header from './header';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {getApi} from '../services/apiservice';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '90vh',
  },
  bookContainer:{
    display: 'grid',
    gridColumnGap: '30px',
    gridRowGap: '30px',
    gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
    padding: '10px'
  },
  book:{
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    textAlign:'center'
  },
  action:{
    display:'flex',
    flexDirection:'row-reverse',
    padding:"10px 10px"
  }
});



export default function BookOrders() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetchOrderDetails()
  },[])

  const fetchOrderDetails=()=>{
    getApi(`GetOrderByUserCode?userCode=${localStorage.getItem('userCode')}`)
    .then(response=>{
      setRows(response)
    },error => {
      console.log(error);
    })
  }

  return (
    <React.Fragment>
      <Header/>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell align={'center'}>
                  Order Id
                </TableCell>
                <TableCell align={'center'}>
                  Book code
                </TableCell>
                <TableCell align={'center'}>
                  Price
                </TableCell>
                <TableCell align={'center'}>
                  Quantity
                </TableCell>
                <TableCell align={'center'}>
                  Total
                </TableCell>
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
    </React.Fragment>
  );
}