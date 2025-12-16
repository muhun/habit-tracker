# Habit Tracker - Testable React App Demo

A React application demonstrating testable code patterns with comprehensive test coverage.

## Features

- ✅ Track multiple habits
- ✅ Daily streak tracking
- ✅ Badge system (Bronze: 3 days, Silver: 7 days, Golden: 30 days, Diamond: 100 days)
- ✅ Add/Edit habits
- ✅ Mark habits as complete
- ✅ Interactive component documentation with Storybook

## Architecture Patterns Demonstrated

### 1. **Pure Functions** (`src/utils/dateUtils.js`)
- No side effects
- Deterministic output
- Easy to test in isolation
- **Tests**: `dateUtils.test.js` - Unit tests

### 2. **Pure Components** (`src/components/Badge.jsx`, `HabitCard.jsx`, `HabitList.jsx`)
- Presentational components
- Props in, UI out
- No business logic
- **Tests**: Component tests with React Testing Library

### 3. **Container Components** (`src/components/HabitContainer.jsx`)
- Connects state to presentational components
- Handles business logic
- Uses hooks for data fetching
- **Tests**: Integration tests

### 4. **Custom Hooks** (`src/hooks/useHabits.js`)
- Reusable logic
- Separates concerns
- Easy to mock
- **Tests**: Hook tests with renderHook

### 5. **API Layer** (`src/api/habitApi.js`)
- Centralized network calls
- Easy to mock for testing
- **Tests**: Mocked in integration tests

### 6. **State Management** (`src/store/habitStore.js`)
- Zustand for global state
- Loosely coupled from components

## Test Types

### Unit Tests (Vitest)
```bash
npm test src/utils/dateUtils.test.js
```
- Tests pure functions in isolation
- Fast, deterministic

### Component Tests (React Testing Library)
```bash
npm test src/components/Badge.test.jsx
npm test src/components/HabitCard.test.jsx
npm test src/components/HabitForm.test.jsx
npm test src/components/HabitList.test.jsx
```
- Tests component rendering
- Tests user interactions
- Tests props handling

### Integration Tests
```bash
npm test src/components/HabitContainer.test.jsx
npm test src/hooks/useHabits.test.js
```
- Tests component + hooks + store
- Mocks API calls
- Tests data flow

### E2E Tests (Playwright)
```bash
npm run test:e2e
```
- Tests full user workflows
- Tests in real browser
- Mocks network requests

### Storybook (Component Documentation)
```bash
npm run storybook
```
- Interactive component documentation
- Visual testing and development
- Component isolation and props exploration

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Run All Tests
```bash
npm test
```

### Run E2E Tests
```bash
npm run test:e2e
```

### Run Tests with UI
```bash
npm run test:ui
npm run test:e2e:ui
```

### Run Storybook
```bash
npm run storybook
```

### Build Storybook
```bash
npm run build-storybook
```

## Testing Best Practices Demonstrated

1. **Separation of Concerns**
   - Pure functions separate from components
   - Presentational vs Container components
   - API layer separate from business logic

2. **Mocking Strategies**
   - Mock API calls with `vi.mock()`
   - Mock network requests in E2E with Playwright
   - Dependency injection for testability

3. **Test Organization**
   - Co-located tests with source files
   - Descriptive test names
   - Arrange-Act-Assert pattern

4. **Component Testing**
   - Test behavior, not implementation
   - Use data-testid for stable selectors
   - Test user interactions with userEvent

5. **Loose Coupling**
   - Components receive data via props
   - Hooks abstract data fetching
   - Store is separate from components

## Project Structure

```
src/
├── api/              # API layer (network calls)
├── components/       # React components + Storybook stories
│   ├── Badge.jsx           # Pure presentational
│   ├── Badge.stories.js    # Storybook stories
│   ├── HabitCard.jsx       # Pure presentational
│   ├── HabitCard.stories.js # Storybook stories
│   ├── HabitForm.jsx       # Pure presentational
│   ├── HabitForm.stories.js # Storybook stories
│   ├── HabitList.jsx       # Pure presentational
│   ├── HabitList.stories.js # Storybook stories
│   └── HabitContainer.jsx  # Container component
│   └── HabitContainer.stories.js # Storybook stories
├── hooks/            # Custom React hooks
├── store/            # Zustand state management
├── utils/            # Pure utility functions
├── e2e/              # Playwright E2E tests
├── test/             # Test setup
└── .storybook/       # Storybook configuration

```

## Key Testability Principles

1. **Pure Functions**: Easiest to test, no dependencies
2. **Props Over State**: Makes components predictable
3. **Dependency Injection**: Pass dependencies as props/params
4. **Single Responsibility**: Each function/component does one thing
5. **Avoid Side Effects**: Keep side effects in specific layers (hooks, API)

## Notes

- API calls are mocked in tests (no real backend needed for demo)
- E2E tests mock network requests with Playwright
- All tests can run without external dependencies
