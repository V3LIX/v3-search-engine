import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface AuthScreenProps {
  onAuthSuccess: (user: any) => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Mock authentication for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: 'mobile_user_' + Date.now(),
        email: formData.email,
        firstName: formData.firstName || 'Mobile',
        lastName: formData.lastName || 'User',
        profileImageUrl: null,
      };
      
      onAuthSuccess(mockUser);
    } catch (error) {
      Alert.alert('Error', 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: string) => {
    try {
      setIsLoading(true);
      
      // Mock social authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: `${provider}_user_` + Date.now(),
        email: `user@${provider}.com`,
        firstName: 'Social',
        lastName: 'User',
        profileImageUrl: null,
      };
      
      onAuthSuccess(mockUser);
    } catch (error) {
      Alert.alert('Error', `${provider} authentication failed`);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>V3</Text>
              </View>
            </View>
          </View>

          {/* Auth Form */}
          <View style={styles.formContainer}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, isLogin && styles.activeTab]}
                onPress={() => setIsLogin(true)}
              >
                <Text style={[styles.tabText, isLogin && styles.activeTabText]}>
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, !isLogin && styles.activeTab]}
                onPress={() => setIsLogin(false)}
              >
                <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialAuth('google')}
                disabled={isLoading}
              >
                <Ionicons name="logo-google" size={20} color="#4285F4" />
                <Text style={styles.socialButtonText}>
                  {isLogin ? 'Sign in' : 'Sign up'} with Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialAuth('apple')}
                disabled={isLoading}
              >
                <Ionicons name="logo-apple" size={20} color="#000" />
                <Text style={styles.socialButtonText}>
                  {isLogin ? 'Sign in' : 'Sign up'} with Apple
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with email</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Email Form */}
            <View style={styles.inputContainer}>
              {!isLogin && (
                <>
                  <View style={styles.nameRow}>
                    <View style={styles.nameField}>
                      <Text style={styles.label}>First Name</Text>
                      <TextInput
                        style={[styles.input, errors.firstName && styles.inputError]}
                        placeholder="First name"
                        value={formData.firstName}
                        onChangeText={(value) => updateFormData('firstName', value)}
                        autoCapitalize="words"
                      />
                      {errors.firstName && (
                        <Text style={styles.errorText}>{errors.firstName}</Text>
                      )}
                    </View>
                    <View style={styles.nameField}>
                      <Text style={styles.label}>Last Name</Text>
                      <TextInput
                        style={[styles.input, errors.lastName && styles.inputError]}
                        placeholder="Last name"
                        value={formData.lastName}
                        onChangeText={(value) => updateFormData('lastName', value)}
                        autoCapitalize="words"
                      />
                      {errors.lastName && (
                        <Text style={styles.errorText}>{errors.lastName}</Text>
                      )}
                    </View>
                  </View>
                </>
              )}

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChangeText={(value) => updateFormData('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.passwordInput, errors.password && styles.inputError]}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChangeText={(value) => updateFormData('password', value)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {!isLogin && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    style={[styles.input, errors.confirmPassword && styles.inputError]}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChangeText={(value) => updateFormData('confirmPassword', value)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  {errors.confirmPassword && (
                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                  )}
                </View>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  tagline: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#111827',
    fontWeight: '600',
  },
  socialContainer: {
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#6b7280',
  },
  inputContainer: {
    gap: 16,
    marginBottom: 24,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameField: {
    flex: 1,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingRight: 48,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 4,
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});