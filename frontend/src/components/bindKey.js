import * as React from 'react';
import { useState, useEffect  } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton'
import { BindKey, GetBindStatus, UnBindKey } from '../utils/api'
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import Typography  from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

export default function BindKeyDialog(props) {
  const [bindStatus, setBindStatus] = useState(null);
  const [openAiId, setOpenAiId] = useState('');
  const [speechRegion, setSpeechRegion] = useState('');
  const [speechKey, setSpeechKey] = useState('');
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token')
    GetBindStatus(token)
    .then((res) => {
        setBindStatus(res.data.bindStatus);
    })
  }, [props]);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'openAiId') {
      setOpenAiId(value);
    } else if (name === 'speechRegion') {
      setSpeechRegion(value);
    } else if (name === 'speechKey') {
      setSpeechKey(value);
    }
  };

  const handleUnBindKey = async()=>{
    try{
        const token = localStorage.getItem('token')
        let res = await UnBindKey(token)
        setProgress(false);
        setOpenAiId('');
        setSpeechRegion('');
        setSpeechKey('');
        setBindStatus(null);
        props.handleClose(true, res.data.message);
    }
    catch(e){
        setProgress(false);
        setOpenAiId('');
        setSpeechRegion('');
        setSpeechKey('');
        setBindStatus(null);
        props.handleClose(true, e.response.data.message);
    }
  }

  const handleApiCall = async() => {
    setProgress(true);
    try {
        const token = localStorage.getItem('token')
        let res = await BindKey(token, openAiId, speechRegion, speechKey)
        setProgress(false);
        setOpenAiId('');
        setSpeechRegion('');
        setSpeechKey('');
        setBindStatus(null);
        props.handleClose(true, res.data.message);
    }
    catch (e) {
        setProgress(false);
        setOpenAiId('');
        setSpeechRegion('');
        setSpeechKey('');
        setBindStatus(null);
        props.handleClose(true, e.response.data.message);
    }
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Bind Your OpenAI and Azure Key</DialogTitle>
        <DialogContent>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
                <Typography variant="h6">Your current Bind Status :</Typography>  
            </Grid>
            <Grid item>
                <IconButton>
                    {bindStatus ? <CheckCircleOutline color="primary" fontSize="large" /> : <ErrorOutline color="error" fontSize="large" />}
                </IconButton>          
            </Grid>
          </Grid>
          <DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="openAiId"
              label="OpenAI Id"
              fullWidth
              value={openAiId}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="speechRegion"
              label="Azure Speech Region"
              fullWidth
              value={speechRegion}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="speechKey"
              label="Azure Speech Key"
              fullWidth
              value={speechKey}
              onChange={handleInputChange}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} disabled={progress}>
            Close
          </Button>
          <Button
            onClick={handleApiCall}
            disabled={progress || !openAiId || !speechRegion || !speechKey}
          >
            {progress ? <CircularProgress size={24} /> : 'Bind'}
          </Button>
          <div style={{ position: 'absolute', bottom: 0, left: 0, margin: '8px' }}>
            <Button onClick= {handleUnBindKey}>UnBind Key</Button>
        </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}