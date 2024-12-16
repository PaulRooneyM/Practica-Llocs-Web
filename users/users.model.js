import { Schema, model} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'], 
        unique: true, 
    },
    password: {
        type: String,
        required: [true, 'Password is required'], 
    },
    balance: {
        type: Number,
        default: 20, 
    },
    bitcoinAmount: {
        type: Number,
        default: 0, 
    },
    ethereumAmount: {
        type: Number,
        default: 0,
    },
    litecoinAmount: {
        type: Number,
        default: 0, 
    }
}, {
    timestamps: true
});

export const userModel = model('User', userSchema);
