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

/**
 * Styles for the book component
 */
const useStyles = makeStyles((theme) => ({
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

/**
 * Declaration for Book component
 * @param {*} param0 
 */
export default function Book({book,purchaseBook,borrowBook}) {
  const classes = useStyles();
  // Variable deaclartion for roleType to determine what to show for thr logedIn user
  const [roleType] = useState(Number(localStorage.getItem('role')))

  /**
   * Method to open the purchase book popup
   */
  const purchase=()=>{
    purchaseBook(book);
  }

  /**
   * Method to open the borrow book popup
   */
  const borrow=()=>{
    borrowBook(book)
  }

  return (
    <Card className={classes.root}>
      {/* Card header with book tile and author name */}
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {book.title.slice(0,2).toUpperCase()}
          </Avatar>
        }
        title={book.title}
        subheader={`-By ${book.publisher}`}
      />
      {/* Book image */}
      <CardMedia
        className={classes.media}
        image={bookurl}
        title="Paella dish"
      />
      {/* Book Description */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {book.description.length>125?`${book.description.slice(0,120)} . . .`:book.description}
        </Typography>
      </CardContent>
      {/* card action like purchase borrow and pric eof the book */}
      <CardActions className={classes.footer}>
          <div>
            {roleType===1?(
              <Tooltip title="Issue book" aria-label="issuebook">
                <IconButton aria-label="issue book" onClick={borrow}>
                    <LocalLibraryIcon/>
                </IconButton>
              </Tooltip>
            ):roleType===2?(
              <Tooltip title="Purchse Book" aria-label="Purchase">
                  <IconButton aria-label="purchase" onClick={purchase}>
                      <ShoppingCartIcon />
                  </IconButton>
              </Tooltip>
            ):("")}
          </div>
          {roleType!==1?(<Typography  color="textSecondary" component="p">
            $ {book.price}
        </Typography>):("")}
      </CardActions>
     </Card>
  );
}