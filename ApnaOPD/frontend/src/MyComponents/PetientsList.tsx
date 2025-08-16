import React, { useState, useEffect } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { IconButton, Box } from "@mui/material";
import { Edit, Save, Close } from "@mui/icons-material";
import axios from "axios";

interface Patient {
    id: number;
    name: string;
    age: number;
    gender: string;
    contact: string;
    email: string;
    symptoms: string;
    findings: string;
    appointment_date: string;
}

const PatientGrid: React.FC = () => {
    const [rows, setRows] = useState<Patient[]>([]);
    const [editRowId, setEditRowId] = useState<number | null>(null);
    const [rowData, setRowData] = useState<Partial<Patient>>({});

    // Load all patients
    useEffect(() => {
        axios.get("http://localhost:5000/api/opd").then((res) => {
            setRows(res.data);
        });
    }, []);

    // Handle field change
    const handleEditChange = (id: number, field: string, value: any) => {
        setRowData((prev) => ({ ...prev, [field]: value, id }));
    };

    // Save changes
    const handleSave = async () => {
        if (!rowData.id) return;
        try {
            await axios.put(`http://localhost:5000/api/opd/${rowData.id}`, rowData);
            setRows((prev) =>
                prev.map((row) => (row.id === rowData.id ? { ...row, ...rowData } : row))
            );
            setEditRowId(null);
            setRowData({});
        } catch (error) {
            console.error("Error saving row:", error);
        }
    };

    const columns: GridColDef[] = [
       // { field: "id", headerName: "ID", width: 60 },
        {
            field: "name",
            headerName: "Name",
            width: 150,
            renderCell: (params) =>
                editRowId === params.row.id ? (
                    <input
                        value={rowData.name ?? params.row.name}
                        onChange={(e) => handleEditChange(params.row.id, "name", e.target.value)}
                        style={{ width: "100%" }}
                    />
                ) : (
                    params.value
                ),
        },
        {
            field: "age",
            headerName: "Age",
            width: 90,
            renderCell: (params) =>
                editRowId === params.row.id ? (
                    <input
                        type="number"
                        value={rowData.age ?? params.row.age}
                        onChange={(e) => handleEditChange(params.row.id, "age", e.target.value)}
                        style={{ width: "100%" }}
                    />
                ) : (
                    params.value
                ),
        },
        {
            field: "gender",
            headerName: "Gender",
            width: 120,
            renderCell: (params) =>
                editRowId === params.row.id ? (
                    <select
                        value={rowData.gender ?? params.row.gender}
                        onChange={(e) => handleEditChange(params.row.id, "gender", e.target.value)}
                        style={{ width: "100%" }}
                    >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                ) : (
                    params.value
                ),
        },
        { field: "symptoms",
             headerName: "Symptoms",
              width: 300,
            renderCell: (params) =>
                editRowId === params.row.id ? (
                    <input
                        value={rowData.symptoms ?? params.row.symptoms}
                        onChange={(e) => handleEditChange(params.row.id, "symptoms", e.target.value)}
                        style={{ width: "100%" }}
                    />
                ) : (
                    params.value
                ),
            
         },
        { field: "contact", headerName: "Contact", width: 150 },
        { field: "email", headerName: "Email", width: 180 },

        { field: "findings", headerName: "Findings", width: 200 },
        { field: "appointment_date", headerName: "Appointment Date", width: 150 },

        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) =>
                editRowId === params.row.id ? (
                    <>
                        <IconButton onClick={handleSave} color="success">
                            <Save />
                        </IconButton>
                        <IconButton onClick={() => setEditRowId(null)} color="error">
                            <Close />
                        </IconButton>
                    </>
                ) : (
                    <IconButton
                        onClick={() => {
                            setEditRowId(params.row.id);
                            setRowData(params.row); // preload data
                        }}
                        color="primary"
                    >
                        <Edit />
                    </IconButton>
                ),
        },
    ];

    return (
        <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5, page: 0 } },
                }}
                pagination
                paginationMode="client"
                disableRowSelectionOnClick

            />
        </Box>
    );
};

export default PatientGrid;
