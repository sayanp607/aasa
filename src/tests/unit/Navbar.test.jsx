import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

describe('Frontend Unit Tests - Navbar Component', () => {
    it('renders the navbar brand logo and search placeholder', () => {
        render(
            <MemoryRouter>
                <Navbar onLoginClick={() => {}} />
            </MemoryRouter>
        );

        expect(screen.getByText('E-Commerce')).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('Search for products...')
        ).toBeInTheDocument();
    });

    it('renders key navigation links: Home, Contact Us, and Profile', () => {
        render(
            <MemoryRouter>
                <Navbar onLoginClick={() => {}} />
            </MemoryRouter>
        );

        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
        expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    });
});
