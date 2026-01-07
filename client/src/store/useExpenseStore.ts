import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
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
  createdBy: string;
}

interface ExpenseState {
  groups: Group[];
  expenses: Expense[];
  activeGroupId: string | null;
  isLoading: boolean;
  setActiveGroup: (id: string | null) => void;
  fetchGroups: () => void;
  fetchExpenses: () => void;
  createGroup: (group: Omit<Group, 'id' | 'createdBy'>) => void;
  updateGroup: (id: string, group: Partial<Group>) => void;
  deleteGroup: (id: string) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  settleUp: (groupId: string, fromUser: string, toUser: string, amount: number) => void;
}

// Initialize localStorage with sample data if empty
const initializeData = () => {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) return;
  
  const user = JSON.parse(currentUser);
  
  if (!localStorage.getItem('groups')) {
    const sampleGroups: Group[] = [
      {
        id: '1',
        name: 'Weekend Trip',
        type: 'Trip',
        currency: '₹',
        createdBy: user.id,
        members: [user],
      },
    ];
    localStorage.setItem('groups', JSON.stringify(sampleGroups));
  }
  
  if (!localStorage.getItem('expenses')) {
    localStorage.setItem('expenses', JSON.stringify([]));
  }
};

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  groups: [],
  expenses: [],
  activeGroupId: null,
  isLoading: false,
  
  setActiveGroup: (id) => set({ activeGroupId: id }),
  
  fetchGroups: () => {
    initializeData();
    const groupsJson = localStorage.getItem('groups');
    const groups = groupsJson ? JSON.parse(groupsJson) : [];
    set({ groups });
  },
  
  fetchExpenses: () => {
    initializeData();
    const expensesJson = localStorage.getItem('expenses');
    const expenses = expensesJson ? JSON.parse(expensesJson) : [];
    set({ expenses });
  },
  
  createGroup: (groupData) => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    
    const user = JSON.parse(currentUser);
    const newGroup: Group = {
      ...groupData,
      id: Date.now().toString(),
      createdBy: user.id,
    };
    
    const groups = [...get().groups, newGroup];
    localStorage.setItem('groups', JSON.stringify(groups));
    set({ groups });
  },
  
  updateGroup: (id, groupData) => {
    const groups = get().groups.map(g => 
      g.id === id ? { ...g, ...groupData } : g
    );
    localStorage.setItem('groups', JSON.stringify(groups));
    set({ groups });
  },
  
  deleteGroup: (id) => {
    const groups = get().groups.filter(g => g.id !== id);
    const expenses = get().expenses.filter(e => e.groupId !== id);
    localStorage.setItem('groups', JSON.stringify(groups));
    localStorage.setItem('expenses', JSON.stringify(expenses));
    set({ groups, expenses });
  },
  
  addExpense: (expenseData) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    
    const expenses = [...get().expenses, newExpense];
    localStorage.setItem('expenses', JSON.stringify(expenses));
    set({ expenses });
  },
  
  updateExpense: (id, expenseData) => {
    const expenses = get().expenses.map(e => 
      e.id === id ? { ...e, ...expenseData } : e
    );
    localStorage.setItem('expenses', JSON.stringify(expenses));
    set({ expenses });
  },
  
  deleteExpense: (id) => {
    const expenses = get().expenses.filter(e => e.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    set({ expenses });
  },
  
  settleUp: (groupId, fromUser, toUser, amount) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      groupId,
      title: 'Settlement',
      amount,
      paidBy: toUser,
      splitType: 'EXACT',
      category: 'Other',
      date: new Date().toISOString(),
      participants: [fromUser],
    };
    
    const expenses = [...get().expenses, newExpense];
    localStorage.setItem('expenses', JSON.stringify(expenses));
    set({ expenses });
  },
}));
