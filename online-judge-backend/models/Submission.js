import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  userId: String,
  problemId: Number,
  language: String,
  code: String,
  verdict: String,
  results: Array,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Submission", submissionSchema);
