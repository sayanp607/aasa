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

        // Verify Hero Title is in the DOM
        expect(screen.getByText(/A Modern Experience/i)).toBeInTheDocument();

        // Verify feature cards are rendered (Fashion, Express, Explore, Secure)
        expect(screen.getByText('Fashion')).toBeInTheDocument();
        expect(screen.getByText('Express')).toBeInTheDocument();
        expect(screen.getByText('Explore')).toBeInTheDocument();
        expect(screen.getByText('Secure')).toBeInTheDocument();

        // Verify Categories section
        expect(screen.getByText('Clothing Amour')).toBeInTheDocument();
        expect(screen.getByText('Gifting Items')).toBeInTheDocument();
        expect(screen.getByText('Pick & Drop')).toBeInTheDocument();
    });
});
