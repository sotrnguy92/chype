import React, {useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
// import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { useSelector } from "react-redux";
// import MenuBar from './Menu';
import CancelIcon from '@material-ui/icons/Cancel';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem} from "@material-ui/core";
import {Link} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DetailsIcon from '@material-ui/icons/Details';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Collapse from "../pages/SettingsPage";

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: 60,
        fontSize: 1,
        backgroundColor:'transparent',
        color:'white'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
        marginBottom: '0',
    },
    icon: {
        marginBottom: '0',
    },
    header: {
        fontSize: 10,
        backgroundColor:'transparent',
        color:'black'
    }
}));

export default function LoggedInUserCard() {
    const ReduxUserState = useSelector(state=>state.user);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [friendList, setFriendList] = React.useState([]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        console.log(ReduxUserState);
    })

    // const [expanded, setExpanded] = React.useState(false);

    // const handleExpandClick = () => {
    //   setExpanded(!expanded);
    // };

    return (

        <div >
            <Card style={{ paddingBottom: '1px' }} className={classes.root}>
                <CardHeader
                    className={classes.header}
                    avatar={
                        <StyledBadge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            variant="dot"
                        >
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {`${ReduxUserState.firstName[0].toUpperCase()}${ReduxUserState.lastName[0].toUpperCase()}`}
                            </Avatar>
                        </StyledBadge>
                    }
                    action={
                        <IconButton aria-label="settings" className={classes.icon}>
                            <CancelIcon color= "secondary" />
                        </IconButton>

                    }

                    title={`${ReduxUserState.firstName} ${ReduxUserState.lastName}`}

                />


            </Card>
        </div>
    );
}
