import { Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, List, Modal, TextField, Typography } from '@mui/material';
import * as anchor from "@project-serum/anchor";
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useEffect } from 'react';
import { KudosClient } from '../client/KudosClient';
import { IDL } from '../client/kudos_program';
import ProfileCard from './ProfileCard';
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
    const [ otherUsers, setOtherUsers ] = React.useState<any[]>([]);

    // Registration modal
    const [ openRegistrationModal, setOpenRegistrationModal ] = React.useState<boolean>(false);
    const [ creating, setCreating ] = React.useState<boolean>(false);
    const [ userName, setUserName ] = React.useState<string>("");
    const [ isLoading, setIsLoading ] = React.useState<boolean>(false);

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
        });
        getUsers().catch((err) => {
            enqueueSnackbar(err.toString(), {variant: "error", autoHideDuration: 5000});
        });
    }, [kudosClient, userInitialized])
    
    function handleCreate(event: any) {
        // console.log(await kudosClient?.findUsers());
        setOpenRegistrationModal(false);
        enqueueSnackbar("Creating your new account....", {variant: "info", autoHideDuration: 5000});
        setCreating(true);
        kudosClient?.createAccountForUser(userName)
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
        setIsLoading(true);
        kudosClient?.getCurrentUser()
                    .then((res) => {
                        setUserStats(res);
                        setUserInitialized(true);
                        setIsLoading(false);
                    })
                    .catch((err) => {
                        setUserInitialized(false);
                        setIsLoading(false);
                        // enqueueSnackbar(err.toString(), {variant: "error", autoHideDuration: 5000});
                    })
    }

    async function getUsers() {
        setIsLoading(true);
        kudosClient?.findUsers()
                    .then((accs) => {
                        const accsOther = accs.filter((item) => {
                            if (wallet) {
                                return !(item.publicKey.equals(wallet?.publicKey));
                            } else {
                                return true;
                            }
                        })
                        setIsLoading(false);
                        setOtherUsers(accsOther);
                        console.log(accsOther);
                    })
                    .catch((err) => {
                        console.log(err);
                        setIsLoading(false);
                    });
    } 

    async function handleCloseAccount(event: any) {
        setIsLoading(true);
        console.log(event.target.id);
        const res = await kudosClient?.closeAccount()
            .then((res) => {
                setIsLoading(false);
                enqueueSnackbar(res, {variant: "success", autoHideDuration: 5000});
                enqueueSnackbar("Account closed!", {variant: "success", autoHideDuration: 5000});
                setUserInitialized(false);
            })
            .catch((res) => {
                setIsLoading(false);
                enqueueSnackbar(res, {variant: "error", autoHideDuration: 5000});
            });
        console.log(res);
    }

    async function handleKudos(pkey: PublicKey) {
        setIsLoading(true);
        console.log('Giving kudos to' + pkey.toBase58());
        const res = await kudosClient?.giveKudos(pkey)
            .then((res) => {
                setIsLoading(false);
                enqueueSnackbar(res.toString(), {variant: "success", autoHideDuration: 5000});
            })
            .catch((res) => {
                setIsLoading(false);
                enqueueSnackbar(res.toString(), {variant: "error", autoHideDuration: 5000});
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
                    onNameChangeRequest={undefined}
                    onAccountCloseRequest={handleCloseAccount}
                    accountInitialized={userInitialized}
                    accountPubKey={PublicKey.default}/>
            }
            <Divider variant="inset" component="li" />
            <Typography variant="h5" component="div" gutterBottom sx={{m: '20px'}}>
                Profiles
            </Typography>
            {/* <UserCard 
                name="Grodd" 
                kudosGiven={new anchor.BN(0)} 
                kudosReceived={new anchor.BN(0)}
                accountInitialized={true}
                accountPubKey={PublicKey.default}
                onAccountCloseRequest={undefined}
                onNameChangeRequest={undefined}/> */}
            { otherUsers.length > 0 ? 
              otherUsers.map((item, index) => 
                <ProfileCard
                    key={`card-user-${index}`}
                    name={item.name}
                    kudosGiven={item.kudosGiven}
                    kudosReceived={item.kudosReceived}
                    pubkey={otherUsers[index].publicKey}
                    onKudos={handleKudos}/>
              ) : <></> }
        </List>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            onClick={undefined}
            >
            Sending kudos....
            <CircularProgress color="inherit" />
        </Backdrop>
        </>
    );
}
