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
export default function BorrowBook({isOpen,book,close}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);
  const [title] = useState(book.Title||'');
  const [issueDate, setIssueDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(d);
  const context = useContext(stateContext);

  const handleClose = () => {
    setOpen(false);
    close();
  };

  useEffect(() => {
    console.log(book);
    setOpen(isOpen)
  }, [isOpen])


  const saveBook= async (event)=>{
    event.preventDefault();
    try{
        context.dispatch(setIsLoading(true));
        const borrow={
          UserCode:localStorage.getItem('UserId')||'',
          BookCode:book.Id,
          BorrowingDate: issueDate,
          ReturnDate: returnDate
        }
        console.log(borrow);
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
        <form className={classes.form} onSubmit={saveBook}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
          <Grid item xs={12} sm={12}>
             <Typography variant="body1" color="textPrimary" component="h3">{book.Title}</Typography>
             <Typography variant="body2" color="textSecondary" component="p">By - {book.Author}</Typography>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            
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