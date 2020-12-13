import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import bookurl from '../assets/images/book.png';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  footer:{
      display:'flex',
      justifyContent:'space-around'
  }
}));

export default function Book({book,purchaseBook,borrowBook}) {
  const classes = useStyles();
  const [roleType] = useState(Number(localStorage.getItem('role')))

  const purchase=()=>{
    purchaseBook(book);
  }

  const borrow=()=>{
    borrowBook(book)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {book.title.slice(0,2).toUpperCase()}
          </Avatar>
        }
        title={book.title}
        subheader={`-By ${book.publisher}`}
      />
      <CardMedia
        className={classes.media}
        image={bookurl}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {book.description.length>125?`${book.description.slice(0,120)} . . .`:book.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.footer}>
          <div>
            {roleType===1?(
              <Tooltip title="Issue book" aria-label="issuebook">
                <IconButton aria-label="issue book" onClick={borrow}>
                    <LocalLibraryIcon/>
                </IconButton>
              </Tooltip>
            ):(
              <Tooltip title="Purchse Book" aria-label="Purchase">
                  <IconButton aria-label="purchase" onClick={purchase}>
                      <ShoppingCartIcon />
                  </IconButton>
              </Tooltip>
            )}
          </div>
        <Typography  color="textSecondary" component="p">
            $ {book.price}
        </Typography>
      </CardActions>
     </Card>
  );
}