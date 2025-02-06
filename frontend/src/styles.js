import colors from "./colors";

const styles = {
  textfield: {
    style: { color: "white" },
    sx: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "orange",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "orange",
      },
    },
  },

  link_style: { textDecoration: "none", color: "darkorange" },

  box_style: {
    color: "grey",
    backgroundColor: colors.form_color,
    padding: "2rem",
    borderRadius: "20px",
    boxShadow: "0px 0px 10px",
    textAlign: "center",
    maxWidth: "50vh",
  },
};

export default styles;
