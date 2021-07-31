import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import ListSubheader from '@material-ui/core/ListSubheader'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Listbox from '../Listbox'

const useStyles = makeStyles({
  listbox: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
})

const renderGroup = (params) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
]

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.pdb_id,
})

const Virtualize = ({ repeats, onChange, onKeyPress }) => {
  const classes = useStyles()

  return (
    <Autocomplete
      id="virtualize"
      size="small"
      classes={classes}
      ListboxComponent={Listbox}
      renderGroup={renderGroup}
      onInputChange={onChange}
      onKeyPress={onKeyPress}
      options={repeats}
      getOptionLabel={(option) => option.pdb_id}
      filterOptions={filterOptions}
      filterSelectedOptions
      renderInput={(params) => <TextField {...params} variant="outlined" label="repeat" margin="dense" />}
      renderOption={(option) => <Typography noWrap>{option.pdb_id}</Typography>}
    />
  )
}

Virtualize.propTypes = {
  repeats: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
}

export default Virtualize
