import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import GroupComponent from "../GroupComponent";
import Pagination from "@material-ui/lab/Pagination";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pagination: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  resultsPerPage: {
    padding: "2px 4px",
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
  },
}));

export function SearchResults(props) {
  const { search } = props;
  const classes = useStyles();
  const groupsToShow = search.results;

  const pages = Math.max(
    1,
    Math.ceil(groupsToShow.length / search.groupsOnPage)
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl className={classes.resultsPerPage}>
            <InputLabel>Results per page</InputLabel>
            <Select
              value={search.groupsOnPage}
              onChange={(event) => {
                search.setGroupsOnPage(event.target.value);
                search.setPage(1);
              }}
            >
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <Grid
            container
            item
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <FormControl>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={search.sortBy}
                onChange={(event) => {
                  search.setSortBy(event.target.value);
                }}
              >
                <MenuItem value="timestamp">Creation date</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="participants">Number of participants</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              onClick={() => {
                search.setAscending((ascending) => !ascending);
              }}
            >
              {search.ascending ? <ArrowUpward /> : <ArrowDownward />}
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      <center>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          {props.search.searchValue ? "SEARCH RESULTS" : props.title}
        </Typography>
        {groupsToShow.length > 0 ? (
          <>
            <Grid container spacing={2} justifyContent="center">
              {groupsToShow.map((group) => {
                return (
                  <Grid item key={group._id}>
                    <GroupComponent group={group} />
                  </Grid>
                );
              })}
            </Grid>
            <div className={classes.pagination}>
              <Pagination
                count={pages}
                shape="rounded"
                page={search.page}
                onChange={(_, p) => search.setPage(p)}
              />
            </div>
          </>
        ) : (
          <div>
            <center>
              <Typography>No groups found</Typography>
            </center>
          </div>
        )}
      </center>
    </>
  );
}
