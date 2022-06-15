import {
  Alert,
  Button,
  IconButton,
  Paper,
  Rating,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Tab from "../../components/Tabs/tab";
import TabPanel from "@mui/lab/TabPanel";
import DeleteIcon from "@mui/icons-material/Delete";
import StarRateIcon from "@mui/icons-material/StarRate";
import { formatDistanceToNow } from "date-fns";
import CheckIcon from "@mui/icons-material/Check";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

function AssignmentTable(props) {
  const { events, setEvents, delEvent } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function filterImp(task, index) {
    return task.importance === index;
  }

  function filterDone(task) {
    return task.isComplete === true;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleTaskCompletionToggled(toToggleTask, toToggleTaskIndex) {
    const newTasks = [
      // Once again, this is the spread operator
      ...events.slice(0, toToggleTaskIndex),
      {
        title: toToggleTask.title,
        type: toToggleTask.type,
        importance: toToggleTask.importance,
        date: toToggleTask.date,
        isComplete: !toToggleTask.isComplete,
      },
      ...events.slice(toToggleTaskIndex + 1),
    ];
    // We set new tasks in such a complex way so that we maintain immutability
    // Read this article to find out more:
    // https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/

    setEvents(newTasks);
  }

  return (
    <Tab
      label1="All"
      label2="5"
      label3="4"
      label4="3"
      label5="2"
      label6="1"
      label7="Completed"
      label8="Overdue"
    >
      <TabPanel value="1">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Importance</TableCell>
                <TableCell align="left">Assignment Title</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Due</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events === undefined || events.length === 0 ? (
                <Typography>No Assignement</Typography>
              ) : (
                events
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography>
                          {row.importance}
                          <StarRateIcon fontSize="small"></StarRateIcon>
                        </Typography>
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">
                        <Typography component="p">
                          {new Date(row.date).toDateString()}
                        </Typography>
                        <Typography component="p">
                          {new Date(row.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography component="p">
                          {formatDistanceToNow(new Date(row.date), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Switch
                          size="small"
                          checked={row.isComplete}
                          onChange={() =>
                            handleTaskCompletionToggled(row, index)
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => delEvent(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  count={events.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="2">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">Due</TableCell>
                <TableCell align="right">Assignment Title</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events
                .filter((task) => filterImp(task, 5))
                .filter((task) => task.isComplete !== true)
                .map((row, index) => (
                  <>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        <Typography component="p">
                          {new Date(row.date).toDateString()}
                        </Typography>
                        <Typography component="p">
                          {new Date(row.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography component="p">
                          {formatDistanceToNow(new Date(row.date), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">
                        <Switch
                          size="small"
                          checked={row.isComplete}
                          onChange={() =>
                            handleTaskCompletionToggled(row, index)
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => delEvent(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="3">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">Due</TableCell>
                <TableCell align="right">Assignment Title</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events
                .filter((task) => filterImp(task, 4))
                .filter((task) => task.isComplete !== true)
                .map((row, index) => (
                  <>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        <Typography component="p">
                          {new Date(row.date).toDateString()}
                        </Typography>
                        <Typography component="p">
                          {new Date(row.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography component="p">
                          {formatDistanceToNow(new Date(row.date), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">
                        <Switch
                          size="small"
                          checked={row.isComplete}
                          onChange={() =>
                            handleTaskCompletionToggled(row, index)
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => delEvent(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="4">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">Due</TableCell>
                <TableCell align="right">Assignment Title</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events
                .filter((task) => filterImp(task, 3))
                .filter((task) => task.isComplete !== true)
                .map((row, index) => (
                  <>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        <Typography component="p">
                          {new Date(row.date).toDateString()}
                        </Typography>
                        <Typography component="p">
                          {new Date(row.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography component="p">
                          {formatDistanceToNow(new Date(row.date), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">
                        <Switch
                          size="small"
                          checked={row.isComplete}
                          onChange={() =>
                            handleTaskCompletionToggled(row, index)
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => delEvent(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="5">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">Due</TableCell>
                <TableCell align="right">Assignment Title</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events
                .filter((task) => filterImp(task, 2))
                .filter((task) => task.isComplete !== true)
                .map((row, index) => (
                  <>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        <Typography component="p">
                          {new Date(row.date).toDateString()}
                        </Typography>
                        <Typography component="p">
                          {new Date(row.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography component="p">
                          {formatDistanceToNow(new Date(row.date), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">
                        <Switch
                          size="small"
                          checked={row.isComplete}
                          onChange={() =>
                            handleTaskCompletionToggled(row, index)
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => delEvent(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="6">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">Due</TableCell>
                <TableCell align="right">Assignment Title</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events
                .filter((task) => filterImp(task, 1))
                .filter((task) => task.isComplete !== true)
                .map((row, index) => (
                  <>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        <Typography component="p">
                          {new Date(row.date).toDateString()}
                        </Typography>
                        <Typography component="p">
                          {new Date(row.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography component="p">
                          {formatDistanceToNow(new Date(row.date), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">
                        <Switch
                          size="small"
                          checked={row.isComplete}
                          onChange={() =>
                            handleTaskCompletionToggled(row, index)
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => delEvent(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="7">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">Due</TableCell>
                <TableCell align="right">Assignment Title</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.filter(filterDone).map((row, index) => (
                <>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">
                      <Typography component="p">
                        {new Date(row.date).toDateString()}
                      </Typography>
                      <Typography component="p">
                        {new Date(row.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">
                      <Switch
                        size="small"
                        checked={row.isComplete}
                        onChange={() => handleTaskCompletionToggled(row, index)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => delEvent(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Tab>
  );
}

export default AssignmentTable;