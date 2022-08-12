import { Divider, List, Typography } from '@mui/material';
import * as anchor from "@project-serum/anchor";
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import * as React from 'react';
import UserCard from './UserCard';

export interface IKudosProgramUIProps {
}

export default function KudosProgramUI (props: IKudosProgramUIProps) {
    // Set up anchor provider with wallet adapter.
    const wallet = useAnchorWallet();
    const { connection } = useConnection();
    if (wallet) {
        const provider = new anchor.AnchorProvider(
            connection, 
            wallet,
            {
                commitment: "max",
                preflightCommitment: "max",
                skipPreflight: false
            }
        )
    }
    
    return (
        <>
        <List sx={{ width: '100%', maxWidth: 420, bgcolor: 'background.paper' }}>
            <Typography variant="h5" component="div" gutterBottom sx={{m: '20px'}}>
                Your Profile
            </Typography>
            <Divider variant="inset" component="li" />
            <UserCard name="Ashwin" kudos_given={BigInt(10)} kudos_received={BigInt(10)}/>
            <Divider variant="inset" component="li" />
            <Typography variant="h5" component="div" gutterBottom sx={{m: '20px'}}>
                Profiles
            </Typography>
            <Divider variant="inset" component="li" />
            <UserCard name="Grodd" kudos_given={BigInt(10)} kudos_received={BigInt(10)}/>
            <Divider variant="inset" component="li" />
        </List>
        </>
    );
}
