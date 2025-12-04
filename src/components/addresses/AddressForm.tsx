import { useState, useEffect } from "react";
import { Home, Building, Package, X, Loader2 } from "lucide-react";
import AddressInputField from "./AddressInputField";
import { AddressFormData, FormErrors } from "./type";
import { useAutoLocation } from "@/hooks/useAutoLocation";

interface AddressFormProps {
  formData: AddressFormData;
  isEditing: string | null;
  isLoading: boolean;
  onSubmit: (data: AddressFormData) => void;
  onChange: (data: AddressFormData) => void;
  onCancel: () => void;
}

export default function AddressForm({
  formData,
  isEditing,
  isLoading,
  onSubmit,
  onChange,
  onCancel,
}: AddressFormProps) {
  const [errors, setErrors] = useState<FormErrors>({});
  const {
    city: autoCity,
    area: autoArea,
    latitude: autoLatitude,
    longitude: autoLongitude,
    postalCode: autoPostalCode,
    loading: isDetectingLocation,
    error: locationError,
  } = useAutoLocation();

  // Auto-fill form when location is detected (only for new addresses)
  useEffect(() => {
    if (!isEditing && !isDetectingLocation && !locationError) {
      const hasAutoData =
        autoCity || autoArea || autoLatitude || autoLongitude || autoPostalCode;
      const formHasData =
        formData.city ||
        formData.area ||
        formData.latitude ||
        formData.longitude ||
        formData.postalCode;

      // Only auto-fill if we have location data AND the form fields are empty
      if (hasAutoData && !formHasData) {
        const updatedData = {
          ...formData,
          city: autoCity || formData.city,
          area: autoArea || formData.area,
          postalCode: autoPostalCode || formData.postalCode,
          latitude: autoLatitude || formData.latitude,
          longitude: autoLongitude || formData.longitude,
        };

        onChange(updatedData);
        console.log("Auto-filled address fields from IP location");
      }
    }
  }, [
    isEditing,
    isDetectingLocation,
    locationError,
    autoCity,
    autoArea,
    autoLatitude,
    autoLongitude,
    autoPostalCode,
  ]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName?.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^\+?[\d\s()-]{10,20}$/.test((formData.phone || "").replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.addressLine1?.trim()) {
      newErrors.addressLine1 = "Address line 1 is required";
    }

    if (!formData.city?.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.area?.trim()) {
      newErrors.area = "Area is required";
    }

    if (!formData.postalCode?.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    const latitudeStr = formData.latitude || "";
    if (latitudeStr.trim() && !/^-?\d+(\.\d+)?$/.test(latitudeStr.trim())) {
      newErrors.latitude = "Please enter a valid latitude";
    }

    const longitudeStr = formData.longitude || "";
    if (longitudeStr.trim() && !/^-?\d+(\.\d+)?$/.test(longitudeStr.trim())) {
      newErrors.longitude = "Please enter a valid longitude";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    const updatedFormData = {
      ...formData,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value || "",
    };

    onChange(updatedFormData);

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTypeChange = (type: "home" | "office" | "other") => {
    onChange({ ...formData, type });
  };

  return (
    <div className="mb-10 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="border-b border-gray-100 px-8 py-6 bg-gradient-to-r from-emerald-50/50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {isEditing ? "Edit Address" : "Add New Address"}
            </h3>
            <p className="text-gray-600">
              Enter complete address details for accurate delivery
            </p>
          </div>
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-all"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <AddressInputField
            id="fullName"
            label="Full Name"
            value={formData.fullName}
            Icon={User}
            error={errors.fullName}
            disabled={isLoading}
            placeholder="Enter recipient full name"
            required
            handleChange={handleChange}
          />
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">
                Address Type
              </label>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                Select type
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["home", "office", "other"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    handleTypeChange(type as "home" | "office" | "other")
                  }
                  className={`
                    p-4 rounded-xl border-2 transition-all
                    ${
                      formData.type === type
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 hover:border-emerald-300"
                    }
                    flex flex-col items-center gap-2
                  `}
                >
                  {type === "home" ? (
                    <Home size={20} className="text-emerald-600" />
                  ) : type === "office" ? (
                    <Building size={20} className="text-blue-600" />
                  ) : (
                    <Package size={20} className="text-purple-600" />
                  )}
                  <span className="text-sm font-medium capitalize">{type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <AddressInputField
            id="phone"
            label="Phone Number"
            value={formData.phone}
            Icon={Phone}
            type="tel"
            error={errors.phone}
            disabled={isLoading}
            placeholder="+1 (555) 123-4567"
            required
            handleChange={handleChange}
          />
          <AddressInputField
            id="addressLine1"
            label="Address Line 1"
            value={formData.addressLine1}
            Icon={Home}
            error={errors.addressLine1}
            disabled={isLoading}
            placeholder="Street address, P.O. Box, company name"
            required
            handleChange={handleChange}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <AddressInputField
            id="addressLine2"
            label="Address Line 2 (Optional)"
            value={formData.addressLine2}
            Icon={Building}
            error={errors.addressLine2}
            disabled={isLoading}
            placeholder="Apartment, suite, unit, building, floor, etc."
            handleChange={handleChange}
          />
          <div className="relative">
            <AddressInputField
              id="city"
              label="City"
              value={formData.city}
              Icon={Navigation}
              error={errors.city}
              disabled={isLoading}
              placeholder="City name"
              required
              handleChange={handleChange}
            />
            {formData.city && formData.city === autoCity && (
              <div className="absolute -top-2 right-4">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                  Auto-detected
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="relative">
            <AddressInputField
              id="area"
              label="State"
              value={formData.area}
              Icon={Map}
              error={errors.area}
              disabled={isLoading}
              placeholder="Area/Neighborhood"
              required
              handleChange={handleChange}
            />
            {formData.area && formData.area === autoArea && (
              <div className="absolute -top-2 right-4">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                  Auto-detected
                </span>
              </div>
            )}
          </div>
          <div className="relative">
            <AddressInputField
              id="postalCode"
              label="Postal Code"
              value={formData.postalCode}
              Icon={Package}
              error={errors.postalCode}
              disabled={isLoading}
              placeholder="ZIP or postal code"
              required
              handleChange={handleChange}
            />
            {formData.postalCode && formData.postalCode === autoPostalCode && (
              <div className="absolute -top-2 right-4">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                  Auto-detected
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="relative">
            <AddressInputField
              id="latitude"
              label="Latitude"
              value={formData.latitude}
              Icon={Compass}
              type="number"
              step="any"
              error={errors.latitude}
              disabled={isLoading}
              placeholder="37.7749"
              handleChange={handleChange}
              //   description="Auto-detected from your IP"
            />
            {formData.latitude && formData.latitude === autoLatitude && (
              <div className="absolute -top-2 right-4">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                  Auto-detected
                </span>
              </div>
            )}
          </div>
          <div className="relative">
            <AddressInputField
              id="longitude"
              label="Longitude"
              value={formData.longitude}
              Icon={Compass}
              type="number"
              step="any"
              error={errors.longitude}
              disabled={isLoading}
              placeholder="-122.4194"
              handleChange={handleChange}
              //   description="Auto-detected from your IP"
            />
            {formData.longitude && formData.longitude === autoLongitude && (
              <div className="absolute -top-2 right-4">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                  Auto-detected
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              disabled={isLoading}
              className="w-5 h-5 text-emerald-600 bg-white border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
            />
            <div>
              <label
                htmlFor="isDefault"
                className="font-semibold text-gray-900"
              >
                Set as default address
              </label>
              <p className="text-sm text-gray-600">
                Use this address for all future orders
              </p>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {isEditing ? "Updating..." : "Adding..."}
              </>
            ) : (
              <>{isEditing ? "Update Address" : "Add Address"}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// Import Lucide icons
import { User, Phone, Navigation, Map, Compass } from "lucide-react";
