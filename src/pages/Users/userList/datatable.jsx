import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles/index";
import Table from "@material-ui/core/Table/index";
import TableBody from "@material-ui/core/TableBody/index";
import TableCell from "@material-ui/core/TableCell/index";
import TableHead from "@material-ui/core/TableHead/index";
import TablePagination from "@material-ui/core/TablePagination/index";
import TableRow from "@material-ui/core/TableRow/index";
import TableSortLabel from "@material-ui/core/TableSortLabel/index";
import Toolbar from "@material-ui/core/Toolbar/index";
import Typography from "@material-ui/core/Typography/index";
import Paper from "@material-ui/core/Paper/index";
import Checkbox from "@material-ui/core/Checkbox/index";
import IconButton from "@material-ui/core/IconButton/index";
import Tooltip from "@material-ui/core/Tooltip/index";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import LockIcon from "@material-ui/icons/Lock";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import PlusIcon from "@material-ui/icons/Add";
import StatusButton from "../../../_helpers/StatusButton";
// import DownloadIcon from "@material-ui/icons/CloudDownloadOutlined";

import CircularProgress from "@material-ui/core/CircularProgress/index";

const headRows = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "First name",
  },
  { id: "lastName", numeric: false, disablePadding: true, label: "Last name" },
  { id: "email", numeric: false, disablePadding: true, label: "Email" },
  // {
  //   id: "lastLoginDate",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "Last Login Datetime",
  // },
  // {
  //   id: "lastUpdatedDate",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "Last Updated Date",
  // },
  { id: "phone", numeric: false, disablePadding: true, label: "Phone number" },
  { id: "status", numeric: false, disablePadding: true, label: "Status" },
  { id: "tools", numeric: false, disablePadding: true, label: "Tools" },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "Select all desserts" }}
          />
        </TableCell>
        {headRows.map((row) => (
          <TableCell
            key={row.id}
            align={row.numeric ? "right" : "left"}
            padding={row.disablePadding ? "none" : "default"}
            sortDirection={orderBy === row.id ? false : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order ? "asc" : "desc"}
              onClick={() => {
                return row.id !== "tools" ? onRequestSort(row.id) : null;
              }}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.bool.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: theme.palette.text.secondary,
    display: "flex",
  },
  title: {
    flex: "0 0 auto",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, setOpenCreate, onDeleteUsers } = props;

  return (
    <Toolbar
      className={clsx(classes.root, classes.toolbar, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 && (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={onDeleteUsers}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        {/* <Tooltip title="Export" placement="top">
          <button
            aria-label="Add balance"
            className="flex-shrink-0 btn btn-sm btn-icon btn-bg-light btn-text-info btn-hover-info mr-2 h5 rounded-circle flex-shrink-0"
            onClick={onUsersExport}
          >
            <DownloadIcon />
          </button>
        </Tooltip> */}
      </div>
      <Tooltip title="Create" placement="top">
        <button
          className="flex-shrink-0 btn btn-sm btn-icon btn-bg-light btn-text-primary btn-hover-primary mr-2 h5 rounded-circle flex-shrink-0"
          onClick={() => setOpenCreate(true)}
        >
          <PlusIcon />
        </button>
      </Tooltip>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  toolbar: {
    minHeight: theme.spacing(2),
  },
  progresRoot: {
    width: "100%",
    padding: "32px 16px",
  },
  progress: {
    margin: "auto",
    display: "block",
    color: "#63C059",
  },
}));

export default function EnhancedTable(props) {
  const {
    setSortFiled,
    setOrderByTable,
    sortFiled,
    orderBy,
    setOpenEdit,
    setOpenView,
    setOpenRemove,
    setOpenCreate,
    setOpenChangePassword,
    isLoaded,
    error,
    rows,
    onUserChoose,
    updateSkip,
    updateTake,
    count,
    onUpdateUserStatus,
    setUserId,
    setDeleteUsersID,
    deleteUsersIds,
    onDeleteUsers,
    // onUsersExport,
  } = props;
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  function handleRequestSort(property) {
    const isDesc = sortFiled === property && !orderBy;

    setOrderByTable(isDesc);
    setSortFiled(property);
    updateTake(10);
    setRowsPerPage(10);
    updateSkip(0);
    setPage(0);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);

      setDeleteUsersID(newSelecteds);
      return;
    }

    setDeleteUsersID([]);
  }

  function handleClick(event, id) {
    const selectedIndex = deleteUsersIds.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(deleteUsersIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(deleteUsersIds.slice(1));
    } else if (selectedIndex === deleteUsersIds.length - 1) {
      newSelected = newSelected.concat(deleteUsersIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        deleteUsersIds.slice(0, selectedIndex),
        deleteUsersIds.slice(selectedIndex + 1)
      );
    }

    setDeleteUsersID(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
    updateSkip(newPage * rowsPerPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    updateTake(+event.target.value);
    setPage(0);
    updateSkip(0);
  }

  const isSelected = (id) => deleteUsersIds.indexOf(id) !== -1;

  return (
    <div className="col-12">
      <div className={classes.root}>
        <Paper className={classes.paper}>
          {isLoaded && !rows.length && (
            <div className={classes.progresRoot}>
              <CircularProgress className={classes.progress} />
            </div>
          )}

          <EnhancedTableToolbar
            numSelected={deleteUsersIds.length}
            setOpenCreate={setOpenCreate}
            onDeleteUsers={onDeleteUsers}
            // onUsersExport={onUsersExport}
          />
          <div className={classes.tableWrapper}>
            {rows.length ? (
              <Table className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  numSelected={deleteUsersIds.length}
                  order={orderBy}
                  orderBy={sortFiled}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {rows.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                            onChange={(event) => handleClick(event, row.id)}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          className="pr-4"
                        >
                          {row.firstName}
                        </TableCell>
                        <TableCell padding="none" className="pr-4">
                          {row.lastName}
                        </TableCell>
                        <TableCell padding="none" className="pr-4">
                          {row.email}
                        </TableCell>
                        <TableCell padding="none" className="pr-4">
                          {row.phone}
                        </TableCell>
                        <TableCell padding="none" className="pr-4">
                          <StatusButton
                            id={row.id}
                            isActive={row.isActive}
                            onUpdateUserStatus={onUpdateUserStatus}
                          />
                        </TableCell>
                        <TableCell padding="none" className="pr-4">
                          <Tooltip title="View" placement="top">
                            <button
                              aria-label="view"
                              className="btn btn-sm btn-icon btn-bg-light btn-text-info btn-hover-info mr-2"
                              onClick={(e) => {
                                setOpenView(e);
                                onUserChoose(row.id);
                              }}
                            >
                              <EyeIcon />
                            </button>
                          </Tooltip>
                          <Tooltip title="Edit" placement="top">
                            <button
                              aria-label="edit"
                              className="btn btn-sm btn-icon btn-bg-light btn-text-dark btn-hover-dark mr-2"
                              onClick={() => {
                                setOpenEdit(true);
                                onUserChoose(row.id);
                              }}
                            >
                              <EditIcon />
                            </button>
                          </Tooltip>
                          <Tooltip title="Change password" placement="top">
                            <button
                              aria-label="changePassword"
                              className="btn btn-sm btn-icon btn-bg-light btn-text-warning btn-hover-warning mr-2"
                              onClick={() => {
                                setOpenChangePassword(true);
                                setUserId(row.id);
                              }}
                            >
                              <LockIcon />
                            </button>
                          </Tooltip>
                          <Tooltip title="Delete" placement="top">
                            <button
                              aria-label="Delete"
                              className="btn btn-sm btn-icon btn-bg-light btn-text-danger btn-hover-danger"
                              onClick={() => {
                                setOpenRemove(true);
                                setUserId(row.id);
                              }}
                            >
                              <DeleteIcon />
                            </button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : !rows.length && !isLoaded && !error ? (
              // <AlertComponent variant="info" message="No information found" />
              <div className="noInfo">
                <img src="./media/error/search2.png" alt="information" />
                <h4>No information found</h4>
              </div>
            ) : (
              !isLoaded &&
              error && (
                // <AlertComponent
                //   variant="danger"
                //   message="We've lost the connection"
                // />
                <div className="noInfo">
                  <img
                    src="./media/error/connection.png"
                    className="info-img"
                    alt="connection"
                  />
                  <h4>We've lost the connection</h4>
                </div>
              )
            )}
          </div>
          {count > 10 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "Previous Page",
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page",
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </div>
    </div>
  );
}
