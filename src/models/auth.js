import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 50,
            select: false
        },
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        adminNo: {
            type: String,
            required: true
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        photo: {
            type: String,
            default: ''
        },
        emailVerificationToken: {
            type: String
        },
        forgotPasswordToken: {
            type: String
        },
        forgotPasswordExpiry: {
            type: Date
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Auth', authSchema)