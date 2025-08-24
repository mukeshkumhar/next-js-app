import mongoose, {Schema, model, models} from "mongoose";
import bcrypt from "bcryptjs";


export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {
    timestamps: true,
});

userSchema.pre("save", async function (next) { 
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
    
});

export const User = models.User || model<IUser>("User", userSchema);