import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, TextField, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export interface IRegisterCardProps {
    userName: string,
    setUserName: React.Dispatch<React.SetStateAction<string>>,
    registerInProgress: boolean,
    onRegister?: React.MouseEventHandler<HTMLButtonElement>
}

export default function RegisterCard (props: IRegisterCardProps) {
    return (
        <ListItem 
            alignItems="flex-start"
            secondaryAction= {
                <Tooltip 
                    title={"Create Account"} 
                    arrow>
                <IconButton 
                    onClick={props.onRegister}
                    edge="end" 
                    aria-label="comments">
                    <PersonAddIcon />
                </IconButton>
                </Tooltip>
            }>
            <ListItemAvatar>
                <Avatar alt="~" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <TextField 
                        id="user-name" 
                        label="Name" 
                        variant="filled" 
                        fullWidth
                        sx={{ mb: '5px' }}
                        value={props.userName}
                        onChange={(e) => props.setUserName(e.target.value)}
                        disabled={props.registerInProgress}
                        size='small'/>
                }
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {"Create your account to start."} 
                        </Typography>
                    </React.Fragment>
            }
            />
        </ListItem>
    );
}
