import { Divider, List, Typography } from '@mui/material';
import * as anchor from "@project-serum/anchor";
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useEffect } from 'react';
import { KudosClient } from '../client/KudosClient';
import { IDL } from '../client/kudos_program';
import UserCard from './UserCard';

export interface IKudosProgramUIProps {
}

export default function KudosProgramUI (props: IKudosProgramUIProps) {
    // Set up anchor provider with wallet adapter.
    const wallet = useAnchorWallet();
    const { connection } = useConnection();
    const { enqueueSnackbar } = useSnackbar();
    const [kudosClient, setKudosClient] = React.useState<KudosClient | undefined>(undefined);
    const [ userStats, setUserStats ] = React.useState({});

    useEffect(() => {
        if (wallet) {
            setKudosClient(
                new KudosClient(
                    connection,
                    wallet
                )
            )
        }
        
        return () => {
            // Nothing to do
        }
    }, [wallet, connection])
    
    function handleCreate(event: any) {
        // console.log(await kudosClient?.findUsers());
        enqueueSnackbar("Creating your new account....", {variant: "info", autoHideDuration: 5000});
        kudosClient?.createAccountForUser("Ashwin")
                    .then((res) => {
                        enqueueSnackbar(res, {variant: "success", autoHideDuration: 5000});
                    })
                    .catch((err) => {
                        enqueueSnackbar(err.toString(), {variant: "error", autoHideDuration: 5000});
                        console.log(err.toString());
                    });
        // enqueueSnackbar("Creating your new account....", {variant: "info", autoHideDuration: 5000});
    }

    async function findUserAccount(event: any) {
        kudosClient?.getCurrentUser()
                    .then((res) => {
                        setUserStats(res);
                    })
    }
    
    return (
        <>
        <List sx={{ width: '100%', maxWidth: 420, bgcolor: 'background.paper' }}>
            <Typography variant="h5" component="div" gutterBottom sx={{m: '20px'}}>
                Your Profile
            </Typography>
            <Divider variant="inset" component="li" />
            { userStats. ?   
                <UserCard 
                    name=
                    kudosGiven={BigInt(10)} 
                    kudosReceived={BigInt(10)}
                    onKudos={findUserAccount}/>
            <Divider variant="inset" component="li" />
            <Typography variant="h5" component="div" gutterBottom sx={{m: '20px'}}>
                Profiles
            </Typography>
            <Divider variant="inset" component="li" />
            <UserCard 
                name="Grodd" 
                kudosGiven={BigInt(10)} 
                kudosReceived={BigInt(10)}
                onKudos={() => {}}/>
            <Divider variant="inset" component="li" />
        </List>
        </>
    );
}
