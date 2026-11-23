import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Basic sanity check test for Vite + React test suite
describe('Aasa Frontend Sanity Tests', () => {
    it('verifies Vitest test runner is configured and operational', () => {
        expect(1 + 1).toBe(2);
    });

    it('renders basic JSX elements correctly with testing-library', () => {
        render(<div data-testid="aasa-banner">Aasa Super App</div>);
        const element = screen.getByTestId('aasa-banner');
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent('Aasa Super App');
    });
});
