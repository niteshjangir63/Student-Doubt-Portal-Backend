const Doubt = require("../models/Doubt")

module.exports.createDoubt = async (req, res) => {

  console.log(process.env.JWT_SECRET)
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ message: "All fields required" });

    const doubt = await Doubt.create({
      title,
      description,
      studentId: req.user.userId,
      studentName: req.user.name,
      status: "pending"
    });

    res.status(201).json({ message: "Doubt created", doubt });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

}


module.exports.getDoubt = async (req, res) => {

  try {
    const userId = req.user.userId;
    const role = req.user.role;

    let doubts;

    if (role === "student") {

      doubts = await Doubt.find({ studentId: userId }).sort({ createdAt: -1 });
    } else if (role === "teacher") {

      doubts = await Doubt.find().sort({ createdAt: -1 });
    }

    res.json(doubts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }

}


module.exports.doubtById = async (req, res) => {

  try {
    const doubtId = req.params.id;
    console.log(doubtId)
    console.log(req.user.role)

    const doubt = await Doubt.findById(doubtId);
    if (!doubt) {
      return res.status(404).json({ message: "Doubt not found" });
    }

    // if (req.user.role === "student" && doubt.studentId !== req.user.userId) {
    //   console.log("Access Denied!")
    //   return res.status(403).json({ message: "Access denied" });
    // }

    res.json(doubt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}




module.exports.answerDoubt = async (req, res) => {

  try {
    const { answer } = req.body;
    const doubtId = req.params.id;
    console.log(doubtId)

    const doubt = await Doubt.findById(doubtId);
    if (!doubt) return res.status(404).json({ message: "Doubt not found" });

    doubt.answer = answer;
    doubt.status = "answered";

    await doubt.save();

    res.json({ message: "Doubt answered", doubt });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

}

module.exports.editDoubt = async (req, res) => {

  try {
    const { title, description } = req.body;
    console.log(req.body)
    if (!title || !description) {

      return res.status(400).json({ message: "All Fields are required!" });
    }
    const doubtId = req.params.id;

    const doubt = await Doubt.findById(doubtId);
    if (!doubt) return res.status(404).json({ message: "Doubt not found" });

    doubt.title = title;
    doubt.description = description;

    await doubt.save();

    res.json({ message: "Doubt Edited", doubt });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

}


module.exports.deleteDoubt = async (req, res) => {

  try {

    console.log(req.params)
    const doubtId = req.params.id;
    if(!doubtId) return res.status(404).json({message:"doubt not found"});
    const doubt = await Doubt.findByIdAndDelete(doubtId);

    res.json({ message: "Doubt Deleted", doubt });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

}