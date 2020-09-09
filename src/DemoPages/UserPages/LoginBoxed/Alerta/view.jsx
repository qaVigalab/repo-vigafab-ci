import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setOpenAlert } from '../../../../actions/dashboardActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles((theme) => ({
  root: {
    
    '& > * + *': {
      marginTop: theme.spacing(2),
      
    },
    left:"30%",
    right:"30%",
    position:"fixed",
    bottom:"1rem",
  },
  cookieAlert:{
    background:"#2f4554"
  }
}));

const TransitionAlerts = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(()=> {
    setOpen(props.openAlert)
  }, [props.openAlert])

  

  return (
    
      <Collapse className={classes.root} in={open}>
        <Alert
        className={classes.cookieAlert}
        variant="filled"
        icon={false}
        action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                props.setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
        <AlertTitle className="titulo_alerta">Error</AlertTitle>
            Usuario y/o contraseña incorrectos.
        </Alert>
      </Collapse>
   
  );
}

const mapStateToProps = state => ({
  openAlert: state.dashboardReducers.openAlert
  
});
const mapDispatchToProps = dispatch => ({

  setOpenAlert: enable => dispatch(setOpenAlert(enable)),

});


export default connect(mapStateToProps,  mapDispatchToProps )(TransitionAlerts);