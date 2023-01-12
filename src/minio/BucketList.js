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
import { useNavigate } from 'react-router-dom';
import BACKEND_HOST from '../Const';

function BucketList() {
  const columns = [{ field: 'bucket', headerName: 'Bucket', width: 300 }];

  const [buckets, setBuckets] = useState([]);

  const fetchBuckets = async () => {
    const response = await fetch(`${BACKEND_HOST}/api/minio/buckets`);
    const data = await response.json();
    setBuckets(data.map((aux) => ({ id: aux.bucket_name, bucket: aux.bucket_name })));
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchBuckets();
  }, []);

  const handleEvent = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    navigate(`/minio/buckets/${params.row.bucket}`);
  };

  return (
    <div>
      <h1>Buckets</h1>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          onRowClick={handleEvent}
          rows={buckets}
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

export default BucketList;
