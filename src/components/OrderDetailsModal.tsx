// components/OrderDetailsModal.tsx
import {
  X,
  MapPin,
  Clock,
  Star,
  RefreshCw,
  Receipt,
  ShoppingBag,
  Package,
  Calendar,
} from "lucide-react";

// Re-defining the PastOrder interface for self-containment/reusability
interface PastOrder {
  id: string;
  restaurant: string;
  image: string;
  date: string;
  items: string;
  total: string;
  status: "Delivered" | "Cancelled" | "On the way";
  rating: number;
}

interface OrderDetailsModalProps {
  order: PastOrder | null;
  onClose: () => void;
}

// Helper function to format the items string into a structured list
const parseItemsToReceipt = (
  itemsString: string
): { name: string; quantity: number; price: number }[] => {
  // Example logic: "2x Spicy Tuna Roll ($20.00), 1x Miso Soup ($5.00)"
  // The current mock data only provides a single string with no prices, so we'll simulate.

  // NOTE: In a real application, you would pass the itemized data directly from your backend/API.
  // We'll create a simple parser for the current mock data format: "2x Spicy Tuna Roll, 1x Miso Soup, 1x Edamame"

  const mockPrices = [12.5, 4.0, 6.5, 9.0, 15.0, 8.0]; // Simulated prices for mock items
  let priceIndex = 0;

  return itemsString.split(",").map((item) => {
    const trimmedItem = item.trim();
    const parts = trimmedItem.match(/(\d+)x\s+(.*)/i);

    let quantity = 1;
    let name = trimmedItem;

    if (parts && parts.length === 3) {
      quantity = parseInt(parts[1], 10);
      name = parts[2].trim();
    }

    // Cycle through mock prices
    const price = mockPrices[priceIndex % mockPrices.length];
    priceIndex++;

    return {
      name,
      quantity,
      price: parseFloat(price.toFixed(2)), // Use a base price for calculation
    };
  });
};

export default function OrderDetailsModal({
  order,
  onClose,
}: OrderDetailsModalProps) {
  if (!order) return null;

  const itemizedReceipt = parseItemsToReceipt(order.items);
  const subtotal = itemizedReceipt.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const deliveryFee = 3.5;
  const serviceFee = parseFloat((subtotal * 0.05).toFixed(2));
  const totalDue = parseFloat((subtotal + deliveryFee + serviceFee).toFixed(2));

  // Determine color for the status badge
  const statusColor =
    order.status === "Delivered"
      ? "bg-green-100 text-green-700"
      : order.status === "Cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-blue-100 text-blue-700";

  return (
    // Modal Backdrop
    <div
      className="fixed inset-0 z-50 bg-black/40 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transition-transform duration-300 transform scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        aria-labelledby="modal-title"
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center z-10">
          <h3
            id="modal-title"
            className="text-xl font-semibold text-gray-900 flex items-center gap-2"
          >
            <Receipt size={24} className="text-blue-600" />
            Order #{order.id}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Order Summary Card */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
            <div className="flex items-center gap-4">
              <img
                src={order.image}
                alt={order.restaurant}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-gray-900 truncate">
                  {order.restaurant}
                </h4>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-0.5">
                  <Calendar size={14} className="flex-shrink-0" />
                  <time>{order.date}</time>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <div className="font-medium text-gray-700">Order Status:</div>
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${statusColor}`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-base font-bold text-gray-900">
              <span>Total Paid:</span>
              <span>{order.total}</span>
            </div>
          </div>

          {/* Itemized Receipt */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Package size={20} className="text-blue-500" />
              Items Ordered
            </h4>
            <ul className="space-y-2 text-sm">
              {itemizedReceipt.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b border-dashed border-gray-200 pb-1 last:border-b-0"
                >
                  <span className="text-gray-700 truncate">
                    {item.quantity} x {item.name}
                  </span>
                  <span className="text-gray-900 font-medium">
                    ${(item.quantity * item.price).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fee Breakdown (Simulated) */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Service Fee (5%)</span>
              <span>${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-dashed border-gray-300 font-bold text-lg text-gray-900">
              <span>Total</span>
              {/* NOTE: Total might slightly differ from the mock data's `order.total` due to mock item price simulation */}
              <span>${totalDue.toFixed(2)}</span>
            </div>
          </div>

          {/* Action and Rating */}
          <div className="pt-4 space-y-4 border-t border-gray-100">
            <h4 className="text-lg font-semibold text-gray-800">
              Your Experience
            </h4>
            {order.status === "Delivered" && order.rating > 0 ? (
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < order.rating ? "currentColor" : "none"}
                    className={
                      i < order.rating ? "text-amber-500" : "text-gray-300"
                    }
                  />
                ))}
                <span className="ml-2 text-base font-medium text-gray-700">
                  ({order.rating} / 5 Rating)
                </span>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No rating provided for this order.
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-1">
                <RefreshCw size={14} />
                Reorder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
