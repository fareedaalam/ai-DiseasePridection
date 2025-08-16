import { Box, Typography, Button, Paper, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

import SearchIcon from "@mui/icons-material/Search";

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(to right, #1976d2, #42a5f5)",
          color: "#fff",
          py: 8,
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Welcome to My HealthCare
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
          Book doctor appointments, consult online & manage your health easily
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          <TextField
            variant="outlined"
            placeholder="Search for doctors, clinics..."
            sx={{ background: "#fff", borderRadius: 1 }}
          />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SearchIcon />}
            sx={{ borderRadius: 1 }}
          >
            Search
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, px: 4 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                Book Appointments
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Find the best doctors and book appointments instantly.
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                Online Consultations
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Get expert medical advice from the comfort of your home.
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                Health Records
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Store and access your medical history anytime, anywhere.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
