# Demo Guide - Testable React Code

## Quick Start

```bash
# Install dependencies
npm install

# Run tests
npm test

# Start dev server
npm run dev

# Run E2E tests (requires dev server running)
npm run test:e2e
```

## Demo Flow

### 1. Pure Functions & Unit Tests (5 min)

**Show**: `src/utils/dateUtils.js`
- Pure functions with no side effects
- Easy to understand and test
- Deterministic output

**Run**: `npm test src/utils/dateUtils.test.js`
- Fast execution
- No mocking needed
- Clear assertions

**Key Points**:
- Input → Output, no surprises
- No external dependencies
- Easy to reason about

---

### 2. Pure Components & Component Tests (5 min)

**Show**: `src/components/Badge.jsx`
- Props in, UI out
- No state, no side effects
- Predictable rendering

**Run**: `npm test src/components/Badge.test.jsx`
- Test different props
- Test edge cases (null)
- Verify rendering

**Key Points**:
- Reusable and composable
- Easy to test in isolation
- No complex setup needed

---

### 3. Presentational Components (5 min)

**Show**: `src/components/HabitCard.jsx`
- Displays data from props
- Callbacks for actions
- No business logic

**Run**: `npm test src/components/HabitCard.test.jsx`
- Test rendering
- Test user interactions
- Mock callbacks

**Key Points**:
- Separation of concerns
- Test UI without business logic
- Easy to mock interactions

---

### 4. Container Components & Integration (5 min)

**Show**: `src/components/HabitContainer.jsx`
- Connects hooks to presentational components
- Handles business logic
- Orchestrates data flow

**Run**: `npm test src/components/HabitContainer.test.jsx`
- Mock API calls
- Test complete workflows
- Verify integration

**Key Points**:
- Container/Presentational pattern
- Business logic in one place
- Easy to test with mocked APIs

---

### 5. Custom Hooks (5 min)

**Show**: `src/hooks/useHabits.js`
- Reusable logic
- Separates concerns
- Easy to test independently

**Run**: `npm test src/hooks/useHabits.test.js`
- Use renderHook
- Mock API layer
- Test async behavior

**Key Points**:
- Extract reusable logic
- Test without components
- Mock dependencies easily

---

### 6. API Layer & Mocking (3 min)

**Show**: `src/api/habitApi.js`
- Centralized network calls
- Single source of truth
- Easy to mock

**Show in tests**: How we mock it
```javascript
vi.mock('../api/habitApi');
habitApi.fetchHabits.mockResolvedValue(data);
```

**Key Points**:
- Centralize external calls
- Easy to swap implementations
- Control test responses

---

### 7. E2E Tests (5 min)

**Show**: `src/e2e/habits.spec.js`
- Real browser testing
- Complete user workflows
- Mock network requests

**Run**: `npm run test:e2e`
- Tests in Chromium
- Validates full features
- Catches integration issues

**Key Points**:
- Test like a user
- Confidence in production
- Mock network for consistency

---

## Architecture Overview

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  (Pure Components - Easy to Test)   │
│  Badge, HabitCard, HabitForm, List  │
└──────────────┬──────────────────────┘
               │ Props & Callbacks
┌──────────────▼──────────────────────┐
│         Container Layer             │
│   (Business Logic & Orchestration)  │
│        HabitContainer               │
└──────────────┬──────────────────────┘
               │ Uses Hooks
┌──────────────▼──────────────────────┐
│          Hook Layer                 │
│    (Data Fetching & Actions)        │
│      useHabits, useHabitActions     │
└──────────────┬──────────────────────┘
               │ Calls API
┌──────────────▼──────────────────────┐
│          API Layer                  │
│      (Network Calls - Mockable)     │
│          habitApi.js                │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│        State Management             │
│         (Zustand Store)             │
│         habitStore.js               │
└─────────────────────────────────────┘
```

---

## Test Pyramid

```
        /\
       /E2E\         5 tests - Full workflows
      /------\
     /  Integ \      6 tests - Component + Hooks
    /----------\
   / Component  \    19 tests - UI & Interactions
  /--------------\
 /     Unit       \  9 tests - Pure functions
/------------------\
```

---

## Key Takeaways

### ✅ What Makes Code Testable?

1. **Pure Functions**
   - No side effects
   - Deterministic
   - No external dependencies

2. **Separation of Concerns**
   - Presentational vs Container
   - Business logic vs UI
   - Data fetching vs rendering

3. **Dependency Injection**
   - Pass dependencies as props
   - Use callbacks for actions
   - Mock external services

4. **Single Responsibility**
   - Each function/component does one thing
   - Easy to understand
   - Easy to test

5. **Loose Coupling**
   - Components don't know about API
   - Hooks abstract data fetching
   - Store is separate from UI

---

## Common Anti-Patterns (Avoided)

❌ **Tight Coupling**
```javascript
// Bad: Component directly calls API
const HabitCard = () => {
  const data = await fetch('/api/habits');
};
```

❌ **Mixed Concerns**
```javascript
// Bad: Business logic in presentational component
const HabitCard = ({ habit }) => {
  const streak = calculateStreak(habit.dates); // Logic here
  const badge = getBadge(streak); // Logic here
};
```

❌ **Hidden Dependencies**
```javascript
// Bad: Global state access
const HabitCard = () => {
  const habits = window.globalStore.habits;
};
```

---

## Demo Script

1. **Start**: "Let's see how to write testable React code"
2. **Pure Functions**: Show utils, run tests - "Fast, no mocking"
3. **Pure Components**: Show Badge, run tests - "Props in, UI out"
4. **Presentational**: Show HabitCard - "No business logic"
5. **Container**: Show HabitContainer - "Connects everything"
6. **Hooks**: Show useHabits - "Reusable logic"
7. **Integration**: Run container tests - "Mock API, test flow"
8. **E2E**: Run Playwright - "Test like a user"
9. **Wrap up**: "Separation of concerns = testability"

---

## Questions to Address

**Q: Why separate presentational and container?**
A: Test UI without business logic, reuse components

**Q: Why custom hooks?**
A: Reusable logic, test independently, separate concerns

**Q: Why API layer?**
A: Centralize network calls, easy to mock, swap implementations

**Q: Why pure functions?**
A: Easiest to test, no side effects, deterministic

**Q: How to test async code?**
A: Mock API, use waitFor, test loading/error states

---

## Live Coding Ideas

1. Add a new pure function (e.g., `formatDate`)
2. Add a new presentational component (e.g., `StreakBadge`)
3. Add a test for edge case
4. Show how to debug failing test
5. Add E2E test for new feature

---

## Resources

- **Vitest**: https://vitest.dev
- **React Testing Library**: https://testing-library.com/react
- **Playwright**: https://playwright.dev
- **Zustand**: https://zustand-demo.pmnd.rs

---

## Next Steps

After demo, attendees can:
1. Clone the repo
2. Run tests locally
3. Add new features with tests
4. Practice testable patterns
5. Apply to their projects

**Remember**: Testable code = Maintainable code! 🚀
