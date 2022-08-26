import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import * as React from 'react';
import * as anchor from "@project-serum/anchor";
import { PublicKey } from '@solana/web3.js';

export interface IProfileCardProps {
    name: string,
    pubkey: PublicKey,
    kudosReceived: anchor.BN,
    kudosGiven: anchor.BN,
    onKudos: any
}

export default function ProfileCard (props: IProfileCardProps) {

    async function kudosHandler(event: any) {
        console.log('kudos:' + props.pubkey.toBase58());
        const res = await props.onKudos(props.pubkey);
    }

    return (
        <ListItem 
            alignItems="flex-start"
            secondaryAction= {
                <Tooltip 
                    title={"Give Kudos"} 
                    arrow>
                <IconButton 
                    onClick={kudosHandler}
                    edge="end" 
                    aria-label="comments"
                    id={'kudos:' + props.pubkey.toBase58()}>
                    <ThumbUpIcon id={'kudos:' + props.pubkey.toBase58()}/>
                </IconButton>
                </Tooltip>
            }>
            <ListItemAvatar>
                <Avatar alt={props.name} src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary={props.name}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {props.kudosGiven.toString()} 
                        </Typography>
                        {' -- Kudos Given ::: '}
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {props.kudosReceived.toString()} 
                        </Typography>
                        {' -- Kudos Received'}
                    </React.Fragment>
            }
            />
        </ListItem>
    );
}
