const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

//ONLY ADMIN CAN ACCESS THIS ROUTE

router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

//ONLY ADMIN AND MANAGER CAN ACCESS THIS ROUTE
router.get(
  "/manager",
  verifyToken,
  authorizeRoles("admin", "manager"),
  (req, res) => {
    res.json({ message: "Welcome Manager" });
  },
);

//ALL CAN ACCESS THIS ROUTE
router.get(
  "/user",
  verifyToken,
  authorizeRoles("admin", "manager", "user"),
  (req, res) => {
    res.json({ message: "Welcome  Users" });
  },
);

module.exports = router;
