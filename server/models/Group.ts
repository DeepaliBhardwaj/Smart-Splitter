import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Trip', 'Home', 'Couple', 'Other'], default: 'Other' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    currency: { type: String, default: '$' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Group = mongoose.model('Group', groupSchema);
