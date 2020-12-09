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
  },
}));

export default function AddBook({history,isOpen,close}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0)
  const context = useContext(stateContext);

  const handleClose = () => {
    setOpen(false);
    close();
  };

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const saveBook= async (event)=>{
    event.preventDefault();
    try{
        context.dispatch(setIsLoading(true));
        context.dispatch(setIsLoading(false));
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
        <DialogTitle id="max-width-dialog-title">New Book</DialogTitle>
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
                        onChange={(e)=>setTitle(e.target.value)}
                        autoFocus
                        label="Title"
                      />
                    </Grid>
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