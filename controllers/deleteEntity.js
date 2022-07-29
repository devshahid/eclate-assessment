const fs = require("fs");
const path = require("path");

const deleteEntity = async (req, res) => {
  const dir = path.join(__dirname, "../uploads", req.params.entity_name);
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    res.json({ message: "directory deleted" });
  } else {
    res.json({ message: "directory not found" });
  }
};

module.exports = deleteEntity;
