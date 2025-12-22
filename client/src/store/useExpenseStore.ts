import { create } from 'zustand';
import axios from 'axios';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
}

export interface Expense {
  id: string;
  _id?: string;
  groupId: string;
  title: string;
  amount: number;
  paidBy: string; // userId
  splitType: 'EQUAL' | 'PERCENTAGE' | 'EXACT';
  category: 'Food' | 'Travel' | 'Rent' | 'Shopping' | 'Entertainment' | 'Utilities' | 'Other';
  date: string;
  participants: string[]; // userIds
}

export interface Group {
  id: string;
  _id?: string;
  name: string;
  type: 'Trip' | 'Home' | 'Couple' | 'Other';
  members: User[];
  currency: string;
}

interface ExpenseState {
  groups: Group[];
  expenses: Expense[];
  activeGroupId: string | null;
  isLoading: boolean;
  setActiveGroup: (id: string | null) => void;
  fetchGroups: () => Promise<void>;
  fetchExpenses: () => Promise<void>;
  createGroup: (group: Omit<Group, 'id' | '_id' | 'members'> & { members: string[] }) => Promise<void>;
  addExpense: (expense: Omit<Expense, 'id' | '_id' | 'date'>) => Promise<void>;
  settleUp: (groupId: string, fromUser: string, toUser: string, amount: number) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  groups: [],
  expenses: [],
  activeGroupId: null,
  isLoading: false,
  setActiveGroup: (id) => set({ activeGroupId: id }),
  fetchGroups: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get('/api/groups');
      const groups = res.data.map((g: any) => ({ ...g, id: g._id }));
      set({ groups, isLoading: false });
    } catch (error) {
      console.error('Error fetching groups:', error);
      set({ isLoading: false });
    }
  },
  fetchExpenses: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get('/api/expenses');
      const expenses = res.data.map((e: any) => ({ ...e, id: e._id }));
      set({ expenses, isLoading: false });
    } catch (error) {
      console.error('Error fetching expenses:', error);
      set({ isLoading: false });
    }
  },
  createGroup: async (groupData) => {
    set({ isLoading: true });
    try {
      const res = await axios.post('/api/groups', groupData);
      const newGroup = { ...res.data, id: res.data._id };
      set((state) => ({ groups: [...state.groups, newGroup], isLoading: false }));
    } catch (error) {
      console.error('Error creating group:', error);
      set({ isLoading: false });
      throw error;
    }
  },
  addExpense: async (expenseData) => {
    set({ isLoading: true });
    try {
      const res = await axios.post('/api/expenses', expenseData);
      const newExpense = { ...res.data, id: res.data._id };
      set((state) => ({ expenses: [...state.expenses, newExpense], isLoading: false }));
    } catch (error) {
      console.error('Error adding expense:', error);
      set({ isLoading: false });
      throw error;
    }
  },
  settleUp: async (groupId, fromUser, toUser, amount) => {
    // Implement settlement logic (create expense or specific endpoint)
    // For now, creating a settlement expense
    try {
      await get().addExpense({
        groupId,
        title: 'Settlement',
        amount,
        paidBy: fromUser,
        splitType: 'EXACT',
        category: 'Other',
        participants: [toUser]
      });
    } catch (error) {
      console.error('Error settling up:', error);
      throw error;
    }
  },
}));