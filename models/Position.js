import mongoose from "mongoose";
const Schema = mongoose.Schema;

const positionSchema = new Schema( {

    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    }
})
const positionModel = mongoose.model('position', positionSchema);

export default positionModel;
