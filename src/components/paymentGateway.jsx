import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PayPal from './paypall';

const useStyles = makeStyles((theme) => ({
    dialogBody:{
      padding:"20px 20px"
    },
    action:{
      display:"flex",
      justifyContent:"space-between"
    },
    actnbtn:{
      width:"48%"
    }
}));

export default function Paymentgateway({isOpen,close}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);
  const [checkout, setCheckout] = useState(false);

  const handleClose = () => {
    close();
    setOpen(false);
  };
  useEffect(() => {
    setOpen(isOpen)

    const script = document.createElement('script');

    script.src = "https://www.paypal.com/sdk/js?client-id=AW58aRhVgXPmn5TthOz4HG_4JD1xb02GERoe6r8bmrRrj2Vgfm4cJbd-x_9hqAe5YBux2j0M5inRGjX4&currency=SGD";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [isOpen])
    
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
        <DialogContent  className={classes.dialogBody}>
            <h3>Hi. Do you want to proceed to checkout?</h3>
            <div>
              {checkout ? (
                <PayPal/>
               ) : (
                 <div className={classes.action}>
                  <Button  className={classes.actnbtn} variant="contained" color="basic" onClick={handleClose}>Cancel</Button>
                  <Button  className={classes.actnbtn} variant="contained" color="primary" onClick={() => {
                    setCheckout(true);
                  }}>Checkout</Button>
              </div>
               )}
            </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );

}