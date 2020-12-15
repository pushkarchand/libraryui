import React,{useState, useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {postApi} from '../services/apiservice';
import {stateContext} from '../context';
import {setIsLoading} from '../context/action'
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {setPurchaseItem} from "../context/action";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0.5)
  },
  fields: {
    backgroundColor: '#FFFFFF',
    margin: theme.spacing(0.5)
  }
}));

export default function PurchaseBook({isOpen,book,close}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);
  const [title] = useState(book.title||'');
  const [price, setPrice] = useState(book.price||0);
  const [id] = useState(book.bookId||'');
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [creditCardNo, setcreditCardNo] = useState('');
  const context = useContext(stateContext);

  const handleClose = () => {
    setOpen(false);
    close();
  };

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  useEffect(() => {
    setTotal(price*quantity);
  }, [quantity,price])

  const saveBook= async (event)=>{
    event.preventDefault();
    try{
        context.dispatch(setIsLoading(true));
        const order={
          CreditCard:creditCardNo,
          OrderDateAndTime: new Date(),
          BookCode:book.bookCode,
          UserCode:localStorage.getItem('userCode')||'',
          Price: price,
          Quantity: quantity,
          BookName: title
        }
        context.dispatch(setPurchaseItem(order));
        context.dispatch(setIsLoading(false));
        close(true);
    } catch(error){
      context.dispatch(setIsLoading(false));
    }
  }



  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Purchase Book</DialogTitle>
        <DialogContent>
        <form className={classes.form} onSubmit={saveBook}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="Title"
                        className={classes.fields}
                        variant="outlined"
                        required
                        fullWidth
                        id="Title"
                        value={title}
                        readOnly={true}
                        label="Title"
                      />
                    </Grid>
                  <Grid item xs={12} sm={12}>
                      <TextField
                        name="creditCardNo"
                        className={classes.fields}
                        variant="outlined"
                        required
                        fullWidth
                        id="creditCardNo"
                        value={creditCardNo}
                        onChange={(e)=>setcreditCardNo(e.target.value)}
                        readOnly={true}
                        label="Credit Card No."
                      />
                  </Grid>
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
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="quantity"
                        className={classes.fields}
                        variant="outlined"
                        required
                        fullWidth
                        id="quantity"
                        value={quantity}
                        onChange={(e)=>setQuantity(e.target.value)}
                        autoFocus
                        label="Quantity"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="total"
                        className={classes.fields}
                        variant="outlined"
                        required
                        fullWidth
                        id="total"
                        value={total}
                        label="Total"
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