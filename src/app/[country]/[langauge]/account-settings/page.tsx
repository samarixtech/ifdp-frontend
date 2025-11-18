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
  Upload,
  Edit,
  X,
  CheckCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";

//  Color Palette
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

// TYPE INTERFACES FOR UTILITY COMPONNETS

// for meny
interface IMenu {
  icon: React.ElementType;
  title?: string;
  isSelected?: boolean;
  onClick: () => void;
}

// for section cards
interface ISecCards {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

// for input fields
interface Iinput {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
}

// for buttons
interface IButton {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ElementType;
}

// UTILITY COMPONENTS

const SettingsMenuItem = ({
  icon: Icon,
  title,
  isSelected,
  onClick,
}: IMenu) => {
  const baseClasses =
    "flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200";

  const selectedClasses = `bg-white shadow-xl ${primaryText} font-extrabold border-l-4 border-[${primaryBlue}]`;
  const defaultClasses = "text-gray-600 hover:bg-gray-100 hover:text-gray-800";

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${
        isSelected ? selectedClasses : defaultClasses
      } transform hover:scale-[1.01]`}
    >
      <Icon className="w-5 h-5 mr-3 shrink-0" />
      <span>{title}</span>
    </div>
  );
};

const SettingsSectionCard = ({ children, title, subtitle }: ISecCards) => (
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
  readOnly = true,
}: Iinput) => (
  <div>
    <label className="block text-sm font-semibold text-gray-800 mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  </div>
);

const PrimaryButton = ({ children, onClick, icon: Icon = Save }: IButton) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center px-8 py-3 ${primaryBg} text-white font-bold rounded-xl ${primaryHoverBg} transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5`}
  >
    <Icon className="w-5 h-5 mr-2" />
    {children}
  </button>
);

const DangerButton = ({ children, onClick, icon: Icon = Trash2 }: IButton) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
  >
    <Icon className="w-5 h-5 mr-2" />
    {children}
  </button>
);

// Settings Page Sections
const ProfileSettings = ({ t }: { t: (key: string) => string }) => (
  <SettingsSectionCard
    title={t("profile.title")}
    subtitle={t("profile.subtitle")}
  >
    <div className="space-y-8">
      <div className="flex items-center space-x-8">
        {/* Avatar and border */}
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-2xl font-bold border-4 border-white shadow-lg overflow-hidden shrink-0">
          <span className={primaryText}>JD</span>
        </div>
        <div>
          <button
            className={`flex items-center px-5 py-2 text-sm font-medium rounded-xl border ${accentBorder} ${primaryText} hover:bg-gray-50 transition-colors duration-200 shadow-sm`}
          >
            <Upload className="w-4 h-4 mr-2" />
            {t("profile.upload_photo")}
          </button>
          <p className="text-xs text-gray-500 mt-2">
            {t("profile.upload_info")}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        <InputField label={t("profile.label_name")} value="John Doe" />
        <InputField
          label={t("profile.label_email")}
          type="email"
          value="john.doe@example.com"
        />
      </div>

      <InputField label={t("profile.label_location")} value="New York, USA" />

      <div className="pt-6 flex justify-end border-t border-gray-100">
        <PrimaryButton>{t("profile.button_save")}</PrimaryButton>
      </div>
    </div>
  </SettingsSectionCard>
);

const SecuritySettings = ({ t }: { t: (key: string) => string }) => (
  <SettingsSectionCard
    title={t("security.title")}
    subtitle={t("security.subtitle")}
  >
    <div className="space-y-8">
      <h4 className={`text-xl font-bold ${darkText}`}>
        {t("security.password_header")}
      </h4>
      <div className="grid sm:grid-cols-3 gap-8">
        <InputField
          label={t("security.label_current_pw")}
          type="password"
          placeholder="********"
        />
        <InputField
          label={t("security.label_new_pw")}
          type="password"
          placeholder="********"
        />
        <InputField
          label={t("security.label_confirm_pw")}
          type="password"
          placeholder="********"
        />
      </div>

      <div className="pt-4 flex justify-start">
        <PrimaryButton icon={Lock}>
          {t("security.button_update_pw")}
        </PrimaryButton>
      </div>

      <div className="border-t border-gray-100 pt-8 mt-8">
        <h4 className={`text-xl font-bold ${darkText} mb-4`}>
          {t("security.two_factor_header")}
        </h4>
        <div className="flex justify-between items-center bg-gray-50 p-5 rounded-xl border border-gray-200">
          <p className="text-gray-700 flex items-center font-medium">
            <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
            {t("security.two_factor_status")}
          </p>
          <button
            className={`px-5 py-2 text-sm font-medium rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors`}
          >
            {t("security.button_manage_2fa")}
          </button>
        </div>
      </div>
    </div>
  </SettingsSectionCard>
);

const BillingSettings = ({ t }: { t: (key: string) => string }) => (
  <SettingsSectionCard
    title={t("billing.title")}
    subtitle={t("billing.subtitle")}
  >
    <div className="space-y-8">
      <h4 className={`text-xl font-bold ${darkText}`}>
        {t("billing.subscription_header")}
      </h4>
      {/* Enhanced Plan Card */}
      <div className="bg-linear-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border-l-8 border-[${secondaryBlue}] flex justify-between items-center shadow-md">
        <div>
          <p className="text-2xl font-extrabold text-blue-900">
            {t("billing.pro_plan")}
          </p>
          <p className="text-blue-700 text-lg mt-1">{t("billing.plan_cost")}</p>
          <p className="text-sm text-blue-500 mt-2">
            Next invoice: December 1, 2025
          </p>
        </div>
        <button
          className={`px-5 py-2 text-base font-semibold rounded-xl text-white ${primaryBg} ${primaryHoverBg} shadow-lg`}
        >
          {t("billing.button_change_plan")}
        </button>
      </div>

      <div className="border-t border-gray-100 pt-8 mt-8">
        <h4 className={`text-xl font-bold ${darkText} mb-4`}>
          {t("billing.payment_method_header")}
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
              <Edit className="w-4 h-4 mr-1" /> {t("billing.button_edit")}
            </button>
            <button className="flex items-center px-4 py-2 text-sm font-medium rounded-xl text-red-600 border border-red-200 hover:bg-red-100 transition-colors">
              <X className="w-4 h-4 mr-1" /> {t("billing.button_remove")}
            </button>
          </div>
        </div>
        <div className="mt-6">
          <button
            className={`flex items-center font-semibold ${primaryText} text-base hover:text-[${secondaryBlue}] transition-colors`}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            {t("billing.button_add_new")}
          </button>
        </div>
      </div>
    </div>
  </SettingsSectionCard>
);

const SettingsPage = () => {
  const t = useTranslations("settings");
  const [activeSection, setActiveSection] = useState("profile");

  const navItems = [
    { id: "profile", icon: User, label: t("navigation.profile") },
    { id: "security", icon: Shield, label: t("navigation.security") },
    { id: "billing", icon: CreditCard, label: t("navigation.billing") },
    // { id: "notifications", icon: Bell, label: "Notifications" },
    // { id: "preferences", icon: Globe, label: "Preferences" },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSettings t={t} />;
      case "security":
        return <SecuritySettings t={t} />;
      case "billing":
        return <BillingSettings t={t} />;
      // ADD OTHER SECTIONS IF NEEDED
      default:
        return <ProfileSettings t={t} />;
    }
  };

  return (
    <div className={`py-16 ${neutralBg} min-h-screen font-sans`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-2 tracking-tight">
            {t("header")}
          </h1>
          <p className="text-xl text-gray-500">{t("subheader")}</p>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <nav className="lg:w-[280px] p-4 bg-white rounded-3xl shadow-2xl border border-gray-100 h-max sticky top-8 shrink-0">
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

            {/* Logout/Danger Zone */}
            <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex items-center p-3 text-red-600 font-semibold rounded-xl hover:bg-red-50 cursor-pointer transition-colors duration-200">
                <LogOut className="w-5 h-5 mr-3" />
                <span>{t("navigation.logout")}</span>
              </div>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="lg:grow space-y-12">
            {renderSection()}

            {/* Danger Zone: */}
            <SettingsSectionCard
              title={t("danger_zone.title")}
              subtitle={t("danger_zone.subtitle")}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border border-red-400 rounded-xl bg-red-50">
                <div className="mb-4 sm:mb-0">
                  <h4 className="text-xl font-bold text-red-800 mb-1">
                    {t("danger_zone.delete_header")}
                  </h4>
                  <p className="text-red-700 font-medium max-w-lg">
                    {t("danger_zone.delete_info")}
                  </p>
                </div>
                <DangerButton>{t("danger_zone.button_delete")}</DangerButton>
              </div>
            </SettingsSectionCard>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
