import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    splitType: { type: String, enum: ['EQUAL', 'PERCENTAGE', 'EXACT'], default: 'EQUAL' },
    category: { type: String, default: 'Other' },
    date: { type: Date, default: Date.now },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users involved in the split
}, { timestamps: true });

export const Expense = mongoose.model('Expense', expenseSchema);
