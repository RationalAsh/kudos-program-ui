import { Avatar, Card, CardContent, IconButton, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

export interface IUserCardProps {
    name: string,
    kudos_received: BigInt,
    kudos_given: BigInt
}

export default function UserCard (props: IUserCardProps) {
    return (
        <ListItem 
            alignItems="flex-start"
            secondaryAction= {
                <Tooltip title="Give Kudos!" arrow>
                <IconButton edge="end" aria-label="comments">
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
                            {props.kudos_given.toString()} 
                        </Typography>
                        {' -- Kudos Given ::: '}
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {props.kudos_received.toString()} 
                        </Typography>
                        {' -- Kudos Received'}
                    </React.Fragment>
            }
            />
        </ListItem>
    );
}
