import { create } from 'zustand';
import { subDays } from 'date-fns';

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Expense {
  id: string;
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
  name: string;
  type: 'Trip' | 'Home' | 'Couple' | 'Other';
  members: User[];
  currency: string;
}

interface ExpenseState {
  groups: Group[];
  expenses: Expense[];
  activeGroupId: string | null;
  setActiveGroup: (id: string | null) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  createGroup: (group: Omit<Group, 'id'>) => void;
  settleUp: (groupId: string, fromUser: string, toUser: string, amount: number) => void;
}

// Mock Data
const MOCK_USERS = [
  { id: 'u1', name: 'Alex Johnson', avatar: 'https://github.com/shadcn.png' },
  { id: 'u2', name: 'Sarah Smith', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { id: 'u3', name: 'Mike Brown', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d' },
  { id: 'u4', name: 'Emily Davis', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026708c' },
];

const MOCK_GROUPS: Group[] = [
  {
    id: 'g1',
    name: 'Bali Trip 2025',
    type: 'Trip',
    members: MOCK_USERS,
    currency: '$',
  },
  {
    id: 'g2',
    name: 'Apartment 402',
    type: 'Home',
    members: [MOCK_USERS[0], MOCK_USERS[1]],
    currency: '$',
  },
];

const MOCK_EXPENSES: Expense[] = [
  {
    id: 'e1',
    groupId: 'g1',
    title: 'Villa Rental',
    amount: 1200,
    paidBy: 'u1',
    splitType: 'EQUAL',
    category: 'Travel',
    date: subDays(new Date(), 2).toISOString(),
    participants: ['u1', 'u2', 'u3', 'u4'],
  },
  {
    id: 'e2',
    groupId: 'g1',
    title: 'Dinner at Beach Club',
    amount: 150,
    paidBy: 'u2',
    splitType: 'EQUAL',
    category: 'Food',
    date: subDays(new Date(), 1).toISOString(),
    participants: ['u1', 'u2', 'u3', 'u4'],
  },
  {
    id: 'e3',
    groupId: 'g1',
    title: 'Scuba Diving',
    amount: 400,
    paidBy: 'u3',
    splitType: 'EQUAL',
    category: 'Entertainment',
    date: new Date().toISOString(),
    participants: ['u1', 'u3'],
  },
    {
    id: 'e4',
    groupId: 'g2',
    title: 'Internet Bill',
    amount: 60,
    paidBy: 'u1',
    splitType: 'EQUAL',
    category: 'Utilities',
    date: subDays(new Date(), 5).toISOString(),
    participants: ['u1', 'u2'],
  },
];

export const useExpenseStore = create<ExpenseState>((set) => ({
  groups: MOCK_GROUPS,
  expenses: MOCK_EXPENSES,
  activeGroupId: null,
  setActiveGroup: (id) => set({ activeGroupId: id }),
  addExpense: (expense) => set((state) => ({
    expenses: [...state.expenses, { ...expense, id: `e${Math.random()}`, date: new Date().toISOString() }]
  })),
  createGroup: (group) => set((state) => ({
    groups: [...state.groups, { ...group, id: `g${Math.random()}` }]
  })),
  settleUp: (groupId, fromUser, toUser, amount) => {
    // In a real app, this would create a settlement transaction.
    // For mockup, we can add it as a "Payment" expense or just log it.
    console.log(`Settled: ${fromUser} paid ${toUser} ${amount} in group ${groupId}`);
    set((state) => ({
        expenses: [...state.expenses, {
            id: `s${Math.random()}`,
            groupId,
            title: 'Settlement',
            amount,
            paidBy: fromUser,
            splitType: 'EXACT', // Simplified
            category: 'Other', // Simplified
            date: new Date().toISOString(),
            participants: [toUser] // Simplified: money goes to this person
        }]
    }))
  },
}));