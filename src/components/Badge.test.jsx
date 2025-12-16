import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge - Pure Component', () => {
  it('renders golden badge for 30+ days', () => {
    render(<Badge type="golden" streak={30} />);
    expect(screen.getByTestId('badge')).toHaveTextContent('🏆 30 days');
  });

  it('renders silver badge', () => {
    render(<Badge type="silver" streak={10} />);
    expect(screen.getByTestId('badge')).toHaveTextContent('🥈 10 days');
  });

  it('renders bronze badge', () => {
    render(<Badge type="bronze" streak={5} />);
    expect(screen.getByTestId('badge')).toHaveTextContent('🥉 5 days');
  });

  it('renders nothing when type is null', () => {
    const { container } = render(<Badge type={null} streak={1} />);
    expect(container.firstChild).toBeNull();
  });
});
