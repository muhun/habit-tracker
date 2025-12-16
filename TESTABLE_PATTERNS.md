# Testable Code Patterns Demonstrated

## 1. Pure Functions (Unit Tests)

**File**: `src/utils/dateUtils.js`

### Why Testable?
- No side effects
- Deterministic output
- No external dependencies
- Easy to test in isolation

### Example:
```javascript
export const getBadgeType = (streak) => {
  if (streak >= 30) return 'golden';
  if (streak >= 7) return 'silver';
  if (streak >= 3) return 'bronze';
  return null;
};
```

### Test:
```javascript
it('returns golden for 30+ days', () => {
  expect(getBadgeType(30)).toBe('golden');
});
```

**Benefits**: Fast, reliable, no mocking needed

---

## 2. Pure Components (Component Tests)

**File**: `src/components/Badge.jsx`

### Why Testable?
- Props in, UI out
- No internal state or side effects
- Predictable rendering
- Easy to test different scenarios

### Example:
```javascript
export const Badge = ({ type, streak }) => {
  if (!type) return null;
  const styles = { golden: { bg: '#FFD700', text: '🏆' } };
  return <div data-testid="badge">{styles[type].text} {streak} days</div>;
};
```

### Test:
```javascript
it('renders golden badge for 30+ days', () => {
  render(<Badge type="golden" streak={30} />);
  expect(screen.getByTestId('badge')).toHaveTextContent('🏆 30 days');
});
```

**Benefits**: Test rendering logic without complex setup

---

## 3. Presentational Components (Component Tests)

**Files**: `HabitCard.jsx`, `HabitList.jsx`, `HabitForm.jsx`

### Why Testable?
- Separation of concerns
- No business logic
- Callbacks for actions
- Easy to test user interactions

### Example:
```javascript
export const HabitCard = ({ habit, onToggle, onEdit }) => {
  return (
    <div>
      <h3>{habit.name}</h3>
      <button onClick={() => onToggle(habit.id)}>Mark Done</button>
    </div>
  );
};
```

### Test:
```javascript
it('calls onToggle when button clicked', async () => {
  const onToggle = vi.fn();
  render(<HabitCard habit={mockHabit} onToggle={onToggle} />);
  await user.click(screen.getByText('Mark Done'));
  expect(onToggle).toHaveBeenCalledWith(1);
});
```

**Benefits**: Test user interactions with mocked callbacks

---

## 4. Container Components (Integration Tests)

**File**: `src/components/HabitContainer.jsx`

### Why Testable?
- Connects hooks to presentational components
- Business logic in one place
- Easy to mock dependencies
- Tests data flow

### Example:
```javascript
export const HabitContainer = () => {
  const { habits, loading } = useHabits();
  const { createHabit } = useHabitActions();
  
  return (
    <>
      <HabitForm onSubmit={createHabit} />
      <HabitList habits={habits} loading={loading} />
    </>
  );
};
```

### Test:
```javascript
it('creates new habit', async () => {
  habitApi.createHabit.mockResolvedValue(newHabit);
  render(<HabitContainer />);
  // Fill form and submit
  await waitFor(() => {
    expect(habitApi.createHabit).toHaveBeenCalled();
  });
});
```

**Benefits**: Test complete workflows with mocked APIs

---

## 5. Custom Hooks (Hook Tests)

**File**: `src/hooks/useHabits.js`

### Why Testable?
- Reusable logic extracted
- Can be tested independently
- Easy to mock dependencies
- Separates concerns

### Example:
```javascript
export const useHabits = () => {
  const { habits, loading, setHabits, setLoading } = useHabitStore();
  
  useEffect(() => {
    const loadHabits = async () => {
      setLoading(true);
      const data = await habitApi.fetchHabits();
      setHabits(data);
      setLoading(false);
    };
    loadHabits();
  }, []);
  
  return { habits, loading };
};
```

### Test:
```javascript
it('loads habits on mount', async () => {
  habitApi.fetchHabits.mockResolvedValue(mockHabits);
  const { result } = renderHook(() => useHabits());
  
  await waitFor(() => {
    expect(result.current.habits).toEqual(mockHabits);
  });
});
```

**Benefits**: Test hook logic without rendering components

---

## 6. API Layer (Mocking)

**File**: `src/api/habitApi.js`

### Why Testable?
- Centralized network calls
- Easy to mock in tests
- Single source of truth
- Can swap implementations

### Example:
```javascript
export const fetchHabits = async () => {
  const response = await fetch(`${API_URL}/habits`);
  return response.json();
};
```

### Mock:
```javascript
vi.mock('../api/habitApi');
habitApi.fetchHabits.mockResolvedValue([...mockData]);
```

**Benefits**: Test without real API, control responses

---

## 7. E2E Tests (Playwright)

**File**: `src/e2e/habits.spec.js`

### Why Important?
- Tests real user workflows
- Tests in actual browser
- Catches integration issues
- Validates complete features

### Example:
```javascript
test('creates a new habit', async ({ page }) => {
  await page.route('**/api/habits', async (route) => {
    await route.fulfill({ json: mockResponse });
  });
  
  await page.getByTestId('name-input').fill('Exercise');
  await page.getByTestId('submit-button').click();
  
  await expect(page.getByText('Exercise')).toBeVisible();
});
```

**Benefits**: Confidence in production behavior

---

## Key Principles Applied

### 1. Separation of Concerns
- **Pure functions** → Utils
- **Presentational** → Components
- **Business logic** → Containers/Hooks
- **Network calls** → API layer

### 2. Dependency Injection
```javascript
// Bad: Hard to test
const HabitCard = ({ habit }) => {
  const handleClick = () => {
    habitApi.toggle(habit.id); // Direct dependency
  };
};

// Good: Easy to test
const HabitCard = ({ habit, onToggle }) => {
  const handleClick = () => {
    onToggle(habit.id); // Injected dependency
  };
};
```

### 3. Single Responsibility
Each component/function does ONE thing:
- `Badge` → Display badge
- `HabitCard` → Display habit
- `HabitList` → Display list
- `HabitContainer` → Orchestrate

### 4. Avoid Side Effects
```javascript
// Bad: Side effect in component
const HabitCard = ({ habit }) => {
  useEffect(() => {
    fetch('/api/habits'); // Side effect
  }, []);
};

// Good: Side effect in hook
const useHabits = () => {
  useEffect(() => {
    fetch('/api/habits'); // Isolated
  }, []);
};
```

### 5. Testable State Management
- Zustand store is separate from components
- Components access via hooks
- Easy to mock store in tests

---

## Test Coverage Summary

| Type | Files | Tests | Purpose |
|------|-------|-------|---------|
| Unit | dateUtils | 9 | Pure function logic |
| Component | Badge, Card, Form, List | 19 | UI rendering & interactions |
| Integration | Container, Hooks | 6 | Data flow & workflows |
| E2E | Playwright | 5 | User workflows |

**Total: 34 unit/component/integration tests + 5 E2E tests**

---

## Running Tests

```bash
# All unit & component tests
npm test

# Watch mode
npm test -- --watch

# E2E tests
npm run test:e2e

# E2E with UI
npm run test:e2e:ui
```

---

## Mocking Strategies

### 1. Mock API Module
```javascript
vi.mock('../api/habitApi');
habitApi.fetchHabits.mockResolvedValue(data);
```

### 2. Mock Network in E2E
```javascript
await page.route('**/api/habits', async (route) => {
  await route.fulfill({ json: mockData });
});
```

### 3. Mock Functions
```javascript
const onToggle = vi.fn();
render(<HabitCard onToggle={onToggle} />);
expect(onToggle).toHaveBeenCalled();
```

---

## Best Practices Demonstrated

✅ **Co-locate tests** with source files  
✅ **Use data-testid** for stable selectors  
✅ **Test behavior**, not implementation  
✅ **Mock external dependencies**  
✅ **Keep tests simple** and focused  
✅ **Use descriptive test names**  
✅ **Follow AAA pattern** (Arrange-Act-Assert)  
✅ **Test edge cases** (empty, error states)  
✅ **Avoid test interdependence**  
✅ **Use userEvent** for realistic interactions  

---

## Conclusion

This app demonstrates how to write testable code by:
1. Separating concerns (pure functions, components, hooks)
2. Using dependency injection (props, callbacks)
3. Avoiding side effects in components
4. Centralizing API calls
5. Using container/presentational pattern
6. Writing comprehensive tests at all levels

**Result**: Maintainable, reliable, and easy-to-test codebase! 🎉
