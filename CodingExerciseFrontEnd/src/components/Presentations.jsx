import React, { useEffect } from 'react'
import Header from './Header';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { baseUrl } from '../constants';
import axios from "axios";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

export default function Presentations() {
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const apiUrl = `${baseUrl}/api/Presentation/GetProfile`;
    axios.get(apiUrl).then((result) => {
      if (result.data && result.data.presentationList !== undefined && result.data.presentationList.length > 0) {
        setRows(result.data.presentationList);
      } else {
        setRows([]);
        alert("No data available.");
      }
    });
  }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    const user = localStorage.getItem("loggedUser");
    if (user !== undefined && user !== null) {
      window.location.href = `/edit/${id}`;
    }
    else {
      alert('Kindly login to edit the records.')
    }
  };

  const handleDeleteClick = (id) => () => {
    const user = localStorage.getItem("loggedUser");
    if (user !== undefined && user !== null) {
      if (window.confirm('Are you sure to delete this record?')) {
        const url = `${baseUrl}/api/Presentation/DeletePresentation?presentationID=${id}`
        axios.delete(url).then((result) => {
          if (result.status === 200) {
            getData();
            alert('Record deleted.')
          } else {
            alert("No record available.");
          }
        });
      }
    }
    else {
      alert('Kindly login to edit the records.')
    }
  };

  const columns = [

    {
      field: 'id',
      headerName: 'ID',
      type: 'number',
      width: 350,
      align: 'left',
      headerAlign: 'center',
      editable: true,
      align: 'center'
    },
    {
      field: 'title', headerName: 'Title', width: 350, editable: true, headerAlign: 'center',
      editable: true,
      align: 'center'
    },
    {
      field: 'duration',
      headerName: 'Duration',
      type: 'number',
      width: 350,
      headerAlign: 'center',
      editable: true,
      align: 'center'
    },
    {
      field: 'presenterName',
      headerName: 'PresenterName',
      width: 350,
      headerAlign: 'center',
      editable: true,
      align: 'center'
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      editable: true,
      align: 'center',
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Header />
      <Box
        sx={{
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          onRowEditStop={handleRowEditStop}
        />
      </Box>
    </>
  );
}
