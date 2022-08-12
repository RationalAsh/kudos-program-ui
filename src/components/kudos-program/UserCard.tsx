import { Avatar, Card, CardContent, IconButton, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

export interface IUserCardProps {
    name: string,
    kudosReceived: BigInt,
    kudosGiven: BigInt,
    onKudos: React.MouseEventHandler<HTMLButtonElement>
}

export default function UserCard (props: IUserCardProps) {
    return (
        <ListItem 
            alignItems="flex-start"
            secondaryAction= {
                <Tooltip title="Give Kudos!" arrow>
                <IconButton edge="end" aria-label="comments" onClick={props.onKudos}>
                    <ThumbUpOffAltIcon />
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
