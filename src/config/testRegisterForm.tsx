  import { render, fireEvent, waitFor } from '@testing-library/react';
  import RegisterForm from '../components/auth/RegisterForm';
  import { useRouter } from 'next/navigation';

  // Mock the next/navigation module
  jest.mock('next/navigation', () => ({
      useRouter: jest.fn()
  }));

  describe('RegisterForm', () => {
      const mockRouter = {
          push: jest.fn()
      };

      beforeEach(() => {
          (useRouter as jest.Mock).mockReturnValue(mockRouter);
      });

      it('handles form submission correctly', async () => {
          global.fetch = jest.fn(() =>
              Promise.resolve({
                  ok: true,
                  json: () => Promise.resolve({ message: 'Registration successful' })
              })
          ) as jest.Mock;

          const { getByLabelText, getByText } = render(<RegisterForm />);

          // Fill in the form
          fireEvent.change(getByLabelText(/full name/i), { target: { value: 'Test User' } });
          fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
          fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });
          fireEvent.change(getByLabelText(/phone number/i), { target: { value: '1234567890' } });

          // Submit the form
          fireEvent.click(getByText(/register/i));

          await waitFor(() => {
              expect(mockRouter.push).toHaveBeenCalledWith('/login');
          });
      });

      it('should render all form fields', () => {
          const { getByLabelText } = render(<RegisterForm />);
        
          expect(getByLabelText(/full name/i)).toBeInTheDocument();
          expect(getByLabelText(/email/i)).toBeInTheDocument();
          expect(getByLabelText(/password/i)).toBeInTheDocument();
          expect(getByLabelText(/phone number/i)).toBeInTheDocument();
      });
  });
