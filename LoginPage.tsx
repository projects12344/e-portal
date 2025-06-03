import React, { useState } from 'react';
import { LucideUser, LucideLock, LucideFingerprint, LucideAlertCircle, LucideCheckCircle2 } from 'lucide-react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { isValidAadhar, isValidPassword } from '../utils/validation';
import { useUser } from '../context/UserContext';

interface LoginPageProps {
  onNavigateToSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigateToSignup }) => {
  const { login } = useUser();
  const [aadharNumber, setAadharNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ aadhar?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors and status
    setErrors({});
    setLoginStatus('idle');
    
    // Validate inputs
    let newErrors: { aadhar?: string; password?: string } = {};
    let hasErrors = false;
    
    if (!aadharNumber) {
      newErrors.aadhar = 'Aadhar number is required';
      hasErrors = true;
    } else if (!isValidAadhar(aadharNumber)) {
      newErrors.aadhar = 'Please enter a valid 12-digit Aadhar number';
      hasErrors = true;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      hasErrors = true;
    } else if (!isValidPassword(password)) {
      newErrors.password = 'Password must be at least 8 characters with letters and numbers';
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    // Simulate login process
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would validate against a backend
      if (aadharNumber === '123456789012' && password === 'Password123') {
        setLoginStatus('success');
        login(aadharNumber);
      } else {
        setLoginStatus('error');
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="e-Governance Portal" />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full border border-gray-200">
          <div className="bg-blue-800 p-4 text-white text-center">
            <h2 className="text-xl font-bold">Citizen Login</h2>
            <p className="text-sm text-blue-100 mt-1">Access Government Services</p>
          </div>
          
          <div className="p-6">
            {loginStatus === 'success' && (
              <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-md flex items-center">
                <LucideCheckCircle2 className="h-5 w-5 mr-2" />
                <span>Login successful! Redirecting to your dashboard...</span>
              </div>
            )}
            
            {loginStatus === 'error' && (
              <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md flex items-center">
                <LucideAlertCircle className="h-5 w-5 mr-2" />
                <span>Invalid Aadhar number or password. Please try again.</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <FormInput
                label="Aadhar Number"
                type="text"
                placeholder="Enter your 12-digit Aadhar number"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                error={errors.aadhar}
                icon={<LucideFingerprint className="h-5 w-5 text-gray-400" />}
                maxLength={12}
              />
              
              <FormInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                icon={<LucideLock className="h-5 w-5 text-gray-400" />}
              />
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                className="mb-4"
              >
                Login
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={onNavigateToSignup}
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Register Now
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;