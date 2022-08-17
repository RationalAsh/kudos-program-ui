import { Avatar, Card, CardContent, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import * as anchor from "@project-serum/anchor";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { PublicKey } from '@solana/web3.js';

export interface IUserCardProps {
    name: string,
    kudosReceived: anchor.BN,
    kudosGiven: anchor.BN,
    onKudos: React.MouseEventHandler<HTMLButtonElement> | undefined
    accountInitialized: boolean
    accountPubKey: PublicKey
}

export default function UserCard (props: IUserCardProps) {
    // Anchor element for user menu.
    const [ userMenuAnchorEl, setUserMenuAnchorEl ] = React.useState<null | HTMLElement>(null);
    const open = Boolean(userMenuAnchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setUserMenuAnchorEl(event.currentTarget);
    };
      const handleClose = () => {
        setUserMenuAnchorEl(null);
    };

    return (
        <>
        <Divider variant="inset" component="li" />
        <ListItem 
            alignItems="flex-start"
            secondaryAction= {
                <Tooltip 
                    title={ props.accountInitialized ? "Give Kudos!" : "Create Account"} 
                    arrow>
                <IconButton edge="end" aria-label="comments" onClick={props.onKudos} id={props.accountPubKey.toBase58()}>
                    { props.accountInitialized ? 
                        <ThumbUpOffAltIcon id={props.accountPubKey.toBase58()}/> :
                        <PersonAddIcon id={props.accountPubKey.toBase58()}/>
                    }
                </IconButton>
                </Tooltip>
            }>
            <ListItemAvatar>
                <IconButton>
                    <Avatar alt={props.name} src="/static/images/avatar/3.jpg" />
                </IconButton>
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
        <Divider variant="inset" component="li" />
        </>
    );
}
