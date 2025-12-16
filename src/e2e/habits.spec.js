import { test, expect } from '@playwright/test';

test.describe('Habit Tracker E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays habit tracker title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  });

  test('shows empty state initially', async ({ page }) => {
    await page.route('**/api/habits', async (route) => {
      await route.fulfill({ json: [] });
    });
    
    await expect(page.getByTestId('empty')).toBeVisible();
  });

  test('creates a new habit', async ({ page }) => {
    // Mock API
    await page.route('**/api/habits', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({ json: [] });
      } else if (route.request().method() === 'POST') {
        const postData = route.request().postDataJSON();
        await route.fulfill({
          json: { id: 1, ...postData, completedDates: [] },
        });
      }
    });

    await page.getByTestId('name-input').fill('Exercise');
    await page.getByTestId('description-input').fill('Daily workout');
    await page.getByTestId('submit-button').click();

    await expect(page.getByRole('heading', { name: 'Exercise', exact: true })).toBeVisible();
    await expect(page.getByText('Daily workout')).toBeVisible();
  });

  test('marks habit as complete', async ({ page }) => {
    const today = new Date().toISOString().split('T')[0];
    
    await page.route('**/api/habits', async (route) => {
      await route.fulfill({
        json: [
          { id: 1, name: 'Exercise', description: 'Workout', streak: 0, completedDates: [] },
        ],
      });
    });

    await page.route('**/api/habits/1/toggle', async (route) => {
      await route.fulfill({
        json: { id: 1, completedDates: [today] },
      });
    });

    await page.waitForSelector('[data-testid="habit-card"]');
    await page.getByTestId('toggle-button').click();

    await expect(page.getByText('✓ Done')).toBeVisible();
  });

  test('displays streak badge', async ({ page }) => {
    await page.route('**/api/habits', async (route) => {
      await route.fulfill({
        json: [
          {
            id: 1,
            name: 'Exercise',
            description: 'Workout',
            streak: 30,
            completedDates: [],
          },
        ],
      });
    });

    await page.waitForSelector('[data-testid="badge"]');
    await expect(page.getByTestId('badge')).toContainText('30 days');
  });
});
