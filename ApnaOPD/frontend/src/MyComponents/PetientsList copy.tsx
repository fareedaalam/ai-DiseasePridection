import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Typography, TextField } from "@mui/material";
import apiClient from "../apiClient";
import type { Patient } from "../models/patient";

export default function PatientsList() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState("");

    const columns: GridColDef<Patient>[] = [
        { field: "appointment_date", headerName: "Appointment Date", minWidth: 130, flex: 1 },
        { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
        { field: "age", headerName: "Age", minWidth: 50, flex: 0.5 },
        { field: "symptoms", headerName: "Symptoms", minWidth: 350, flex: 1 },
        { field: "gender", headerName: "Gender", minWidth: 80, flex: 0.7 },
        { field: "contact", headerName: "Contact", minWidth: 120, flex: 1 },
        { field: "email", headerName: "Email", minWidth: 180, flex: 1.2 },
        { field: "findings", headerName: "Findings", minWidth: 150, flex: 1 }

    ];

    useEffect(() => {
        apiClient
            .get("/api/opd")
            .then((res) => setPatients(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    // Filter rows based on input
    const filteredRows = patients.filter(
        (p) =>
            p.name.toLowerCase().includes(filterText.toLowerCase()) ||
            p.contact?.toLowerCase().includes(filterText.toLowerCase()) ||
            p.email?.toLowerCase().includes(filterText.toLowerCase())
    );

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0,
    });

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                padding: 2,
                boxSizing: "border-box",
                background: "linear-gradient(to right, #F6F9FD, #42a5f5)",
            }}
        >
            <Typography
                variant="h5"
                sx={{ color: "#fff", mb: 2, textAlign: "center", fontWeight: "bold" }}
            >
                Patients List
            </Typography>

            {/* Filter input */}
            <TextField
                placeholder="Search by Name, Contact, or Email"
                variant="outlined"
                size="small"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                sx={{ mb: 2, backgroundColor: "#F6F9FD", borderRadius: 1 }}
                fullWidth
            />

            {/* DataGrid wrapper */}
            <Box sx={{ width: "100%", overflowX: "auto", bgcolor: "#e09797ff", borderRadius: 1 }}>
                <Box sx={{ minWidth: 900 }}>
                    <DataGrid
                        rows={filteredRows}
                        columns={columns}
                        pageSizeOptions={[5, 10, 20]}
                        paginationModel={paginationModel}
                        onPaginationModelChange={(model) => setPaginationModel(model)}
                        pagination
                        paginationMode="client"
                        loading={loading}
                        disableRowSelectionOnClick
                        sx={{
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#1976d2",
                                color: "#212121",
                                fontWeight: "bold",
                                fontSize: "1.1rem",
                                textAlign: "left",
                                lineHeight: 1.2,
                            },
                            "& .MuiDataGrid-cell": {
                                textAlign: "left",
                                lineHeight: 1.2,
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
