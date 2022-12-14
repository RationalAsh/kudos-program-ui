import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControlLabel, Grid, InputAdornment, Paper, Radio, RadioGroup, Switch, TextField } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useSnackbar } from 'notistack';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';


const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
      Airdrop Yourself SOL
      </Typography>
      <TextField
      required
      id='public-key'
      label="Wallet Public Key"
      defaultValue=""/>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
  );
  
  export default function Airdropper() {
    // Set up our context and state.
    // const { connection } = useConnection();
    const { publicKey, connected } = useWallet();
    const [ currentPubkey, setCurrentPubkey ] = useState("");
    const [ solAmount, setSolAmount ] = useState<number>(1.0);
    const [ isTestnet, setIsTestnet ] = useState<boolean>(true);
    
    const [ errorString, setErrorString ] = useState<string>(""); 
    const [ showError, setShowError ] = useState<boolean>(false);
    const [ showTransactionStart, setShowTransactionStart ] = useState<boolean>(false);
    const [ showTransactionSuccess, setShowTransactionSuccess ] = useState<boolean>(false);
    
    // Set up different connections for testnet and devnet.
    const testnetURL = clusterApiUrl(WalletAdapterNetwork.Testnet);
    const testnetConnection = new Connection(testnetURL);
    const devnetURL = clusterApiUrl(WalletAdapterNetwork.Devnet);
    const devnetConnection = new Connection(devnetURL);
    const { enqueueSnackbar } = useSnackbar();
    
    function handleSolChange(event: any) {
      // setSolAmount(event.target.value.parseFloat());
      console.log(event)
    }
    
    // Request airdrop
    async function handleAirdropRequest(event: any) {
      if (publicKey) {
        enqueueSnackbar('Airdrop requested.', { variant: 'info', autoHideDuration: 3000});
        try {
          await ((isTestnet ? testnetConnection : devnetConnection)
          .requestAirdrop(publicKey, LAMPORTS_PER_SOL * solAmount))
          .then((resp: any) => {
            console.log(resp);
            enqueueSnackbar('Transaction Success!', { variant: 'success', autoHideDuration: 3000});
          })
          .catch((error) => {
            console.log(error);
            enqueueSnackbar(error.toString(), { variant: 'error', autoHideDuration: 3000});
          });
        } catch (error: any) {
          console.log(error);
          enqueueSnackbar(error.toString(), { variant: 'error', autoHideDuration: 3000});
        }
      } else {
        try {
          setShowTransactionStart(true);
          const pkey = new PublicKey(currentPubkey);
          await ((isTestnet ? testnetConnection : devnetConnection)
          .requestAirdrop(pkey, LAMPORTS_PER_SOL * solAmount))
          .then((resp: any) => {
            console.log(resp);
            enqueueSnackbar('Transaction Success!', { variant: 'success', autoHideDuration: 3000});
          })
          .catch((error) => {
            console.log(error);
            enqueueSnackbar(error.toString(), { variant: 'error', autoHideDuration: 3000});
          });
        } catch (error: any) {
          console.log(error);
          enqueueSnackbar(error.toString(), { variant: 'error', autoHideDuration: 3000});
        }
      }
    }
    
    return (
      <Grid 
      container  
      justifyContent="center"
      sx={{ m: 5 }}>
        <Grid item xs={12} md={5}>
          <Paper elevation={5} sx={{ p: 2 }}>
            <Grid rowSpacing={2} columnSpacing={2}>
              <Grid item>
                <Typography variant='h5'>
                  Airdrop Yourself SOL!
                </Typography>
              </Grid>
              <Grid item>
                <TextField 
                id="public-key" 
                label="Public Key" 
                variant="filled" 
                disabled={connected}
                value={publicKey ? publicKey.toBase58() : currentPubkey}
                onChange={(e) => setCurrentPubkey(e.target.value)}
                fullWidth
                margin='normal'/>
              </Grid>
              <Grid item>
                <TextField 
                id="sol-amount" 
                label="Amount of SOL" 
                variant="outlined"
                type="number" 
                defaultValue="1.0"
                onChange={handleSolChange}
                fullWidth
                margin='normal'/>
              </Grid>
              <Grid item>
                <FormGroup>
                <FormControlLabel 
                  control={<Switch onClick={() => setIsTestnet((old) => {return !old})} 
                                   checked={isTestnet} 
                                   defaultChecked />} 
                  label="Testnet" />
                <FormControlLabel 
                  control={<Switch onClick={() => setIsTestnet((old) => {return !old})}
                                   checked={!isTestnet}/>} 
                  label="Devnet" />
                </FormGroup>
              </Grid>
              <Grid item>
                <Button variant='contained' onClick={handleAirdropRequest}>Send!</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      );
    }
