import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import kindnessCardImage from '../../kindness_card_image.png'

import '../../styles/Dialog.css'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

const HelpDialog = ({ open, setOpen }) => {
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          FAQs
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom variant="h6">
            <b>😊 What is Kindness Tracker?</b>
          </Typography>
          <Typography gutterBottom>
            The purpose of this app is to track the spread of acts of kindness and encourage people to pay it forward!
          </Typography>
          <Typography gutterBottom variant="h6">
            <b>🤔 How does it work?</b>
          </Typography>
          <Typography gutterBottom>
            We handed out kindness cards and encouraged people to pay it forward. When you do something nice for someone, you should give
            them a card. They fill out out a Google form to tell us what happened. Then, the process repeats!
            <img src={kindnessCardImage} className="kindness-card-image" />
          </Typography>
          <Typography gutterBottom variant="h6">
            <b>↔️ What does it mean to "trace" an act of kindness?</b>
          </Typography>
          <Typography gutterBottom>
            We mean that you are <b>tracing</b> the path this act of kindness has travelled as people pay it forward! The ID number on
            each kindness card allows us to link one act of kindness to another. The "trace" of a particular act of kindness is just the
            path of acts it lives on, with each act having the same ID number!
          </Typography>
          <Typography gutterBottom variant="h6">
            <b>🙋🏽‍♀️ I want to participate!</b>
          </Typography>
          <Typography gutterBottom>
            Stay tuned for more information on how you can get involved!
          </Typography>
          <Typography gutterBottom variant="h6">
            <b>⚠️ Where did you get the fake data from?</b>
          </Typography>
          <Typography gutterBottom>
            We just wrote a quick script to generate fake acts of kindness all over the United States, most of which are in Massachusetts.
            This data is just a placeholder while the app rolls out and more acts happen in the real world.
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default HelpDialog
