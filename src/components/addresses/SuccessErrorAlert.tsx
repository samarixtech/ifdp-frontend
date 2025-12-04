import { CheckCircle, XCircle } from "lucide-react";

interface SuccessErrorAlertProps {
  success: {
    show: boolean;
    message: string;
  };
  error: string;
  onErrorDismiss: () => void;
}

export default function SuccessErrorAlert({
  success,
  error,
  onErrorDismiss,
}: SuccessErrorAlertProps) {
  return (
    <>
      {success.show && (
        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-4 animate-in fade-in">
          <div className="p-2.5 bg-emerald-100 rounded-lg">
            <CheckCircle className="text-emerald-700" size={20} />
          </div>
          <div>
            <p className="font-semibold text-emerald-900">{success.message}</p>
          </div>
        </div>
      )}

      {/* {error && (
        <div className="mb-8 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-4">
          <div className="p-2.5 bg-rose-100 rounded-lg">
            <XCircle className="text-rose-700" size={20} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-rose-900">
              Unable to process request
            </p>
            <p className="text-sm text-rose-700">{error}</p>
          </div>
          <button
            onClick={onErrorDismiss}
            className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg"
          >
            <XCircle size={18} />
          </button>
        </div>
      )} */}
    </>
  );
}
