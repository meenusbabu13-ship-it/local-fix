import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import {
    User, Mail, Lock, Phone, Briefcase, DollarSign, MapPin,
    FileText, Upload, X, CheckCircle, ChevronRight, ChevronLeft, Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';

const SERVICE_CATEGORIES = [
    { value: 'plumbing', label: 'Plumbing', icon: '🔧' },
    { value: 'electrical', label: 'Electrical', icon: '⚡' },
    { value: 'cleaning', label: 'Cleaning', icon: '🧹' },
    { value: 'carpentry', label: 'Carpentry', icon: '🪚' },
    { value: 'painting', label: 'Painting', icon: '🖌️' },
    { value: 'hvac', label: 'HVAC', icon: '❄️' },
    { value: 'landscaping', label: 'Landscaping', icon: '🌿' },
    { value: 'other', label: 'Other', icon: '🔩' },
];

const STEPS = ['Account Info', 'Service Details', 'Location & Coverage', 'Documents'];

export const ProviderRegister = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        serviceCategory: '',
        experience: '',
        pricing: '',
        address: '',
        coverageRadius: '',
        lat: '',
        lng: '',
        documents: [] as File[],
    });

    const set = (field: string, value: any) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const removeDocument = (idx: number) => {
        setForm((prev) => ({
            ...prev,
            documents: prev.documents.filter((_, i) => i !== idx),
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setForm((prev) => ({
            ...prev,
            documents: [...prev.documents, ...files].slice(0, 5), // max 5 docs
        }));
    };

    const validateStep = () => {
        setError('');
        if (step === 0) {
            if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword)
                return setError('All fields are required.'), false;
            if (form.password !== form.confirmPassword)
                return setError('Passwords do not match.'), false;
            if (form.password.length < 6)
                return setError('Password must be at least 6 characters.'), false;
        }
        if (step === 1) {
            if (!form.serviceCategory || !form.experience || !form.pricing)
                return setError('Please fill in all service details.'), false;
        }
        if (step === 2) {
            if (!form.address || !form.coverageRadius || !form.lat || !form.lng)
                return setError('Please fill in all location details.'), false;
        }
        return true;
    };

    const nextStep = () => {
        if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
    };

    const prevStep = () => setStep((s) => Math.max(s - 1, 0));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep()) return;
        setLoading(true);
        setError('');

        try {
            const payload = {
                role: 'provider',
                name: form.name,
                email: form.email,
                phone: form.phone,
                password: form.password,
                serviceCategory: form.serviceCategory,
                experience: form.experience,
                pricing: form.pricing,
                address: form.address,
                coverageRadius: form.coverageRadius,
                lat: form.lat,
                lng: form.lng,
                documents: form.documents.map((f) => f.name),
            };

            const res = await api.register(payload);

            if (res.success && res.pendingApproval) {
                setSuccess(true);
            } else {
                setError(res.message || 'Registration failed. Please try again.');
            }
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-dark-bg dark:via-dark-bg dark:to-slate-900 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-dark-card rounded-3xl shadow-2xl p-10 text-center max-w-md w-full border border-emerald-100 dark:border-emerald-500/20"
                >
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Application Submitted!</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-2">
                        Your provider registration has been received and is <span className="font-semibold text-amber-600">pending admin approval</span>.
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
                        You will be able to log in once an admin approves your application. This typically takes 1-2 business days.
                    </p>
                    <Button onClick={() => navigate('/login')} className="w-full">
                        Back to Login
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-dark-bg dark:via-dark-bg dark:to-slate-900 px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl"
            >
                <div className="bg-white dark:bg-dark-card rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-8 text-white">
                        <h1 className="text-2xl font-bold mb-1">Register as a Service Provider</h1>
                        <p className="text-violet-200 text-sm">
                            Fill in your details to apply. Admin will review and approve your application.
                        </p>

                        {/* Step Indicator */}
                        <div className="flex items-center gap-2 mt-6">
                            {STEPS.map((label, idx) => (
                                <React.Fragment key={idx}>
                                    <div className="flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${idx < step
                                            ? 'bg-white text-violet-600'
                                            : idx === step
                                                ? 'bg-white text-violet-600 ring-4 ring-violet-400/40'
                                                : 'bg-violet-500/50 text-violet-200'
                                            }`}>
                                            {idx < step ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                                        </div>
                                        <span className={`text-xs mt-1 font-medium hidden sm:block ${idx === step ? 'text-white' : 'text-violet-300'}`}>
                                            {label}
                                        </span>
                                    </div>
                                    {idx < STEPS.length - 1 && (
                                        <div className={`flex-1 h-0.5 rounded-full ${idx < step ? 'bg-white' : 'bg-violet-500/50'}`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Form Body */}
                    <form onSubmit={handleSubmit} className="p-8">
                        <AnimatePresence mode="wait">
                            {/* Step 0: Account Info */}
                            {step === 0 && (
                                <motion.div
                                    key="step0"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-5"
                                >
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Account Information</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <Input
                                            label="Full Name"
                                            placeholder="John Smith"
                                            value={form.name}
                                            onChange={(e) => set('name', e.target.value)}
                                            icon={<User className="w-4 h-4" />}
                                            required
                                        />
                                        <Input
                                            label="Email Address"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={form.email}
                                            onChange={(e) => set('email', e.target.value)}
                                            icon={<Mail className="w-4 h-4" />}
                                            required
                                        />
                                        <Input
                                            label="Phone Number"
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            value={form.phone}
                                            onChange={(e) => set('phone', e.target.value)}
                                            icon={<Phone className="w-4 h-4" />}
                                            required
                                        />
                                        <div /> {/* spacer */}
                                        <Input
                                            label="Password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={form.password}
                                            onChange={(e) => set('password', e.target.value)}
                                            icon={<Lock className="w-4 h-4" />}
                                            required
                                        />
                                        <Input
                                            label="Confirm Password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={form.confirmPassword}
                                            onChange={(e) => set('confirmPassword', e.target.value)}
                                            icon={<Lock className="w-4 h-4" />}
                                            required
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 1: Service Details */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Service Details</h2>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                                            Service Category <span className="text-red-500">*</span>
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {SERVICE_CATEGORIES.map((cat) => (
                                                <button
                                                    key={cat.value}
                                                    type="button"
                                                    onClick={() => set('serviceCategory', cat.value)}
                                                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all text-sm font-semibold ${form.serviceCategory === cat.value
                                                        ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300'
                                                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                                                        }`}
                                                >
                                                    <span className="text-2xl">{cat.icon}</span>
                                                    <span className="text-xs">{cat.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <Input
                                            label="Years of Experience"
                                            type="number"
                                            placeholder="e.g. 5"
                                            value={form.experience}
                                            onChange={(e) => set('experience', e.target.value)}
                                            icon={<Briefcase className="w-4 h-4" />}
                                            required
                                        />
                                        <Input
                                            label="Hourly Rate (USD)"
                                            type="number"
                                            placeholder="e.g. 75"
                                            value={form.pricing}
                                            onChange={(e) => set('pricing', e.target.value)}
                                            icon={<DollarSign className="w-4 h-4" />}
                                            required
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Location & Coverage */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-5"
                                >
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Location & Coverage</h2>
                                    <Input
                                        label="Full Address"
                                        placeholder="123 Main St, New York, NY 10001"
                                        value={form.address}
                                        onChange={(e) => set('address', e.target.value)}
                                        icon={<MapPin className="w-4 h-4" />}
                                        required
                                    />
                                    <Input
                                        label="Coverage Radius (km)"
                                        type="number"
                                        placeholder="e.g. 25"
                                        value={form.coverageRadius}
                                        onChange={(e) => set('coverageRadius', e.target.value)}
                                        icon={<Radio className="w-4 h-4" />}
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-5">
                                        <Input
                                            label="Latitude"
                                            type="number"
                                            step="any"
                                            placeholder="e.g. 40.7128"
                                            value={form.lat}
                                            onChange={(e) => set('lat', e.target.value)}
                                            icon={<MapPin className="w-4 h-4" />}
                                            required
                                        />
                                        <Input
                                            label="Longitude"
                                            type="number"
                                            step="any"
                                            placeholder="e.g. -74.0060"
                                            value={form.lng}
                                            onChange={(e) => set('lng', e.target.value)}
                                            icon={<MapPin className="w-4 h-4" />}
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">
                                        💡 You can find your coordinates using Google Maps — right-click on your location and copy the coordinates.
                                    </p>
                                </motion.div>
                            )}

                            {/* Step 3: Documents */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Upload Documents</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 -mt-2">
                                        Upload your certifications, licenses, or ID documents. (Up to 5 files, optional)
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-10 flex flex-col items-center gap-3 hover:border-violet-400 dark:hover:border-violet-500 transition-colors group"
                                    >
                                        <div className="w-14 h-14 bg-violet-50 dark:bg-violet-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Upload className="w-7 h-7 text-violet-500" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-semibold text-slate-700 dark:text-slate-300">Click to upload documents</p>
                                            <p className="text-xs text-slate-400 mt-1">PDF, PNG, JPG up to 10MB each</p>
                                        </div>
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        multiple
                                        accept=".pdf,.png,.jpg,.jpeg"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />

                                    {form.documents.length > 0 && (
                                        <div className="space-y-2">
                                            {form.documents.map((file, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
                                                >
                                                    <FileText className="w-5 h-5 text-violet-500 shrink-0" />
                                                    <span className="flex-1 text-sm text-slate-700 dark:text-slate-300 truncate">{file.name}</span>
                                                    <span className="text-xs text-slate-400">{(file.size / 1024).toFixed(0)} KB</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeDocument(idx)}
                                                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg text-red-400 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Summary Review */}
                                    <div className="mt-4 p-5 bg-violet-50 dark:bg-violet-500/10 rounded-2xl border border-violet-100 dark:border-violet-500/20 space-y-2 text-sm">
                                        <h3 className="font-bold text-violet-800 dark:text-violet-300 mb-3">Application Summary</h3>
                                        <div className="grid grid-cols-2 gap-y-1 text-slate-600 dark:text-slate-400">
                                            <span className="font-medium">Name:</span><span>{form.name}</span>
                                            <span className="font-medium">Email:</span><span>{form.email}</span>
                                            <span className="font-medium">Phone:</span><span>{form.phone}</span>
                                            <span className="font-medium">Category:</span>
                                            <span className="capitalize">{form.serviceCategory}</span>
                                            <span className="font-medium">Experience:</span><span>{form.experience} yrs</span>
                                            <span className="font-medium">Rate:</span><span>${form.pricing}/hr</span>
                                            <span className="font-medium">Coverage:</span><span>{form.coverageRadius} km</span>
                                            <span className="font-medium">Documents:</span><span>{form.documents.length} file(s)</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Error */}
                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={prevStep}
                                disabled={step === 0}
                                className="flex items-center gap-2"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back
                            </Button>

                            {step < STEPS.length - 1 ? (
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex items-center gap-2"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    isLoading={loading}
                                    className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600"
                                >
                                    Submit Application
                                    <CheckCircle className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </form>

                    <div className="px-8 pb-8 text-center text-sm text-gray-500">
                        Already registered?{' '}
                        <Link to="/login" className="text-violet-600 hover:underline font-semibold">
                            Sign in
                        </Link>
                        {' '}·{' '}
                        <Link to="/signup" className="text-primary hover:underline font-medium">
                            Register as User
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
