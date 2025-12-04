// AddressCard.tsx - Updated
import {
  Phone,
  MapPin,
  Clock,
  Edit,
  CheckCircle,
  Trash2,
  Loader2,
  Compass,
  Home,
  Building,
  Package,
  ChevronRight,
  Star,
} from "lucide-react";
import { Address } from "./type";

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
  isDeleting: boolean;
}

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  isDeleting,
}: AddressCardProps) {
  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home size={20} className="text-emerald-600" />;
      case "office":
        return <Building size={20} className="text-blue-600" />;
      default:
        return <Package size={20} className="text-purple-600" />;
    }
  };

  const getAddressTypeColor = (type: string) => {
    switch (type) {
      case "home":
        return "bg-gradient-to-br from-emerald-50/80 to-emerald-50/20 border-emerald-100";
      case "office":
        return "bg-gradient-to-br from-blue-50/80 to-blue-50/20 border-blue-100";
      default:
        return "bg-gradient-to-br from-purple-50/80 to-purple-50/20 border-purple-100";
    }
  };

  const getMapUrl = (address: Address) => {
    if (address.latitude && address.longitude) {
      return `https://www.google.com/maps?q=${address.latitude},${address.longitude}`;
    }
    const addressString = `${address.addressLine1}, ${address.city}, ${address.area}, ${address.postalCode}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      addressString
    )}`;
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-300 to-blue-300 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
      <div
        className={`relative bg-white rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
          address.isDefault
            ? "border-emerald-300 shadow-emerald-100/50"
            : "border-gray-100"
        }`}
      >
        {/* Glow effect for default address */}
        {address.isDefault && (
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/5 rounded-full -translate-y-12 translate-x-12 blur-xl"></div>
        )}

        <div className={`p-6 ${getAddressTypeColor(address.type)}`}>
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-white/50">
                {getAddressTypeIcon(address.type)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  {address.fullName}
                </h4>
                <span className="text-sm text-gray-600 capitalize font-medium bg-white/50 px-2.5 py-0.5 rounded-full">
                  {address.type}
                </span>
              </div>
            </div>
            {address.isDefault && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200 shadow-sm">
                <Star size={12} className="fill-emerald-500 text-emerald-500" />
                Default
              </span>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/80 rounded-lg border border-gray-100">
                <Phone size={16} className="text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {address.phone}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/80 rounded-lg border border-gray-100">
                <MapPin size={16} className="text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {address.addressLine1}
                </p>
                {address.addressLine2 && (
                  <p className="text-sm text-gray-600 mt-1">
                    {address.addressLine2}
                  </p>
                )}
                <p className="text-sm text-gray-600 mt-1">
                  {address.city}, {address.area} {address.postalCode}
                </p>
                {address.latitude && address.longitude && (
                  <a
                    href={getMapUrl(address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-semibold mt-3 px-3 py-1.5 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    <Compass size={12} />
                    View on Map
                    <ChevronRight size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="p-1.5 bg-gray-50 rounded-lg">
                <Clock size={12} />
              </div>
              <span className="font-medium">
                Updated {new Date(address.updatedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(address)}
                className="p-2.5 text-gray-600 hover:text-emerald-600 hover:bg-gradient-to-br from-emerald-50 to-white rounded-lg transition-all duration-200 hover:shadow-sm"
                title="Edit address"
              >
                <Edit size={18} />
              </button>
              {!address.isDefault && (
                <button
                  onClick={() => onSetDefault(address.id)}
                  className="p-2.5 text-gray-600 hover:text-emerald-600 hover:bg-gradient-to-br from-emerald-50 to-white rounded-lg transition-all duration-200 hover:shadow-sm"
                  title="Set as default"
                >
                  <CheckCircle size={18} />
                </button>
              )}
              <button
                onClick={() => onDelete(address.id)}
                disabled={isDeleting}
                className="p-2.5 text-gray-600 hover:text-rose-600 hover:bg-gradient-to-br from-rose-50 to-white rounded-lg transition-all duration-200 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                title="Delete address"
              >
                {isDeleting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Trash2 size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
