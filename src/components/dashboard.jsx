import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './header';
import Book from './book';
import {Books} from '../utils/constants';
import Button from "@material-ui/core/Button";
import { getApi } from '../services/apiservice';
import { getApiByCategory } from '../services/apiservice';
import AddBook from './addBook';
import PurchaseBook from './purchaseBook';
import BorrowBook from './borrowBook';
import Paymentgateway from './paymentGateway';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
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
 }));

export default function Dashborad() {
  const classes = useStyles();
  const [isAddBookOpen, setisAddBookOpen] = useState(false);
  const [isBorrowBookOpen, setIsBorrowBookOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPurchaseBookOpen, setIsPurchaseBookOpen] = useState(false);
  const [purchaseBook, setpurchaseBook] = useState(null);
  const [borrowBook, setborrowBook] = useState(null);
  const [paymentBook, setPayment] = useState(null);

  const fetchBooks=()=>{
    getApi('GetBook')
    .then(response=>{
      console.log(response);
    },error => {
      // if(error.status == 401) {
      //   getApi('GetOrderByUserCode?userCode=ABC1')
      //   .then(response=>{
      //     console.log(response);
      //   });
      // }
      console.log(error);
    })
  }

  const fetchBooksCategories=()=>{
    getApiByCategory('GetAllCategories')
    .then(response=>{
      console.log(response);
    },error => {
      console.log(error);
    })
  }

  useEffect(() => {
    fetchBooks()
    fetchBooksCategories()
  }, [])

  const addNewBook=()=>{
    setisAddBookOpen(true);
  }

  const purchaseBookOpen=(argBook)=>{
    setpurchaseBook(argBook);
    setIsPurchaseBookOpen(true);
  }

  const borrowBookOpen=(argBook)=>{
    setborrowBook(argBook)
    setIsBorrowBookOpen(true);
  }

  const paymentOpen=(argBook)=>{
    setPayment(argBook)
    setIsPaymentOpen(true);
  }

  const closeAddNewBook=()=>{
    setisAddBookOpen(false);
  }

  const closePurchaseBook=()=>{
    setIsPurchaseBookOpen(false);
    setpurchaseBook(null);
  }

  const closeBorrowBook=()=>{
    setIsBorrowBookOpen(false);
    setborrowBook(null);
  }

  const closePayment=()=>{
    setIsPaymentOpen(false);
    setPayment(null);
  }

  return (
    <React.Fragment>
      <Header/>
      <div className={classes.action}>
      <Button variant="contained" color="primary" disableElevation onClick={addNewBook}>
          Add new Book
        </Button>
      </div>
      <div className={classes.bookContainer}>
        {Books.map((item,index)=>(
          <div key={`Book-${item.id}-${index}`} className={classes.book}>
            <Book book={item} 
                  //  purchaseBook={purchaseBookOpen} 
                   purchaseBook={paymentOpen} 
                   borrowBook={borrowBookOpen}/>
          </div>
          ))}
      </div>
      {isAddBookOpen?(<AddBook isOpen={isAddBookOpen} close={closeAddNewBook}/>):("")}
      {isPurchaseBookOpen && purchaseBook?(<PurchaseBook isOpen={isPurchaseBookOpen} close={closePurchaseBook} book={purchaseBook}/>):("")}
      {isBorrowBookOpen && borrowBook?(<BorrowBook isOpen={isBorrowBookOpen} close={closeBorrowBook} book={borrowBook}/>):("")}
      {isPaymentOpen && paymentBook?(<Paymentgateway isOpen={isPaymentOpen} close={closePayment} book={paymentBook}/>):("")}

    </React.Fragment>
  );
}
