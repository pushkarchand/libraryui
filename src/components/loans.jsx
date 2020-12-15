import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Header from './header';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {getApi, getOrderBookApi} from '../services/apiservice';

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



export default function LoanedBooks() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetchOrderDetails()
  },[])

  const formatedDate=(date)=>{
    return new Date(date).toLocaleDateString();
  }

  const fetchOrderDetails=()=>{
    getApi(`GetLoanByUserCode?userCode=${localStorage.getItem('userCode')}`)
    .then(response=>{
      response.forEach(item=>{
        item.borrowingDate= formatedDate(item.borrowingDate);
        item.returnDate= formatedDate(item.borrowingDate);
      })
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
                  Loan Id
                </TableCell>
                <TableCell align={'center'}>
                  Book Code
                </TableCell>
                <TableCell align={'center'}>
                  Borroed Date
                </TableCell>
                <TableCell align={'center'}>
                  Return date
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      <TableCell key={row.loanId} align={'center'}>
                        {row.loanId}
                      </TableCell>
                      <TableCell key={row.bookCode} align={'center'}>
                        {row.bookCode}
                      </TableCell>
                      <TableCell key={row.borrowingDate} align={'center'}>
                        {row.borrowingDate}
                      </TableCell>
                      <TableCell key={row.returnDate} align={'center'}>
                        {row.returnDate}
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