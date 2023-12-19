import { useEffect, useState } from "react";
//import { bookGenres } from "../genres";
import useAxios from "../services/useAxios";

import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField,
} from "@mui/material";

function Books() {
  const URL = "http://localhost:3000";
  const { data, loading, get } = useAxios(URL);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data.length === 0) {
      getBooks();
    }
  }, []);

  async function getBooks() {
    get("books");
  }

  //const filterByTagSet = new Set(bookGenres);

  const handleChange = (e) => {
    const searchString = e.target.value.toLowerCase();
    setSearch(searchString);
  };

  // TODO: Implement search functionality
  return (
    <Box
      sx={{
        mx: "auto",
        p: 2,
      }}
    >
      {loading && <CircularProgress />}
      {!loading && (
        <div className="bigdiv">
          <div className="littlediv">
            <TextField
              className="bar"
              id="outlined-basic"
              label="Search"
              variant="outlined"
              onChange={handleChange}
            />
          </div>
          <Stack
            sx={{ justifyContent: "space-around" }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {data
              ?.filter(
                (item) =>
                  item.author.toLowerCase().includes(search) ||
                  item.name.toLowerCase().includes(search)
              )
              .map((book) => (
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "15%",
                    minWidth: 200,
                  }}
                  key={book.name}
                >
                  <CardMedia
                    sx={{ height: 250 }}
                    image={book.img}
                    title={book.name}
                  />
                  <Box sx={{ pt: 2, pl: 2 }}>
                    {book.genres.map((genre, i) => (
                      <Chip
                        key={i}
                        label={genre}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                    <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                      {book.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {book.author}
                    </Typography>
                  </Box>
                  <CardActions
                    sx={{
                      justifyContent: "space-between",
                      mt: "auto",
                      pl: 2,
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={book.stars}
                      readOnly
                      size="small"
                    />
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;
