import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from './Drawer'


const useStyles = makeStyles({
    main: {
        background: '#f9f9f9',
        width: '100%',
        padding: '6em 0 1em 5em',
    }
})

export function Layout(props) {
    
    const classes = useStyles()

    return (
        <>
        <Drawer />
        <div className={classes.main} spacing={2}>
            {props.children}
        </div>
        </>
    )
}
