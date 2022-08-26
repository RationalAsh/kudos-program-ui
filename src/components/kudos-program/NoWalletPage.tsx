import { Typography } from '@mui/material';
import * as React from 'react';

export interface INoWalletPageProps {
}

export default function NoWalletPage (props: INoWalletPageProps) {
    return (
        <Typography variant="h4" sx={{mt: 10}}>
            Connect wallet to get started.
        </Typography>
    );
}
