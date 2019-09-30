// @flow
import * as React from 'react'
import TableCell from '@material-ui/core/TableCell'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import withStyles from '@material-ui/core/styles/withStyles'

type Props = {
  classes: Object,
  name: String,
  items: Array,
  value: Object,
  onChange: Function
}

const styles = () => ({
  root: {
    paddingLight: 8,
    paddingRight: 8
  }
})
const TableCellSelect = ({ classes, name, items, value, onChange }: Props) => console.log(name, items, value) ||
  <TableCell className={classes.root}>
    <FormControl margin='dense' fullWidth>
      <Select
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          }
        }}
        value={value}
        onChange={onChange}
        inputProps={{ name, id: name }}>
        {items &&
          items.map(
            (item, i) => <MenuItem key={i} value={item}>{item.name}</MenuItem>
          )
        }
      </Select>
    </FormControl>
  </TableCell>

export default withStyles(styles)(TableCellSelect)
