import React,{useState, useContext, useEffect} from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {postApi} from '../services/apiservice';
import {stateContext} from '../context';
import {setIsLoading} from '../context/action'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';

/**
 * Styles for borrow book component
 */
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

var d = new Date();
d.setDate(d.getDate()+parseInt(14));

/**
 * Borrow book component declaration
 * @param {*} param0 
 */
export default function BorrowBook({isOpen,book,close}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);
  const [issueDate, setIssueDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(d);
  const context = useContext(stateContext);

  /**
   * Method to close borrow book
   */
  const handleClose = () => {
    setOpen(false);
    close();
  };

  // Useeffect run when component loads for the first time and when isOpen variable changes
  useEffect(() => {
    console.log(book);
    setOpen(isOpen)
  }, [isOpen])


  /**
   * Mathod to save borrowed book
   * @param {*} event 
   */
  const saveBorrowedBook= async (event)=>{
    event.preventDefault();
    try{
        context.dispatch(setIsLoading(true));
        handleClose();
        const borrow={
          UserCode:localStorage.getItem('userCode')||'',
          BookCode:book.bookCode,
          BorrowingDate: issueDate,
          ReturnDate: returnDate
        }
        const response= await postApi('SaveLoan',borrow);
        context.dispatch(setIsLoading(false));
        close();
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
        <DialogTitle id="max-width-dialog-title">Borrow Book</DialogTitle>
        <DialogContent>
          {/* Form for borrow book */}
        <form className={classes.form} onSubmit={saveBorrowedBook}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        {/* Header for borrow book */}
          <Grid item xs={12} sm={12}>
            {/* Book name */}
             <Typography variant="body1" color="textPrimary" component="h3">{book.title}</Typography>
             {/* Book author name */}
             <Typography variant="body2" color="textSecondary" component="p">By - {book.author}</Typography>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* Date input for borrowed date */}
                  <Grid item xs={12}>
                      <KeyboardDatePicker
                          disableToolbar
                          variant="outlined"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Issued Date"
                          value={issueDate}
                          fullWidth
                          readOnly={true}
                          onChange={setIssueDate}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </Grid>
                {/* date selector for book return date */}
                  <Grid item xs={12}>
                      <KeyboardDatePicker
                          disableToolbar
                          variant="outlined"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Return Date"
                          value={returnDate}
                          fullWidth
                          readOnly={true}
                          onChange={setReturnDate}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </Grid>
                </MuiPickersUtilsProvider>
              {/* button to confirm the borrowed book */}
                <Grid item xs={12} sm={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            Save
                        </Button>
                </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}