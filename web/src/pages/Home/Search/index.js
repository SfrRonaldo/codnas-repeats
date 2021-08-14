import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TextField } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import Virtualize from '../../../components/Virtualize'
import data from '../../../data/repeats.json'

const Search = () => {
  const history = useHistory()
  const repeats = data

  const onClickSearch = () => {
    validationSearch()
  }

  const onClickEstimate = () => {
    validationEstimate()
  }

  const [form, setForm] = useState({
    repeatId: '',
    lower: '',
    upper: '',
  })

  const { repeatId, lower, upper } = form

  const validationSearch = () => {
    if (repeatId.trim() === '') {
      setMsgError('Missing fill in repeat field')
      setOpen(true)
    } else {
      history.push(`/repeats/detail/${repeatId}`)
    }
  }

  const validationEstimate = () => {
    if (repeatId.trim() !== '') {
      if (upper.trim() === '' || lower.trim() === '') {
        setMsgError('Missing fill in lower or upper field')
        setOpen(true)
      } else if (upper.trim() === '' && lower.trim() === '') {
        setMsgError('Missing fill in lower or upper field')
        setOpen(true)
      } else {
        if (parseInt(lower, 10) < 1 || parseInt(upper, 10) < 1) {
          setMsgError('Range values must be greater than 0')
          setOpen(true)
          return
        }
        if (parseInt(lower, 10) >= parseInt(upper, 10)) {
          setMsgError('The value of lower field must be less than the value of upper field')
          setOpen(true)
        } else {
          const repeat = data.find((datum) => datum.pdb_id === repeatId)
          if (lower >= repeat.lower && upper <= repeat.upper) {
            history.push(`/repeats/estimate/${repeatId}_${lower}_${upper}`)
          } else {
            setMsgError(
              `The values of the lower and upper fields must be in the range ${repeat.lower} to ${repeat.upper}`
            )
            setOpen(true)
          }
        }
      }
    } else {
      setMsgError('Missing fill in repeat field')
      setOpen(true)
    }
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (repeatId.trim() === '' && upper.trim() === '' && lower.trim() === '') {
        setMsgError('FALTA RELLENAR')
        setOpen(true)
        return
      }
      if (upper.trim() === '' && lower.trim() === '') {
        validationSearch()
      } else {
        validationEstimate()
      }
    }
  }

  const [open, setOpen] = useState(false)
  const [msgError, setMsgError] = useState('')

  const handleClose = (_e, reason) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <Fragment>
      <div className="px-2 md:px-10 lg:px-24 2xl:px-32">
        <form className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-5">
          <Virtualize
            repeats={repeats}
            onKeyPress={onKeyPress}
            onChange={(event, newValue) => setForm({ ...form, repeatId: newValue })}
          />
          <TextField
            id="lower"
            name="lower"
            label="lower"
            variant="outlined"
            size="small"
            type="number"
            margin="dense"
            onKeyPress={onKeyPress}
            onChange={(event) => setForm({ ...form, [event.target.name]: event.target.value })}
          />
          <TextField
            id="upper"
            name="upper"
            label="upper"
            variant="outlined"
            size="small"
            type="number"
            margin="dense"
            onKeyPress={onKeyPress}
            onChange={(event) => setForm({ ...form, [event.target.name]: event.target.value })}
          />
        </form>
        {open && (
          <div className="mt-3 mb-4">
            <Alert onClose={handleClose} severity="error">
              {msgError}
            </Alert>
          </div>
        )}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5 mt-2">
          <div className="md:col-span-1">
            <button
              className="text-white font-medium text-xs md:text-sm bg-primary-dark rounded-md w-full py-2.5 hover:bg-primary-light focus:outline-none"
              type="submit"
              onClick={() => onClickSearch()}
            >
              Search
            </button>
          </div>
          <div className="md:col-span-2 outline-white">
            <button
              className="text-white font-medium text-xs md:text-sm bg-primary-dark rounded-md w-full py-2.5 hover:bg-primary-light focus:outline-none"
              type="submit"
              onClick={() => onClickEstimate()}
            >
              Estimate
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Search
