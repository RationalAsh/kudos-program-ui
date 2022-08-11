import { Divider, List } from '@mui/material';
import * as React from 'react';
import UserCard from './UserCard';

export interface IKudosProgramUIProps {
}

export default function KudosProgramUI (props: IKudosProgramUIProps) {
    return (
        <>
        <List sx={{ width: '100%', maxWidth: 420, bgcolor: 'background.paper' }}>
            <Divider variant="inset" component="li" />
            <UserCard name="Ashwin" kudos_given={BigInt(10)} kudos_received={BigInt(10)}/>
            <Divider variant="inset" component="li" />
        </List>
        </>
    );
}
