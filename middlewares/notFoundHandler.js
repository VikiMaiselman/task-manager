export const notFoundHandler = (req, res) => {
  res.status(404).json({ msg: "The page was not found" });
};
