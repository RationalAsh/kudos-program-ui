import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Dispatch, SetStateAction } from 'react';
import { Box, Grid, Link } from '@mui/material';
import { Container } from 'react-bootstrap';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AboutDialogProps {
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
}

export default function AboutDialog(props: AboutDialogProps) {
    // const [open, setOpen] = React.useState(props.show);

  
    return (
      <div>
        <Dialog
          fullScreen
          open={props.show}
          onClose={() => props.setShow(false)}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => props.setShow(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                About
              </Typography>
              <Button autoFocus color="inherit" onClick={() => props.setShow(false)}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <Box sx={{ p: 2 }}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12} md={6}>
              <Typography variant="body1">
              This is a React frontend for the Kudos Program smart contract on Solana. It's a
              a simple program that allows you to create a named profile that other users can
              give "kudos" to. The frontend displays all the kudos you've given as well as all
              the kudos you've received. This app was built as part of the Solana Summer Camp 
              2022.

              The app currently runs on the Solana Devnet. So you do not need real money to use
              it. However, you do need to airdrop yourself some SOL to your devnet wallet. You
              can use my <Link rel='noreferrer'
                               href='https://www.ashwinnarayan.com/dapps/solana-faucet/'
                               target='_blank'>Solana Faucet</Link> to do so.

              The smart contract is open source and written in Rust. Visit  
              <Link rel="noreferrer" 
                    href="https://github.com/RationalAsh/kudos-program" 
                    target="_blank"> the github page </Link>  
              to view the source code.
              
              To find out more about me, 
              check out <Link rel="noreferrer" href="https://www.ashwinnarayan.com/" target="_blank">my home page</Link>.
              </Typography>
              <p></p>
              <Typography variant="h4">
              FAQ
              </Typography>
              
              <Typography variant="h5">
              What are Kudos?
              </Typography>
              <Typography variant="body1">
              Kudos represent a measure of every time someone thought to congratulate you or 
              appreciate you for something you've done.
              </Typography>
              
              </Grid>
            </Grid>
          </Box>
        </Dialog>
      </div>
    );
  }