/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Base64 } from 'js-base64';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import BACKEND_HOST from '../Const';

function ObjectPage() {
  const { bucket, object } = useParams();

  const [content, setContent] = useState([]);

  const [hexContent, setHexContent] = useState([]);

  const [open, setOpen] = React.useState(false);
  const fetchObject = async () => {
    const response = await fetch(`${BACKEND_HOST}/api/minio/buckets/${bucket}/objects/${object}`);
    setContent(response);
  };

  const fetchHexObject = async () => {
    setHexContent(Base64.encode(content));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchHexObject();
  }, []);

  return (
    <div>
      <h1>
        bucket: &nbsp;
        {bucket}
      </h1>
      <Button variant="contained" onClick={handleClickOpen}>
        show hex
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">hex content</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{hexContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
      <h1>Content: </h1>
      <p>{content}</p>
    </div>
  );
}

export default ObjectPage;
