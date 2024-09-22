import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

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

authSchema.pre('save', async function(next) {

    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);

})

authSchema.methods.isValiddatedPassword() = async function(sentPassword) {

    return await bcrypt.compare(sentPassword, this.password);

}

authSchema.methods.getForgetPasswordToken = function() {

    const token = crypto.randomBytes(20).toString('hex');

    this.forgotPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

    return token;
}

authSchema.methods.getEmailVerificationToken = function() {

    const token = crypto.randomBytes(20).toString('hex');

    this.emailVerificationToken = crypto.createHash('sha256').update(token).digest('hex');

    return token;

}

module.exports = mongoose.model('Auth', authSchema)