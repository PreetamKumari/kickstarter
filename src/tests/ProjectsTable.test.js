import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectsTable from '../components/ProjectsTable';

global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue([
        { 's.no': 1, 'percentage.funded': 100, 'amt.pledged': 1000 },
        { 's.no': 2, 'percentage.funded': 150, 'amt.pledged': 1500 },
        { 's.no': 3, 'percentage.funded': 200, 'amt.pledged': 2000 },
        { 's.no': 4, 'percentage.funded': 250, 'amt.pledged': 2500 },
        { 's.no': 5, 'percentage.funded': 300, 'amt.pledged': 3000 },
        { 's.no': 6, 'percentage.funded': 350, 'amt.pledged': 3500 },
    ]),
});

describe('ProjectsTable Component', () => {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    beforeEach(() => {
        render(<ProjectsTable />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders table headersa nd title', () => {
        expect(screen.getByText(/kickstarter projects/i)).toBeInTheDocument();
        expect(screen.getByText(/S\.No\./i)).toBeInTheDocument();
        expect(screen.getByText(/Percentage Funded/i)).toBeInTheDocument();
        expect(screen.getByText(/Amount Pledged/i)).toBeInTheDocument();
    });

    test('disables previous button on first page', () => {
        const prevButton = screen.getByRole('button', { name: /previous/i });
        expect(prevButton).toBeDisabled();
    });

    test('disables next button on last page', async () => {
        const nextButton = screen.getByRole('button', { name: /next/i });

        fireEvent.click(nextButton);

        await waitFor(() => {
            fireEvent.click(nextButton);
            expect(nextButton).toBeDisabled();
        });
    });
});
