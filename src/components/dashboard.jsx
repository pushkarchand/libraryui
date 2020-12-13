import React,{useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './header';
import Book from './book';
import Button from "@material-ui/core/Button";
import { getApi } from '../services/apiservice';
import AddBook from './addBook';
import PurchaseBook from './purchaseBook';
import BorrowBook from './borrowBook';
import Paymentgateway from './paymentGateway';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {stateContext} from '../context';
import {setIsLoading} from '../context/action'

/**
 * Dashboard component styles decleration
 */
const useStyles = makeStyles((theme) => ({
  bookContainer:{
    display: 'grid',
    gridColumnGap: '30px',
    gridRowGap: '30px',
    gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
    padding: '10px'
  },
  book:{
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    textAlign:'center'
  },
  action:{
    display:'flex',
    flexDirection:'row-reverse',
    padding:"10px 10px",
    alignItems:"center"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
 }));

 /**
  * Dashborad functional component decleration
  */
export default function Dashborad() {
  // variable get and set method decleartion using useState
  const classes = useStyles();
  const [isAddBookOpen, setisAddBookOpen] = useState(false);
  const [isBorrowBookOpen, setIsBorrowBookOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPurchaseBookOpen, setIsPurchaseBookOpen] = useState(false);
  const [purchaseBook, setpurchaseBook] = useState(null);
  const [borrowBook, setborrowBook] = useState(null);
  const [paymentBook, setPayment] = useState(null);
  const [books, setBooks] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [category, setcategory] = useState(-1);
  const [listOfCategories, setListOfCategories] = useState([])
  const context = useContext(stateContext);

  /**
   * Method to fetch books
   */
  const fetchBooks=()=>{
    getApi('GetBook')
    .then(response=>{
      setBooks(response);
      setDisplayBooks(response);
      context.dispatch(setIsLoading(false));
    },error => {
      console.log(error);
      context.dispatch(setIsLoading(false));
    })
  }

  /**
   * Method to fetch all categories
   */
  const fetchBooksCategories=()=>{
    getApi('GetAllCategories')
    .then(response=>{
      setListOfCategories(response);
    },error => {
      console.log(error);
    })
  }

  /**
   * Useffect method is invoked when component is loaded
   * It fetches books and categories
   */
  useEffect(() => {
    context.dispatch(setIsLoading(true));
    fetchBooks();
    fetchBooksCategories();
  }, []);

  /**
   * This useEffect method is invoked when component is loaded and when their is change in category
   * Based on which the books will be loaded
   */
  useEffect(() => {
    if(category===-1){
      setDisplayBooks(books);
    } else{
      const filteredBooks=books.filter(item=>item.catId=== category);
      context.dispatch(setIsLoading(true));
      setDisplayBooks(filteredBooks);
    }
  }, [category]);


  /**
   * Method to open addnew book popup
   * Only for admin user
   */
  const addNewBook=()=>{
    setisAddBookOpen(true);
  }

  /**
   * Method to purchase book only for store owner
   * @param {*} argBook 
   */
  const purchaseBookOpen=(argBook)=>{
    setpurchaseBook(argBook);
    setIsPurchaseBookOpen(true);
  }

  /**
   * Method to open borrow book and only for students
   * @param {*} argBook 
   */
  const borrowBookOpen=(argBook)=>{
    setborrowBook(argBook)
    setIsBorrowBookOpen(true);
  }

  const paymentOpen=(argBook)=>{
    setPayment(argBook)
    setIsPaymentOpen(true);
  }

  /**
   * Method to close Addnew book popup
   */
  const closeAddNewBook=()=>{
    setisAddBookOpen(false);
    fetchBooks();
  }

  /**
   * Method to close purchase book popup
   */
  const closePurchaseBook=()=>{
    setIsPurchaseBookOpen(false);
    setpurchaseBook(null);
  }

  /**
   * Method to close borrow book popup
   */
  const closeBorrowBook=()=>{
    setIsBorrowBookOpen(false);
    setborrowBook(null);
  }

  const closePayment=()=>{
    setIsPaymentOpen(false);
    setPayment(null);
  }

  /**
   * Method to handle change in category
   * @param {*} argEvent 
   */
  const handleChangeInCategory=(argEvent)=>{
    setcategory(argEvent.target.value);
  }

  return (
    <React.Fragment>
      <Header/>
      <div className={classes.action}>
     {localStorage.getItem('role')==='3'?(  <Button variant="contained" color="primary" disableElevation onClick={addNewBook}>
          Add new Book
        </Button>):("")}
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            onChange={handleChangeInCategory}
          >
            <MenuItem value={-1}>All</MenuItem>
            {
              listOfCategories.length>0 && listOfCategories.map((item,index)=>(
                <MenuItem key={`Book-${item.catId}-${index}`} value={item.catId}>{item.name}</MenuItem>
              ))
            }
          </Select>
      </FormControl>
      </div>
      <div className={classes.bookContainer}>
        {displayBooks.map((item,index)=>(
          <div key={`Book-${item.id}-${index}`} className={classes.book}>
            <Book book={item} 
                   purchaseBook={purchaseBookOpen} 
                  //  purchaseBook={paymentOpen} 
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
