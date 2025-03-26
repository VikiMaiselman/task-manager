export const notFoundHandler = (req, res) => {
  return res.status(404).json({ msg: "The page was not found" });
};
