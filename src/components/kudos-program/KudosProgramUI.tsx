import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, List, Modal, TextField, Typography } from '@mui/material';
import * as anchor from "@project-serum/anchor";
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useEffect } from 'react';
import { KudosClient } from '../client/KudosClient';
import { IDL } from '../client/kudos_program';
import RegisterCard from './RegisterCard';
import UserCard from './UserCard';

export interface IKudosProgramUIProps {
}
  

export default function KudosProgramUI (props: IKudosProgramUIProps) {
    // Set up anchor provider with wallet adapter.
    const wallet = useAnchorWallet();
    const { connection } = useConnection();
    const { enqueueSnackbar } = useSnackbar();
    const [kudosClient, setKudosClient] = React.useState<KudosClient | undefined>(undefined);
    const [ userInitialized, setUserInitialized ] = React.useState<boolean>(false);
    const [ userStats, setUserStats ] = React.useState({
        name: "Not initialized",
        kudosReceived: new anchor.BN(0),
        kudosGiven: new anchor.BN(0),
        bump: 255
    });
    const [ otherUsers, otherUserStats ] = React.useState([]);

    // Registration modal
    const [ openRegistrationModal, setOpenRegistrationModal ] = React.useState<boolean>(false);
    const [ creating, setCreating ] = React.useState<boolean>(false);
    const [ userName, setUserName ] = React.useState<string>("");

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
            // Find the user accoun
        }
    }, [wallet, connection])

    useEffect(() => {
        findUserAccount(undefined).catch((err) => {
            enqueueSnackbar(err.toString(), {variant: "error", autoHideDuration: 5000});
        })
    }, [kudosClient, userInitialized])
    
    function handleCreate(event: any) {
        // console.log(await kudosClient?.findUsers());
        setOpenRegistrationModal(false);
        enqueueSnackbar("Creating your new account....", {variant: "info", autoHideDuration: 5000});
        setCreating(true);
        kudosClient?.createAccountForUser("Ashwin")
                    .then((res) => {
                        enqueueSnackbar(res, {variant: "success", autoHideDuration: 5000});
                        setUserInitialized(true);
                        setCreating(true);
                    })
                    .catch((err) => {
                        enqueueSnackbar(err.toString(), {variant: "error", autoHideDuration: 5000});
                        console.log(err.toString());
                        setCreating(false);
                    });
        // enqueueSnackbar("Creating your new account....", {variant: "info", autoHideDuration: 5000});
    }

    async function findUserAccount(event: any) {
        kudosClient?.getCurrentUser()
                    .then((res) => {
                        setUserStats(res);
                    })
                    .catch((err) => {
                        setUserInitialized(false);
                        // enqueueSnackbar(err.toString(), {variant: "error", autoHideDuration: 5000});
                    })
    }

    return (
        <>
        <List sx={{ width: '100%', maxWidth: 420, bgcolor: 'background.paper' }}>
            <Typography variant="h5" component="div" gutterBottom sx={{m: '20px'}}>
                Your Profile
            </Typography>
            <Divider variant="inset" component="li" />
            { !userInitialized 
                ? <RegisterCard 
                    userName={userName}
                    setUserName={setUserName}
                    registerInProgress={creating}
                    onRegister={handleCreate}/>
                : <UserCard 
                    name={userStats.name}
                    kudosGiven={userStats.kudosGiven}
                    kudosReceived={userStats.kudosReceived}
                    onKudos={undefined}
                    accountInitialized={userInitialized}/>
            }
            
            {/* <UserCard 
                name={userStats.name}
                kudosGiven={userStats.kudosGiven} 
                kudosReceived={userStats.kudosReceived}
                onKudos={userInitialized ? findUserAccount : () => setOpenRegistrationModal(true)}
                accountInitialized={userInitialized}/> */}
            <Divider variant="inset" component="li" />
            <Typography variant="h5" component="div" gutterBottom sx={{m: '20px'}}>
                Profiles
            </Typography>
            <Divider variant="inset" component="li" />
            <UserCard 
                name="Grodd" 
                kudosGiven={new anchor.BN(0)} 
                kudosReceived={new anchor.BN(0)}
                onKudos={() => {}}
                accountInitialized={true}/>
            <Divider variant="inset" component="li" />
        </List>
        </>
    );
}
