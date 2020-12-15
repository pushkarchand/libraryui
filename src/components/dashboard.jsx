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
import {setIsLoading, setPaymentOpen} from '../context/action'
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SearchIcon from '@material-ui/icons/Search';
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
    flexDirection:'row',
    padding:"10px 10px",
    alignItems:"center",
    justifyContent:"space-between",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  leftaction:{
    flexBasis:"50%",
    position:'relative'
  },
  rightaction:{
    flexBasis: "20%",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between"
  },
  search:{
    position:"absolute",
    right: 0,
    top: "10px",
    cursor:"pointer"
  },
  noBooks:{
    display: "flex",
    justifyContent: "center",
    height: "30vh",
    alignItems: "center",
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
  const [isPurchaseBookOpen, setIsPurchaseBookOpen] = useState(false);
  const [purchaseBook, setpurchaseBook] = useState(null);
  const [borrowBook, setborrowBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [category, setcategory] = useState(-1);
  const [listOfCategories, setListOfCategories] = useState([]);
  const [searchTitle, setsearchTitle] = useState('');
  const [searchAuthor, setsearchAuthor] = useState('');
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
      context.dispatch(setIsLoading(false));
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

  /**
   * Method to close Addnew book popup
   */
  const closeAddNewBook=()=>{
    setisAddBookOpen(false);
    fetchBooks();
    context.dispatch(setIsLoading(false));
  }

  /**
   * Method to close purchase book popup
   */
    const closePurchaseBook=(arg)=>{
      debugger;
      if(arg) {
        context.dispatch(setPaymentOpen(true));
      }
      setIsPurchaseBookOpen(false);
      setpurchaseBook(null);
      context.dispatch(setIsLoading(false));
  }

  /**
   * Method to close borrow book popup
   */
  const closeBorrowBook=()=>{
    setIsBorrowBookOpen(false);
    setborrowBook(null);
    context.dispatch(setIsLoading(false));
  }

  const closePayment=()=>{
    context.dispatch(setIsLoading(false));
  }

  /**
   * Method to handle change in category
   * @param {*} argEvent 
   */
  const handleChangeInCategory=(argEvent)=>{
    setcategory(argEvent.target.value);
  }

  const searchBooks= async ()=>{
      if(searchTitle || searchAuthor){
        try{
            context.dispatch(setIsLoading(true));
            const url=`GetBookByNameOrAuthor?name=${searchTitle}&author=${searchAuthor}`;
            const response= await getApi(url);
            setBooks(response);
            if(category!==-1){
              const filteredBooks=response.filter(item=>item.catId=== category);
              setDisplayBooks(filteredBooks);
            } else{
              setDisplayBooks(response);
            }
            context.dispatch(setIsLoading(false));
        } catch(error){
          context.dispatch(setIsLoading(false));
        }
      }
  }

  return (
    <React.Fragment>
      <Header/>
      <div className={classes.action}>
            <div className={classes.leftaction}>
            <Grid container spacing={2}>
                    <Grid item xs={5} sm={5}>
                      <TextField
                        name="searcgTitle"
                        required
                        fullWidth
                        id="searcgTitle"
                        onKeyPress={event => event.key === 'Enter'?searchBooks(event):null }
                        value={searchTitle}
                        onChange={(e)=>setsearchTitle(e.target.value)}
                        label="Book title"
                      />
                    </Grid>
                  <Grid item xs={6} sm={6}>
                      <TextField
                        name="searchAuthor"
                        required
                        fullWidth
                        onKeyPress={event => event.key === 'Enter'?searchBooks(event):null}
                        id="searchAuthor"
                        value={searchAuthor}
                        onChange={(e)=>setsearchAuthor(e.target.value)}
                        label="Author"
                      />
                  </Grid>
              </Grid>
              <SearchIcon className={classes.search}/>
            </div>
            <div className={classes.rightaction}>
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
              {localStorage.getItem('role')==='3'?(  <Button variant="contained" color="primary" disableElevation onClick={addNewBook}>
                  Add new Book
                </Button>):("")}
          </div>
      </div>
      
        {displayBooks.length>0?
        (
          <div className={classes.bookContainer}>
            {
              displayBooks.map((item,index)=>(
                  <div key={`Book-${item.id}-${index}`} className={classes.book}>
                    <Book book={item} 
                          purchaseBook={purchaseBookOpen} 
                          borrowBook={borrowBookOpen}/>
                  </div>
              ))}
          </div>):(
          <div className={classes.noBooks}>
            <h3>No books found</h3>
          </div>)}
      {isAddBookOpen?(<AddBook isOpen={isAddBookOpen} close={closeAddNewBook}/>):("")}
      {isPurchaseBookOpen && purchaseBook?(<PurchaseBook isOpen={isPurchaseBookOpen} close={closePurchaseBook} book={purchaseBook}/>):("")}
      {isBorrowBookOpen && borrowBook?(<BorrowBook isOpen={isBorrowBookOpen} close={closeBorrowBook} book={borrowBook}/>):("")}
      {context.state.paymentOpen ?(<Paymentgateway isOpen={context.state.paymentOpen} close={closePayment}/>):("")}

    </React.Fragment>
  );
}
