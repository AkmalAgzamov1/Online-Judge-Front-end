import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    passwordHash: { type: String, required: true },

    university: { type: String, default: "" },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },

    solvedProblems: { type: [Number], default: [] },

    // новое основное поле
    xp: { type: Number, default: 0 },

    // старое legacy-поле – нужно, чтобы корректно поднять старые аккаунты
    exp: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Хелпер: реальный XP (учитывает старое exp)
userSchema.methods.getEffectiveXp = function () {
  const xp = typeof this.xp === "number" ? this.xp : 0;
  const legacyExp = typeof this.exp === "number" ? this.exp : 0;
  return xp || legacyExp || 0;
};



export default mongoose.model("User", userSchema);
