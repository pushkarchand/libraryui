import React,{useState, useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {getApiByCategory} from '../services/apiservice';
import {postApi, getApi} from '../services/apiservice';
import {stateContext} from '../context';
import {setIsLoading} from '../context/action'
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

/**
 * Styles declartion for Add book component
 */
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0.5)
  },
  fields: {
    backgroundColor: '#FFFFFF',
    margin: theme.spacing(0.5)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width:"100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

/**
 * Declartion of Add book component
 * @param {*} param0 
 */
export default function AddBook({history,isOpen,close}) {
  // Variable declartion like open, title, author, publisher, description, price and categories
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(-1);
  const context = useContext(stateContext);
  const [catType, setCatType] = useState('');
  const options = [];

  /**
   * Method ti close Add book dialog
   */
  const handleClose = () => {
    setOpen(false);
    close();
  };

  /**
   * Useeffect method is executed only when the component  isloaded and when the isOpen value is changed
   */
  useEffect(() => {
    setOpen(isOpen)
    fetchBooksCategories()
  }, [isOpen])

  // Useffect is executed only when component is loaded fetches all the categories
  useEffect(() => {
    fetchBooksCategories();
  }, [])

  /**
   * Method to fetch book categories
   */
  // const fetchBooksCategories=()=>{
  //   getApi('GetAllCategories')
  //   .then(response=>{
  //     setCategories(response);
  //   },error => {
  //     console.log(error);
  //   })
  // }

  /**
   * Form submit method to save the book
   * @param {*} event 
   */
  const saveBook= async (event)=>{
    event.preventDefault();
    try{
        context.dispatch(setIsLoading(true));
        handleClose();
        const bookItem={
          Title: title,
          Author: author,
          Description:description,
          Publisher:publisher,
          CatId:category,
          Price: Number(price)
        }
        const response= await postApi('SaveBook',bookItem);
        context.dispatch(setIsLoading(false));
    } catch(error){
      context.dispatch(setIsLoading(false));
    }
  }

  const fetchBooksCategories=()=>{
    let allData;
    getApiByCategory('GetAllCategories')
    .then(response=>{
      allData = response;
      for(let i=0;i<allData.length;i++) {
        options.push({
          value: allData[i].catId,
          label: allData[i].name
        });
      }
    },error => {
      console.log(error);
    })
  }
  /**
   * Method to handle the change in category selected
   * @param {*} argEvent 
   */
  const handleChangeInCategory=argEvent=>{
    setCategory(argEvent.target.value);
  }


  const handleChangeInCatType = (event) => {
    setCatType(event.label);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">New Book</DialogTitle>
        <DialogContent>
          {/* FOrm for add book */}
        <form className={classes.form} onSubmit={saveBook}>
                  <Grid container spacing={2}>
                    {/* Input for book title */}
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="Title"
                        className={classes.fields}
                        variant="outlined"
                        required
                        fullWidth
                        id="Title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        autoFocus
                        label="Title"
                      />
                    </Grid>
                    {/* Input for Authot */}
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="author"
                        className={classes.fields}
                        variant="outlined"
                        required
                        fullWidth
                        id="author"
                        value={author}
                        onChange={(e)=>setAuthor(e.target.value)}
                        autoFocus
                        label="Author"
                      />
                    </Grid>
                    {/* Input for Publisher */}
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="publisher"
                        className={classes.fields}
                        variant="outlined"
                        required
                        fullWidth
                        id="publisher"
                        value={publisher}
                        onChange={(e)=>setPublisher(e.target.value)}
                        autoFocus
                        label="Publisher"
                      />
                    </Grid>
                    {/* Input for book description */}
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="description"
                        className={classes.fields}
                        variant="outlined"
                        required
                        fullWidth
                        id="description"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        autoFocus
                        label="Description"
                      />
                    </Grid>
                    {/* Input select for Book category */}
                    <Grid item xs={12} sm={12}>
                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={category}
                            onChange={handleChangeInCategory}
                            label="Category"
                          >
                            {
                              categories.length>0&& categories.map((item,index)=>(
                                <MenuItem key={`Book-${item.catId}-${index}`} value={item.catId}>{item.name}</MenuItem>
                              ))
                            }
                          </Select>
                      </FormControl>
                    </Grid>
                    {/* Input for Price of the book */}
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="price"
                        className={classes.fields}
                        variant="outlined"
                        required
                        fullWidth
                        id="price"
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}
                        autoFocus
                        label="Price"
                      />
                    </Grid>
                    {/* Button to save the book */}
                    <Grid item xs={12} sm={12}>
                    <Select className={classes.formControl}
                        value={catType}
                        onChange={handleChangeInCatType}
                        options={options}
                    />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            Save
                        </Button>
                    </Grid>
              </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}