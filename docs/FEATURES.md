# Smart Splitter - Features Documentation

## 🎯 Complete Feature List

### 1. Authentication System

#### Login
- **Any Credentials Accepted**: Demo mode allows any username/password
- **Auto User Creation**: New users are automatically created on first login
- **Cookie Storage**: Authentication state stored in browser cookies
- **Session Persistence**: Stays logged in across page refreshes
- **Toast Notifications**: Success/error messages on login attempts
- **Disclaimer Banner**: Blue info banner explaining demo mode

#### Register
- **Form Validation**: Username, name, email, password validation
- **Duplicate Check**: Prevents duplicate usernames
- **Instant Login**: Auto-login after successful registration
- **Toast Feedback**: Real-time success/error notifications

#### Logout
- **One-Click Logout**: Button in sidebar
- **Cookie Cleanup**: Removes authentication cookie
- **LocalStorage Cleanup**: Clears current user data
- **Redirect**: Automatically redirects to login page
- **Toast Notification**: "Logged out successfully" message

### 2. Dashboard Features

#### Overview Stats (4 Cards)
1. **You Are Owed**
   - Green color theme
   - Shows total amount others owe you
   - Arrow down-left icon
   - Border accent

2. **You Owe**
   - Red color theme
   - Shows total amount you owe others
   - Arrow up-right icon
   - Border accent

3. **Net Balance**
   - Blue color theme
   - Calculates net: (owed - owing)
   - Shows positive/negative with color
   - Wallet icon

4. **Total Spending**
   - Purple color theme
   - Sum of all expenses
   - Number of transactions
   - Trending up icon

#### Monthly Spending Chart
- **Bar Chart**: Recharts library
- **Monthly Aggregation**: Groups expenses by month
- **Hover Tooltips**: Shows exact amounts
- **Responsive**: Adjusts to screen size
- **Empty State**: "No data available" message

#### Recent Expenses List
- **5 Most Recent**: Shows latest transactions
- **Category Icons**: Emoji-based visual indicators
- **Group Names**: Shows which group expense belongs to
- **Dates**: Formatted as "MMM d"
- **Amounts**: Bold primary color
- **Empty State**: Icon + message when no expenses

#### Quick Stats (3 Cards)
1. **Active Groups**: Count of user's groups
2. **Total Expenses**: Count of all expenses
3. **Average Expense**: Calculated per transaction

### 3. Groups Management

#### Groups Page

**Header Section**:
- Title and description
- "Create Group" button (prominent)

**Group Cards**:
- **Hover Effects**: Elevation on hover
- **Border Accent**: Left border with primary color
- **Settings Menu**: Dropdown with delete option
- **Click to View**: Navigate to group details
- **Member Avatars**: Stacked avatars (max 4 shown)
- **Member Count**: Shows "+ X" if more than 4
- **Type Badge**: Trip, Home, Couple, Other
- **Arrow Indicator**: Shows it's clickable

**Empty State**:
- Large icon
- Helpful message
- Call-to-action button

**Create Group Dialog**:
- Modal form
- Fields: Name, Type, Currency
- Type dropdown: Trip, Home, Couple, Other
- Validation: Min 2 characters for name
- Auto-adds creator as member
- Toast notification on success
- Auto-closes on success

**Delete Group**:
- Confirmation dialog
- Shows group name
- Warning about deletion
- Deletes all associated expenses
- Toast notification

### 4. Group Details

#### Header
- Back button to groups page
- Group name + type badge
- Member count
- "Add Expense" button (primary)
- "Delete Group" button (destructive)

#### Tabs Navigation
1. **Expenses Tab**
2. **Balances Tab**

#### Expenses Tab

**Expense Cards**:
- Category emoji (🍔🏠✈️🛍️🎬💡🧾)
- Expense title
- Who paid + category
- Amount (large, bold)
- Date formatted
- Three-dot menu (on hover)
- Delete option in menu
- Hover effects

**Empty State**:
- Large receipt icon
- Helpful message
- "Add Expense" CTA button

**Add Expense Dialog**:
- Description field
- Amount field (with $ prefix)
- Category dropdown (with emojis)
- "Paid By" dropdown (group members)
- Validation
- Toast notification
- Auto-resets form

**Delete Expense**:
- Confirmation dialog
- Shows expense title
- Warning message
- Toast on success

#### Balances Tab

**Balance Cards** (per member):
- Avatar with initials
- Member name
- Amount paid
- Amount owed (share)
- Net balance (color-coded)
- Green: Gets money back (+$X)
- Red: Owes money (-$X)
- Gray: Settled

**Calculations**:
- Automatic balance computation
- Equal split among participants
- Real-time updates

#### Sidebar

**Members Card**:
- Scrollable list (max height 300px)
- Avatar + name + email
- Hover effects
- All group members shown

**Total Spending Card**:
- Gradient background (primary)
- Large amount display
- Expense count
- Trending up icon
- White text

### 5. Analytics Page

#### Spending by Category
- **Pie Chart**: Visual breakdown
- **Color-Coded**: Different color per category
- **Percentages**: Shows % of total
- **Legend**: Category names with colors
- **Responsive**: Adapts to screen size

#### Monthly Trends
- **Bar Chart**: Month-over-month comparison
- **Tooltips**: Hover for exact values
- **Color-Coded**: Primary color bars

#### Top Spenders
- **Mock Data**: Shows sample user spending
- **Bar Chart**: Visual comparison
- **Sorted**: Highest to lowest

### 6. UI/UX Features

#### Layout
- **Responsive Sidebar**: Desktop and mobile
- **Mobile Menu**: Sheet/drawer on mobile
- **Hamburger Icon**: Top-left on mobile
- **Logo**: Receipt icon + "SplitSmart"
- **Navigation Links**: Dashboard, Groups, Analytics, Expenses
- **Active Indication**: Highlighted current page
- **Logout Button**: Bottom of sidebar, red text

#### Animations
- **Fade In**: All pages animate on load
- **Hover Effects**: Cards elevate on hover
- **Transitions**: Smooth color/transform changes
- **Loading States**: Spinner during auth check

#### Toast Notifications
- **Position**: Top-right
- **Auto-Close**: 3 seconds
- **Types**: Success (green), Error (red)
- **Descriptions**: Additional context
- **Non-Intrusive**: Doesn't block UI
- **Dismissible**: Click to close

#### Forms
- **Validation**: Real-time with Zod
- **Error Messages**: Under each field
- **Required Fields**: Visual indicators
- **Loading States**: Button shows "Loading..."
- **Disabled States**: During submission

#### Cards
- **Consistent Design**: Rounded corners, shadows
- **Hover States**: Background color change
- **Border Accents**: Left border for emphasis
- **Proper Spacing**: Padding and gaps

#### Colors
- **Primary**: Brand color (blue by default)
- **Success**: Green for positive actions
- **Destructive**: Red for deletions/owing
- **Muted**: Gray for secondary info
- **Gradients**: Used for hero elements

#### Typography
- **Hierarchy**: Clear heading sizes
- **Font Weights**: Bold for emphasis
- **Colors**: Muted for secondary text
- **Truncation**: Long text handled properly

### 7. Data Management

#### LocalStorage Structure
```javascript
{
  users: [{ id, username, name, email }],
  currentUser: { id, username, name, email },
  groups: [{ id, name, type, currency, members, createdBy }],
  expenses: [{ id, groupId, title, amount, paidBy, splitType, category, date, participants }]
}
```

#### Cookie Structure
```
isAuthenticated: "true" | undefined
```

#### CRUD Operations

**Create**:
- Groups: Auto-generates ID, adds creator
- Expenses: Auto-generates ID and date
- Users: Auto-generates ID on register/login

**Read**:
- Fetched from localStorage on mount
- Zustand stores maintain in-memory cache
- Real-time updates via state

**Update**:
- Groups: Can update name, type, members
- Expenses: Can update (future enhancement)

**Delete**:
- Groups: Removes group + all expenses
- Expenses: Removes individual expense
- Users: N/A (no user deletion)

### 8. Calculations

#### Balance Algorithm
```
For each user:
  paid = sum of expenses where user paid
  share = sum of (expense amount / participants) where user is participant
  net = paid - share
```

#### Split Types
- **EQUAL**: Default, splits evenly
- **PERCENTAGE**: Future enhancement
- **EXACT**: Future enhancement

### 9. Categories

Available expense categories:
- 🍔 Food
- ✈️ Travel
- 🏠 Rent
- 🛍️ Shopping
- 🎬 Entertainment
- 💡 Utilities
- 🧾 Other

### 10. Responsive Breakpoints

- **Mobile**: < 768px (md)
  - Stacked layout
  - Hamburger menu
  - Full-width cards

- **Tablet**: 768px - 1024px (md to lg)
  - 2-column grids
  - Sidebar visible
  - Optimized spacing

- **Desktop**: > 1024px (lg+)
  - 3-4 column grids
  - Full sidebar always visible
  - Maximum content width

## 🔮 Future Enhancements

- [ ] Edit expense functionality
- [ ] Edit group functionality
- [ ] Add/remove group members
- [ ] Split type options (percentage, exact)
- [ ] Receipt image uploads
- [ ] Export to PDF/CSV
- [ ] Multiple currencies
- [ ] Currency conversion
- [ ] Email notifications
- [ ] Recurring expenses
- [ ] Budget limits
- [ ] Search and filters
- [ ] Dark mode toggle
- [ ] User profiles
- [ ] Group invitations
- [ ] Real-time sync
- [ ] Mobile app (React Native)

