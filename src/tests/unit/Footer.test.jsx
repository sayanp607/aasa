import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Footer from '../../components/Footer';

describe('Frontend Unit Tests - Footer Component', () => {
    it('renders the brand name and tagline accurately', () => {
        render(<Footer />);
        
        expect(screen.getByText('AASA')).toBeInTheDocument();
        expect(
            screen.getByText(/Your premium destination for luxury clothing/i)
        ).toBeInTheDocument();
    });

    it('renders all key navigation sections and footer links', () => {
        render(<Footer />);
        
        expect(screen.getByText('Quick Links')).toBeInTheDocument();
        expect(screen.getByText('Services')).toBeInTheDocument();
        expect(screen.getByText('Support')).toBeInTheDocument();

        // Check specific link anchors
        expect(screen.getAllByText(/Home/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/About Us/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Contact/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Pick & Drop/i).length).toBeGreaterThanOrEqual(1);
    });

    it('dynamically renders the current copyright year', () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear().toString();
        expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
    });
});
