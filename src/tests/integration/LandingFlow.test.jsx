import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../../pages/LandingPage';

describe('Frontend Integration Tests - Landing Page & Full User Flow', () => {
    it('integrates Navbar, Hero sections, and Categories seamlessly on Landing Page', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </MemoryRouter>
        );

        // Verify Hero Title
        expect(screen.getByText(/A Modern Experience/i)).toBeInTheDocument();

        // Verify Feature cards
        expect(screen.getAllByText(/Fashion/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Express/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Explore/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Secure/i).length).toBeGreaterThanOrEqual(1);

        // Verify Categories
        expect(screen.getAllByText(/Clothing Amour/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Gifting Items/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Pick & Drop/i).length).toBeGreaterThanOrEqual(1);
    });
});
