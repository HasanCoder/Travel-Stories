import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { Stack } from "@mui/material";

const labels = {
  1: "Terrible",
  2: "Poor",
  3: "Average",
  4: "Good",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function ReviewRating() {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 400,
        height: 50,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Stack spacing={2}>
        <Rating
          name="hover-feedback"
          value={value}
          precision={1}
          size="large"
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
            console.log(value);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          icon={<StarIcon fontSize="large" />}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="large" />}
        />
      </Stack>
      {value !== null && (
        <Box sx={{ ml: 2 }} className="text-lg">
          {labels[hover !== -1 ? hover : value]}
        </Box>
      )}
    </Box>
  );
}
