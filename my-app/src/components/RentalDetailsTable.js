import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const headers = {
  "name": "Name",
  "category": "Category",
  "availability": "Available",
  "brand": "Brand",
  "model": "Model",
  "modelYear": "Model Year",
  "mileage": "Mileage (KM)",
  "fuelType": "Fuel Type",
  "seats": "Number of Seats",
  "pricePerDay": "Price Per Day ($)",
  "description": "Description"
}

export default function CustomizedTables({ rentalCar }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {Object.values(headers).map(header => <StyledTableCell key={header} align="center">{header}</StyledTableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            {Object.keys(headers).map(key => <StyledTableCell key={key} align="center">{rentalCar[key]}</StyledTableCell>)}
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}