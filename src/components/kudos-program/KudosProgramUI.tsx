import { Divider, List, Typography } from '@mui/material';
import * as React from 'react';
import UserCard from './UserCard';

export interface IKudosProgramUIProps {
}

export default function KudosProgramUI (props: IKudosProgramUIProps) {
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
                Your Colleagues
            </Typography>
        </List>
        </>
    );
}
