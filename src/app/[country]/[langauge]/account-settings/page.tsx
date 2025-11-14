"use client";

import { useState } from "react";
import {
  User,
  Shield,
  CreditCard,
  Lock,
  LogOut,
  Save,
  Trash2,
  Bell,
  Globe,
  Upload, // Changed from Mail, ChevronRight for better relevance
  Edit, // Used for edit button
  X, // Used for remove button
  CheckCircle, // For status icons
} from "lucide-react";

// --- Color Palette from Home Page (Slightly adjusted for depth) ---
const primaryBlue = "#014f86"; // Dark Blue for main accent (Primary)
const secondaryBlue = "#2a6f97"; // Mid Blue for features/stats (Secondary)
const tertiaryBlue = "#61a5c2"; // Light Blue for lighter accents/hovers
const neutralBg = "bg-gray-50"; // Light Gray/Off-White for background
const darkText = "text-gray-900";

// Tailwind Class mapping for dynamic use
const primaryBg = `bg-[${primaryBlue}]`;
const primaryText = `text-[${primaryBlue}]`;
const primaryHoverBg = `hover:bg-[${secondaryBlue}]`;
const accentBorder = `border-[${tertiaryBlue}]`;

// --- Utility Components ---

const SettingsMenuItem = ({ icon: Icon, title, isSelected, onClick }: any) => {
  const baseClasses =
    "flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200";
  // Enhanced selection style with subtle shadow and darker primary color
  const selectedClasses = `bg-white shadow-xl ${primaryText} font-extrabold border-l-4 border-[${primaryBlue}]`;
  const defaultClasses = "text-gray-600 hover:bg-gray-100 hover:text-gray-800";

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${
        isSelected ? selectedClasses : defaultClasses
      } transform hover:scale-[1.01]`}
    >
      <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
      <span>{title}</span>
    </div>
  );
};

const SettingsSectionCard = ({ children, title, subtitle }: any) => (
  // Enhanced shadow and rounded corners
  <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
    <h3 className={`text-3xl font-extrabold ${darkText} mb-2`}>{title}</h3>
    <p className="text-gray-500 mb-8 border-b border-gray-100 pb-4">
      {subtitle}
    </p>
    {children}
  </div>
);

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  // Add a readOnly prop to control its state
  readOnly = true, // Default to true for your static fields
}: any) => (
  <div>
    <label className="block text-sm font-semibold text-gray-800 mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      // *** ADD THIS LINE ***
      readOnly={readOnly}
      // ... rest of the classes
    />
  </div>
);

const PrimaryButton = ({ children, onClick, icon: Icon = Save }: any) => (
  // Enhanced shadow and hover effect
  <button
    onClick={onClick}
    className={`flex items-center justify-center px-8 py-3 ${primaryBg} text-white font-bold rounded-xl ${primaryHoverBg} transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5`}
  >
    <Icon className="w-5 h-5 mr-2" />
    {children}
  </button>
);

const DangerButton = ({ children, onClick, icon: Icon = Trash2 }: any) => (
  // Enhanced shadow and hover effect
  <button
    onClick={onClick}
    className="flex items-center justify-center px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
  >
    <Icon className="w-5 h-5 mr-2" />
    {children}
  </button>
);

// --- Settings Page Sections ---

const ProfileSettings = () => (
  <SettingsSectionCard
    title="Public Profile"
    subtitle="Update your photo, name, and location."
  >
    <div className="space-y-8">
      <div className="flex items-center space-x-8">
        {/* Enhanced Avatar and border */}
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-2xl font-bold border-4 border-white shadow-lg overflow-hidden flex-shrink-0">
          <span className={primaryText}>JD</span>
        </div>
        <div>
          <button
            className={`flex items-center px-5 py-2 text-sm font-medium rounded-xl border ${accentBorder} ${primaryText} hover:bg-gray-50 transition-colors duration-200 shadow-sm`}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload New Photo
          </button>
          <p className="text-xs text-gray-500 mt-2">
            PNG or JPG up to 5MB. Must be a square.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        <InputField label="Full Name" value="John Doe" />
        <InputField
          label="Email Address"
          type="email"
          value="john.doe@example.com"
        />
      </div>

      <InputField label="Location" value="New York, USA" />

      <div className="pt-6 flex justify-end border-t border-gray-100">
        <PrimaryButton>Save Profile Changes</PrimaryButton>
      </div>
    </div>
  </SettingsSectionCard>
);

const SecuritySettings = () => (
  <SettingsSectionCard
    title="Security & Access"
    subtitle="Manage your password and two-factor authentication."
  >
    <div className="space-y-8">
      <h4 className={`text-xl font-bold ${darkText}`}>Change Password</h4>
      <div className="grid sm:grid-cols-3 gap-8">
        <InputField
          label="Current Password"
          type="password"
          placeholder="********"
        />
        <InputField
          label="New Password"
          type="password"
          placeholder="********"
        />
        <InputField
          label="Confirm New Password"
          type="password"
          placeholder="********"
        />
      </div>

      <div className="pt-4 flex justify-start">
        <PrimaryButton icon={Lock}>Update Password</PrimaryButton>
      </div>

      <div className="border-t border-gray-100 pt-8 mt-8">
        <h4 className={`text-xl font-bold ${darkText} mb-4`}>
          Two-Factor Authentication (2FA)
        </h4>
        <div className="flex justify-between items-center bg-gray-50 p-5 rounded-xl border border-gray-200">
          <p className="text-gray-700 flex items-center font-medium">
            <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
            2FA is currently **Enabled**.
          </p>
          <button
            className={`px-5 py-2 text-sm font-medium rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors`}
          >
            Manage 2FA Settings
          </button>
        </div>
      </div>
    </div>
  </SettingsSectionCard>
);

const BillingSettings = () => (
  <SettingsSectionCard
    title="Billing & Plan"
    subtitle="View and manage your subscription plan and payment methods."
  >
    <div className="space-y-8">
      <h4 className={`text-xl font-bold ${darkText}`}>Current Subscription</h4>
      {/* Enhanced Plan Card */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border-l-8 border-[${secondaryBlue}] flex justify-between items-center shadow-md">
        <div>
          <p className="text-2xl font-extrabold text-blue-900">Pro Plan</p>
          <p className="text-blue-700 text-lg mt-1">
            $49/month (Billed Annually)
          </p>
          <p className="text-sm text-blue-500 mt-2">
            Next invoice: December 1, 2025
          </p>
        </div>
        <button
          className={`px-5 py-2 text-base font-semibold rounded-xl text-white ${primaryBg} ${primaryHoverBg} shadow-lg`}
        >
          Upgrade / Change Plan
        </button>
      </div>

      <div className="border-t border-gray-100 pt-8 mt-8">
        <h4 className={`text-xl font-bold ${darkText} mb-4`}>
          Payment Methods
        </h4>
        {/* Payment Method Item */}
        <div className="flex justify-between items-center bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-gray-700 font-medium">
            <CreditCard className="w-5 h-5 mr-3 inline text-gray-500" />
            Visa ending in 4242 (Expires 12/28)
          </p>
          <div className="flex space-x-3">
            <button
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-xl text-white ${secondaryBlue} hover:bg-blue-800 transition-colors`}
            >
              <Edit className="w-4 h-4 mr-1" /> Edit
            </button>
            <button className="flex items-center px-4 py-2 text-sm font-medium rounded-xl text-red-600 border border-red-200 hover:bg-red-100 transition-colors">
              <X className="w-4 h-4 mr-1" /> Remove
            </button>
          </div>
        </div>
        <div className="mt-6">
          <button
            className={`flex items-center font-semibold ${primaryText} text-base hover:text-[${secondaryBlue}] transition-colors`}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Add New Payment Method
          </button>
        </div>
      </div>
    </div>
  </SettingsSectionCard>
);

const navItems = [
  { id: "profile", icon: User, label: "My Profile" },
  { id: "security", icon: Shield, label: "Security" },
  { id: "billing", icon: CreditCard, label: "Billing" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  //   { id: "preferences", icon: Globe, label: "Preferences" },
];

const SettingsPage = () => {
  // Removed useTranslations hook
  const [activeSection, setActiveSection] = useState("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSettings />;
      case "security":
        return <SecuritySettings />;
      case "billing":
        return <BillingSettings />;
      // Add other sections here later if needed
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className={`py-16 ${neutralBg} min-h-screen font-sans`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Larger, bolder text */}
        <div className="mb-14">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Account Settings ⚙️
          </h1>
          <p className="text-xl text-gray-500">
            Manage your personal information, security, and billing details.
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation - Sticky and enhanced shadow */}
          <nav className="lg:w-[280px] p-4 bg-white rounded-3xl shadow-2xl border border-gray-100 h-max sticky top-8 flex-shrink-0">
            <div className="space-y-3">
              {navItems.map((item) => (
                <SettingsMenuItem
                  key={item.id}
                  icon={item.icon}
                  title={item.label}
                  isSelected={activeSection === item.id}
                  onClick={() => setActiveSection(item.id)}
                />
              ))}
            </div>

            {/* Logout/Danger Zone - Clear visual separation */}
            <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex items-center p-3 text-red-600 font-semibold rounded-xl hover:bg-red-50 cursor-pointer transition-colors duration-200">
                <LogOut className="w-5 h-5 mr-3" />
                <span>Log Out</span>
              </div>
              {/* Removed Delete Account from menu to push it only to Danger Zone Card */}
            </div>
          </nav>

          {/* Main Content Area - Wider for content */}
          <main className="lg:flex-grow space-y-12">
            {renderSection()}

            {/* Danger Zone: Example of a separate section */}
            <SettingsSectionCard
              title="Danger Zone ⚠️"
              subtitle="Actions that are irreversible and should be taken with caution."
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border border-red-400 rounded-xl bg-red-50">
                <div className="mb-4 sm:mb-0">
                  <h4 className="text-xl font-bold text-red-800 mb-1">
                    Permanently Delete Account
                  </h4>
                  <p className="text-red-700 font-medium max-w-lg">
                    This action cannot be undone. All your data will be
                    immediately and permanently removed.
                  </p>
                </div>
                <DangerButton>Delete My Account</DangerButton>
              </div>
            </SettingsSectionCard>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
