import mongoose from 'mongoose';
import { cartsModel } from './carts.js';

const collection = 'users';

const strTypeSchemeUnique = {
    type: String,
    unique: true,
}
const strTypeSchemaNonUniqueRequired = {
    type: String,
    required: false
};
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: strTypeSchemeUnique,
    age: Number,
    password: String, //Hashear
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: cartsModel
    },
    role: {
        type: String,
        default: 'user'
    },
    loggedBy: String,
    resetPasswordLink: {
        type: Object,
        default: ''
    },
    documents: [{
        name: {
            type: String        },
        reference: {
            type: String
        }
    }],
    last_connection: {
        type: Date
    }
})


const userModel = mongoose.model(collection, userSchema);
export default userModel;