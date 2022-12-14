import { Avatar, Card, CardContent, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import * as anchor from "@project-serum/anchor";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { PublicKey } from '@solana/web3.js';

export interface IUserCardProps {
    name: string,
    kudosReceived: anchor.BN,
    kudosGiven: anchor.BN,
    onNameChangeRequest: any,
    onAccountCloseRequest: any,
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
    const handleClose = (event: any) => {
        setUserMenuAnchorEl(null);
        console.log(event.target.id);
        
        // First get the command
        const splitstr = event.target.id.split(':');
        const cmd = splitstr[0];
        // const pkey = PublicKey(splitstr[1]);

        switch (cmd) {
            case 'edit':
                console.log("Will edit name.");
                break;
            case 'delete':
                console.log('Will delete account.');
                props.onAccountCloseRequest(event);
                break;
            default:
                break;
        }
    };

    return (
        <>
        <Divider variant="inset" component="li" />
        <ListItem 
            alignItems="flex-start">
            <ListItemAvatar>
                <IconButton onClick={handleClick}>
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
        <Menu
            anchorEl={userMenuAnchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}>
            
            <MenuItem id={'edit:' + props.accountPubKey.toBase58()}>
                Edit Name
            </MenuItem>

            <MenuItem id={'delete:' + props.accountPubKey.toBase58()}>
                Delete Account
            </MenuItem>

        </Menu>
        </>
    );
}
