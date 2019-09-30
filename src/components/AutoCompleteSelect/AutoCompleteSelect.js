/* eslint-disable react/prop-types, react/jsx-handler-names */
import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'
import withStyles from '@material-ui/core/styles/withStyles'
import { emphasize } from '@material-ui/core/styles/colorManipulator'

const styles = theme => ({
  menu: {
    maxHeight: 300,
    overflowY: 'auto',
    paddingBottom: 4,
    paddingTop: 4,
    position: 'relative',
    boxSizing: 'border-box',
    background: theme.palette.background.paper
  },
  input: {
    display: 'flex',
    padding: 0
  },
  valueContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center'
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    fontSize: 16,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16
  }
})

const NoOptionsMessage = ({ selectProps, innerProps, children }) =>
  <Typography
    color="textSecondary"
    className={selectProps.classes.noOptionsMessage}
    {...innerProps}
  >
    {children}
  </Typography>

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />

const Control = ({ selectProps, innerRef, children, innerProps }) =>
  <TextField
    fullWidth
    InputProps={{
      inputComponent,
      inputProps: {
        className: selectProps.classes.input,
        ref: innerRef,
        children: children,
        ...innerProps
      }
    }}
  />

const MenuList = (props) =>
  <div
    className={props.selectProps.classes.menu}
  >
    {props.children}
  </div>

const Option = ({ innerRef, isFocused, isSelected, innerProps, children }) =>
  <MenuItem
    buttonRef={innerRef}
    selected={isFocused}
    component="div"
    style={{
      background: 'none',
      fontWeight: isSelected ? 500 : 400
    }}
    {...innerProps}
  >
    {children}
  </MenuItem>

const Placeholder = ({ selectProps, innerProps, children }) =>
  <Typography
    color="textSecondary"
    className={selectProps.classes.placeholder}
    {...innerProps}
  >
    {children}
  </Typography>

const SingleValue = ({ selectProps, innerProps, children }) =>
  <Typography className={selectProps.classes.singleValue} {...innerProps}>
    {children}
  </Typography>

const ValueContainer = ({ selectProps, children }) => <div className={selectProps.classes.valueContainer}>{children}</div>

const MultiValue = ({ children, selectProps, isFocused, removeProps }) => {
  return (
    <Chip
      tabIndex={-1}
      label={children}
      className={classNames(selectProps.classes.chip, {
        [selectProps.classes.chipFocused]: isFocused
      })}
      onDelete={event => {
        removeProps.onClick()
        removeProps.onMouseDown(event)
      }}
    />
  )
}

const components = {
  MenuList,
  Option,
  Control,
  NoOptionsMessage,
  Placeholder,
  SingleValue,
  MultiValue,
  ValueContainer
}

const AutoCompleteSelect = ({ classes, options, value, onChange, placeholder }) =>
  <Select
    classes={classes}
    options={options}
    components={components}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    isMulti
  />

AutoCompleteSelect.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(AutoCompleteSelect)
