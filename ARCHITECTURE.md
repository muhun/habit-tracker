# Architecture & Data Flow

## Component Hierarchy

```
App
 └── HabitContainer (Container)
      ├── HabitForm (Presentational)
      └── HabitList (Presentational)
           └── HabitCard (Presentational)
                └── Badge (Pure)
```

## Data Flow

```
User Action
    ↓
Presentational Component (via callback)
    ↓
Container Component
    ↓
Custom Hook (useHabitActions)
    ↓
API Layer (habitApi)
    ↓
Zustand Store (habitStore)
    ↓
Custom Hook (useHabits)
    ↓
Container Component
    ↓
Presentational Component (via props)
    ↓
UI Update
```

## Detailed Flow Example: Adding a Habit

```
1. User fills form in HabitForm
   └── Controlled inputs (local state)

2. User clicks "Add Habit"
   └── onSubmit callback fired

3. HabitContainer.handleSubmit
   └── Receives form data

4. useHabitActions.createHabit
   └── Business logic

5. habitApi.createHabit
   └── POST /api/habits

6. habitStore.addHabit
   └── Updates global state

7. useHabits hook
   └── Reads updated state

8. HabitContainer re-renders
   └── Passes new habits to HabitList

9. HabitList renders
   └── Maps habits to HabitCards

10. UI shows new habit
    └── User sees feedback
```

## Layer Responsibilities

### 1. Pure Components (Badge)
```
Input: Props (type, streak)
Output: JSX
Side Effects: None
State: None
Dependencies: None
```

### 2. Presentational Components (HabitCard, HabitForm, HabitList)
```
Input: Props (data, callbacks)
Output: JSX
Side Effects: None (except local form state)
State: Local UI state only
Dependencies: Other presentational components
```

### 3. Container Components (HabitContainer)
```
Input: None (or route params)
Output: JSX (composed presentational components)
Side Effects: Data fetching, actions
State: Via hooks
Dependencies: Hooks, presentational components
```

### 4. Custom Hooks (useHabits, useHabitActions)
```
Input: None (or params)
Output: State and functions
Side Effects: API calls, state updates
State: Via Zustand store
Dependencies: API layer, store
```

### 5. API Layer (habitApi)
```
Input: Request data
Output: Promise<Response>
Side Effects: Network calls
State: None
Dependencies: fetch API
```

### 6. Store (habitStore)
```
Input: Actions
Output: State
Side Effects: State updates
State: Global app state
Dependencies: Zustand
```

### 7. Utils (dateUtils)
```
Input: Data
Output: Computed value
Side Effects: None
State: None
Dependencies: None
```

## Testing Strategy by Layer

```
┌─────────────────────────────────────┐
│         Pure Components             │
│           (Badge)                   │
│                                     │
│  Test: Props → Rendering            │
│  Mock: Nothing                      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│     Presentational Components       │
│  (HabitCard, Form, List)            │
│                                     │
│  Test: Props → UI, Interactions     │
│  Mock: Callbacks                    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      Container Components           │
│      (HabitContainer)               │
│                                     │
│  Test: Integration, Data Flow       │
│  Mock: API Layer                    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          Custom Hooks               │
│   (useHabits, useHabitActions)      │
│                                     │
│  Test: Logic, Async, State          │
│  Mock: API Layer                    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          Pure Functions             │
│         (dateUtils)                 │
│                                     │
│  Test: Input → Output               │
│  Mock: Nothing                      │
└─────────────────────────────────────┘
```

## Dependency Graph

```
App
 ↓
HabitContainer
 ↓ ↓ ↓
 │ │ └→ HabitForm
 │ │
 │ └→ HabitList → HabitCard → Badge
 │
 └→ useHabits ──┐
    useHabitActions ──┐
                      ↓
                  habitApi
                      ↓
                  habitStore
                      ↓
                  dateUtils
```

## State Management Flow

```
┌─────────────────────────────────────┐
│        Zustand Store                │
│                                     │
│  State:                             │
│  - habits: []                       │
│  - loading: false                   │
│  - error: null                      │
│                                     │
│  Actions:                           │
│  - setHabits(habits)                │
│  - addHabit(habit)                  │
│  - updateHabit(id, updates)         │
│  - toggleCompletion(id, date)       │
└─────────────────────────────────────┘
         ↑                    ↓
         │                    │
    Write Actions        Read State
         │                    │
┌────────┴────────┐  ┌────────┴────────┐
│ useHabitActions │  │   useHabits     │
└─────────────────┘  └─────────────────┘
         ↑                    ↓
         │                    │
┌────────┴────────────────────┴────────┐
│        HabitContainer               │
└─────────────────────────────────────┘
```

## Testability Matrix

| Component | Testability | Why |
|-----------|-------------|-----|
| Badge | ⭐⭐⭐⭐⭐ | Pure, no deps |
| HabitCard | ⭐⭐⭐⭐⭐ | Props only |
| HabitForm | ⭐⭐⭐⭐⭐ | Controlled, callbacks |
| HabitList | ⭐⭐⭐⭐⭐ | Props only |
| HabitContainer | ⭐⭐⭐⭐ | Mock API |
| useHabits | ⭐⭐⭐⭐ | Mock API |
| useHabitActions | ⭐⭐⭐⭐ | Mock API |
| habitApi | ⭐⭐⭐⭐⭐ | Easy to mock |
| habitStore | ⭐⭐⭐⭐⭐ | Zustand testable |
| dateUtils | ⭐⭐⭐⭐⭐ | Pure functions |

## Coupling Analysis

### Low Coupling ✅
- Badge ← No dependencies
- dateUtils ← No dependencies
- habitApi ← Only fetch
- Presentational components ← Only props

### Medium Coupling ⚠️
- Container ← Depends on hooks
- Hooks ← Depend on API + Store

### Why This Works
- Dependencies flow one direction
- Easy to mock at boundaries
- Each layer has clear responsibility
- Can test each layer independently

## Reusability

### Highly Reusable
- ✅ Badge - Use anywhere
- ✅ HabitCard - Use in any list
- ✅ HabitForm - Use in modal, page, etc.
- ✅ dateUtils - Use in any project

### Context-Specific
- ⚠️ HabitContainer - Specific to this feature
- ⚠️ useHabits - Specific to habits

### How to Make More Reusable
```javascript
// Generic version
const ItemCard = ({ item, onToggle, onEdit, renderBadge }) => {
  return (
    <div>
      <h3>{item.name}</h3>
      {renderBadge && renderBadge(item)}
      <button onClick={() => onToggle(item.id)}>Toggle</button>
    </div>
  );
};

// Specific usage
<ItemCard 
  item={habit} 
  renderBadge={(h) => <Badge type={getBadgeType(h.streak)} />}
/>
```

## Performance Considerations

### Optimizations Applied
- ✅ Pure components (React.memo potential)
- ✅ Zustand (efficient re-renders)
- ✅ Callbacks passed down (useCallback potential)

### Not Needed Yet
- ❌ Virtualization (small lists)
- ❌ Code splitting (small app)
- ❌ Memoization (no expensive calcs)

## Scalability

### Easy to Add
- ✅ New habit properties
- ✅ New badge types
- ✅ New actions
- ✅ New components

### Pattern to Follow
1. Add pure function to utils (if needed)
2. Add presentational component
3. Add to container
4. Add tests
5. Done!

## Summary

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Testable at every layer
- ✅ Easy to understand
- ✅ Easy to maintain
- ✅ Easy to extend
- ✅ Loosely coupled
- ✅ Highly cohesive

**Result**: A maintainable, testable, scalable React application! 🎯
