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

import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Base64 } from 'js-base64';
import BACKEND_HOST from '../Const';

function ObjectList() {
  const columns = [{ field: 'object', headerName: 'Object', width: 300 }];

  const [objects, setObjects] = useState([]);

  const { bucket } = useParams();

  const fetchObjects = async () => {
    const response = await fetch(`${BACKEND_HOST}/api/minio/buckets/${bucket}/objects`);
    const data = await response.json();
    setObjects(data.map((aux) => ({ id: aux.object_name, object: aux.object_name })));
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchObjects();
  }, []);

  const handleEvent = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    navigate(`/minio/buckets/${bucket}/objects/${Base64.encode(params.row.object)}`);
  };

  return (
    <div>
      <h1>Buckets</h1>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          onRowClick={handleEvent}
          rows={objects}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </div>
  );
}

export default ObjectList;
