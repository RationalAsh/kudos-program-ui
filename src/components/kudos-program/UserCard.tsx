import { Avatar, Card, CardContent, IconButton, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import * as anchor from "@project-serum/anchor";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export interface IUserCardProps {
    name: string,
    kudosReceived: anchor.BN,
    kudosGiven: anchor.BN,
    onKudos: React.MouseEventHandler<HTMLButtonElement> | undefined
    accountInitialized: boolean
}

export default function UserCard (props: IUserCardProps) {
    return (
        <ListItem 
            alignItems="flex-start"
            secondaryAction= {
                <Tooltip 
                    title={ props.accountInitialized ? "Give Kudos!" : "Create Account"} 
                    arrow>
                <IconButton edge="end" aria-label="comments" onClick={props.onKudos}>
                    { props.accountInitialized ? 
                        <ThumbUpOffAltIcon /> :
                        <PersonAddIcon />
                    }
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
