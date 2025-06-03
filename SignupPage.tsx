import React, { useState } from 'react';
import { LucideUser, LucideLock, LucideFingerprint, LucideCalendar, LucideCheckCircle2 } from 'lucide-react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { isValidAadhar, isValidDOB, isValidUsername, isValidPassword } from '../utils/validation';
import { useUser } from '../context/UserContext';

interface SignupPageProps {
  onNavigateToLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onNavigateToLogin }) => {
  const { signup } = useUser();
  const [formData, setFormData] = useState({
    aadharNumber: '',
    dob: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<{
    aadhar?: string;
    dob?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const [isLoading, setIsLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    // Validate inputs
    let newErrors: { [key: string]: string } = {};
    let hasErrors = false;
    
    if (!formData.aadharNumber) {
      newErrors.aadhar = 'Aadhar number is required';
      hasErrors = true;
    } else if (!isValidAadhar(formData.aadharNumber)) {
      newErrors.aadhar = 'Please enter a valid 12-digit Aadhar number';
      hasErrors = true;
    }
    
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
      hasErrors = true;
    } else if (!isValidDOB(formData.dob)) {
      newErrors.dob = 'You must be at least 18 years old';
      hasErrors = true;
    }
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
      hasErrors = true;
    } else if (!isValidUsername(formData.username)) {
      newErrors.username = 'Username must be 3-30 characters and can contain letters, numbers, and underscores';
      hasErrors = true;
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
      hasErrors = true;
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with letters and numbers';
      hasErrors = true;
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      hasErrors = true;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    // Simulate registration process
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setRegistrationComplete(true);
      signup(formData.aadharNumber, formData.username);
      
      // Auto-redirect to login after showing success message
      setTimeout(() => {
        onNavigateToLogin();
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="e-Governance Portal" />
      
      <main className="flex-grow flex items-center justify-center p-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full border border-gray-200">
          <div className="bg-blue-800 p-4 text-white text-center">
            <h2 className="text-xl font-bold">Citizen Registration</h2>
            <p className="text-sm text-blue-100 mt-1">Create your Government Services Account</p>
          </div>
          
          <div className="p-6">
            {registrationComplete ? (
              <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <LucideCheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Registration Successful!</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your account has been created successfully. You will be redirected to the login page shortly.
                </p>
                <Button
                  onClick={onNavigateToLogin}
                  variant="primary"
                >
                  Proceed to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <FormInput
                  label="Aadhar Number"
                  type="text"
                  name="aadharNumber"
                  placeholder="Enter your 12-digit Aadhar number"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  error={errors.aadhar}
                  icon={<LucideFingerprint className="h-5 w-5 text-gray-400" />}
                  maxLength={12}
                />
                
                <FormInput
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  error={errors.dob}
                  icon={<LucideCalendar className="h-5 w-5 text-gray-400" />}
                />
                
                <FormInput
                  label="Username"
                  type="text"
                  name="username"
                  placeholder="Create a username"
                  value={formData.username}
                  onChange={handleChange}
                  error={errors.username}
                  icon={<LucideUser className="h-5 w-5 text-gray-400" />}
                />
                
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  icon={<LucideLock className="h-5 w-5 text-gray-400" />}
                />
                
                <FormInput
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  icon={<LucideLock className="h-5 w-5 text-gray-400" />}
                />
                
                <div className="flex items-center mb-6">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                
                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                  className="mb-4"
                >
                  Register
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={onNavigateToLogin}
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Login Here
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignupPage;