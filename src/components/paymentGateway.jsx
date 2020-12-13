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

export default function Paymentgateway({isOpen,book,close}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);
//   const [title] = useState(book.Title||'');
//   const [price, setPrice] = useState(book.Price||0);
//   const [id] = useState(book.id||'');
//   const [quantity, setQuantity] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [creditCardNo, setcreditCardNo] = useState('');
//   const context = useContext(stateContext);

  const handleClose = () => {
    setOpen(false);
    close();
  };

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

//   useEffect(() => {
//     setTotal(price*quantity);
//   }, [quantity,price])

//   const saveBook= async (event)=>{
//     event.preventDefault();
//     try{
//         context.dispatch(setIsLoading(true));
//         const order={
//           CreditCard:creditCardNo,
//           OrderDateAndTime: new Date(),
//           BookCode:id,
//           UserCode:localStorage.getItem('userId')||'',
//           Price: price,
//           Quantity: quantity
//         }
//         context.dispatch(setIsLoading(false));
//         close();
//     } catch(error){
//       context.dispatch(setIsLoading(false));
//     }
//   }
    
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Payment Gateway</DialogTitle>
        <DialogContent>
            <div>Hi. this is payment page!</div>
        </DialogContent>
      </Dialog>

      {/* {isPurchaseBookOpen?(<PaymentGateway isOpen={isPurchaseBookOpen} close={closePurchaseBook}/>):("")} */}
    </React.Fragment>
  );

}