import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Divider,
  CircularProgress,
} from '@mui/material'

export const VimeoOTTCustomersPage = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({ status: 'enabled' })

  useEffect(() => {
    setLoading(true)
    let params = {
      per_page: 1000,
      status: filters.status,
    }

    axios({
      auth: {
        password: '',
        username: 'S8FRyUDeiz5329j5sSoWjYdY-C9_uGYT',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      params: params,
      url: 'https://api.vhx.tv/customers',
    }).then((r) => {
      setCustomers([...r.data._embedded.customers])
      setLoading(false)
    })
  }, [filters])

  const handleFilterChange = (filter, value) => {
    let newFilters = { ...filters }
    newFilters[filter] = value
    setLoading(true)
    setFilters(newFilters)
    setCustomers([])
  }

  const buildCsvRow = (customer) => {
    let firstName, lastName, email, fullName

    email = customer.email
    fullName = customer.name.split(' ')
    firstName = fullName[0]

    if (fullName.length === 2) {
      lastName = fullName[1]
    } else {
      lastName = ''
    }

    return `${email},${firstName},${lastName}\n`
  }

  const downloadCsv = () => {
    const url = window.URL.createObjectURL(
      new Blob(
        [
          'Email Address,First Name,Last Name\n',
          ...customers.map((customer) => buildCsvRow(customer)),
        ],
        { type: 'text/csv;charset=utf-8;' },
      ),
    )
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'vimeo-customers.csv')

    // Append to html link element page
    document.body.appendChild(link)

    // Start download
    link.click()

    // Clean up and remove the link
    link.parentNode.removeChild(link)
  }

  return (
    <Grid container spacing={3}>
      <Grid item lg={12}>
        {loading ? (
          <Grid container spacing={1}>
            <Grid item>
              <Typography variant='h5'>Count:</Typography>
            </Grid>
            <Grid item sx={{ mt: 0.4 }}>
              <CircularProgress size='1.7rem' />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={1}>
            <Grid item>
              <Typography variant='h5'>Count:</Typography>
            </Grid>
            <Grid item>
              <Typography variant='h5'>{customers.length}</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item lg={6}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id='status-filter-label'>Status</InputLabel>
          <Select
            id='status-filter-label'
            label='Status'
            labelId='status-filter-label'
            onChange={(e) => handleFilterChange('status', e.target.value)}
            value={filters.status}
          >
            <MenuItem value={'all'}>All</MenuItem>
            <MenuItem value={'enabled'}>Enabled</MenuItem>
            <MenuItem value={'disabled'}>Disabled</MenuItem>
            <MenuItem value={'refunded'}>Refunded</MenuItem>
            <MenuItem value={'expired'}>Expired</MenuItem>
            <MenuItem value={'paused'}>Paused</MenuItem>
            <MenuItem value={'cancelled'}>Cancelled</MenuItem>
          </Select>
          <FormHelperText>Filter list by Status</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item lg={6}>
        <Button onClick={() => downloadCsv()} variant='contained'>
          Download CSV
        </Button>
      </Grid>
      <Grid item lg={6}>
        <Typography variant='h5'>Full Name</Typography>
      </Grid>
      <Grid item lg={6}>
        <Typography variant='h5'>Email</Typography>
      </Grid>
      <Grid item lg={12}>
        <Divider />
      </Grid>
      {loading ? (
        <Grid item lg={12}>
          <div
            style={{
              left: '55%',
              position: 'absolute',
              top: '52%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CircularProgress />
          </div>
        </Grid>
      ) : (
        <></>
      )}
      {customers.map((v, index) => {
        return (
          <React.Fragment key={`${index}-customer-list-${v.email}`}>
            <Grid item lg={6}>
              <Typography>{v.name}</Typography>
            </Grid>
            <Grid item lg={6}>
              <Typography>{v.email}</Typography>
            </Grid>
          </React.Fragment>
        )
      })}
    </Grid>
  )
}
