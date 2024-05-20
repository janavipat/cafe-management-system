"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Typography,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";

const User = () => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUsers(storedToken, page);
    }
  }, [page]);

  const fetchUsers = async (token, page) => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/user/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
          limit: 8,
        },
      });
      setUsers(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      setError("Error fetching users");
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/user/users/${userId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
    fetchUsers(token, page);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid
        item
        xs={12}
        md={10}
        sx={{ marginLeft: "40px", width: "1200px", marginTop: "70px" }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.status ? "Approved" : "Rejected"}</TableCell>
                  <TableCell>
                    <Select
                      value={user.status}
                      onChange={(e) =>
                        handleStatusChange(user.id, e.target.value)
                      }
                    >
                      <MenuItem value={true}>Approve</MenuItem>
                      <MenuItem value={false}>Reject</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPage((page) => Math.max(page - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Typography variant="body1" style={{ margin: "0 20px" }}>
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPage((page) => Math.min(page + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default User;
