const express = require("express");
const Project = require("../model/Project");
const User = require("../model/User");

const router = express.Router();

// Get all projects assigned to a user
router.get("/user/:userId", async (req, res) => {
  try {
    const projects = await Project.find({ assignedTo: req.params.userId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign a project to a user
router.post("/assign", async (req, res) => {
  const { userId, title, description } = req.body;
  try {
    const project = new Project({ title, description, assignedTo: userId });
    await project.save();

    // Add project to user's assignedProjects
    await User.findByIdAndUpdate(userId, {
      $push: { assignedProjects: project._id },
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/assigned/:userId", async (req, res) => {
  try {
    const projects = await Project.find({ assignedTo: req.params.userId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/accept/:projectId", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      { status: "Accepted" },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update-status/:projectId", async (req, res) => {
  const { status } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      { status },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update project progress and calculate score
router.put("/update/:projectId", async (req, res) => {
  const { status, score } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      { status, score },
      { new: true }
    );

    // Update user's score
    if (project.assignedTo && status === "Completed") {
      await User.findByIdAndUpdate(project.assignedTo, {
        $inc: { score: score },
      });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get a project by its ID
// Route to get a project by its ID
router.get("/:id", async (req, res) => {
  const id = req.params.id; // Get the project ID from the request params
  console.log("Project ID: ", id);

  try {
    // Find the project by its ID
    const projectData = await Project.findById(id);
    // const projectData = await Project.findOne({ _id: ObjectId(`${id}`) })

    if (!projectData) {
      return res.status(404).json({ message: "Project not found" }); // If no project is found
    }

    // Return the project data
    return res.json(projectData);
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ message: "Server error" }); // In case of server error
  }
});

module.exports = router;
