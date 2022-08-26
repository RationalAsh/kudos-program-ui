import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import * as React from 'react';
import * as anchor from "@project-serum/anchor";
import { PublicKey } from '@solana/web3.js';

export interface IProfileCardProps {
    name: string,
    kudosReceived: anchor.BN,
    kudosGiven: anchor.BN,
    onKudos: any
}

export default function ProfileCard (props: IProfileCardProps) {
    return (
        <ListItem 
            alignItems="flex-start"
            secondaryAction= {
                <Tooltip 
                    title={"Create Account"} 
                    arrow>
                <IconButton 
                    onClick={props.onKudos}
                    edge="end" 
                    aria-label="comments">
                    <ThumbUpIcon />
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
