import { useRef, useEffect } from 'react';
import { LuTriangleAlert, LuX } from 'react-icons/lu';
import { useHeavyWasteDialog } from '../../hooks/useHeavyWasteDialog';
import { ActionButton } from '../atoms/buttons/ActionButton';
import { FaCheck } from 'react-icons/fa6';

interface HeavyWasteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HeavyWasteDialog({ isOpen, onClose }: HeavyWasteDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const {
    selectedTypes,
    selectedPercentage,
    toggleWasteType,
    setPercentage,
    handleConfirm,
    wasteTypes,
    percentageOptions,
    wasteTypeDescriptions,
    getHeavyWasteImage,
    getPercentageHelperText,
    showWarning,
    showSkipSizeInfo,
    canSubmit,
  } = useHeavyWasteDialog(isOpen);

  // Use keypress listener to close dialog with Escape
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle dialog confirmation including close
  const handleConfirmAndClose = () => {
    handleConfirm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto animate-fade-in">
      <div
        ref={dialogRef}
        className="bg-[#1C1C1C] rounded-lg w-full max-w-2xl my-4 flex flex-col"
        style={{ maxHeight: 'calc(100vh - 32px)' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="heavy-waste-title"
      >
        {/* Dialog Header */}
        <div className="p-6 border-b border-[#2A2A2A] flex-shrink-0 flex justify-between items-center">
          <h3
            id="heavy-waste-title"
            className="text-xl font-semibold text-white"
          >
            Heavy Waste Types
          </h3>
          <button
            onClick={onClose}
            className="cursor-pointer p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0037C1]/50"
            aria-label="Close dialog"
          >
            <LuX className="w-5 h-5" />
          </button>
        </div>

        {/* Dialog Content */}
        <div className="p-6 overflow-y-auto flex-grow">
          {/* Warning when percentage selected but no waste types */}
          {showWarning && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <LuTriangleAlert className="w-5 h-5 text-red-400 mt-1 shrink-0" />
                <div>
                  <p className="text-red-400 font-medium">
                    Waste Types Required
                  </p>
                  <p className="text-gray-300 mt-1">
                    Please select at least one waste type for your heavy waste.
                    This helps us determine the appropriate skip size for your
                    needs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Skip Size Restriction Info */}
          {showSkipSizeInfo && (
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <LuTriangleAlert className="w-5 h-5 text-yellow-500 mt-1 shrink-0" />
                <div>
                  <p className="text-yellow-500 font-medium">
                    Important Notice
                  </p>
                  <p className="text-gray-300 mt-1">
                    For safety reasons, heavy waste can only be disposed of in
                    skips up to 8 yards. Larger skips will not be available if
                    heavy waste is selected.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Waste Type Grid Selection */}
          <div className="mb-8">
            <h4 className="text-white font-medium mb-4">
              Select heavy waste types:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {wasteTypes.map((type) => {
                const imagePath = `/images/waste_optimized/${type.toLowerCase()}-waste.webp`;
                const isSelected = selectedTypes.includes(type);

                return (
                  <div
                    key={type}
                    onClick={() => toggleWasteType(type)}
                    className={`
                      relative overflow-hidden rounded-lg cursor-pointer transition-all
                      ${isSelected ? 'ring-2 ring-[#0037C1] border-[#0037C1]' : 'border border-[#2A2A2A] hover:border-[#0037C1]/50'}
                      ${isSelected ? 'scale-[1.02]' : ''}
                    `}
                  >
                    <div className="aspect-square">
                      <img
                        loading="lazy"
                        src={imagePath}
                        alt={`${type} waste`}
                        className="h-full w-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0037C1]/20">
                          <div className="rounded-full bg-[#0037C1] p-1.5 border-2 border-white">
                            <FaCheck className="text-white" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-[#2A2A2A] bg-[#1C1C1C] p-2">
                      <p className="text-sm text-white font-medium">{type}</p>
                      <p className="text-xs text-gray-400 line-clamp-2 break-words">
                        {wasteTypeDescriptions[type]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Percentage Selection */}
          <div>
            <h4 className="text-lg font-medium text-white mb-3">
              Select Percentage
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {percentageOptions.map((option) => {
                const isSelected = selectedPercentage === option;
                const isHeavyWaste = option !== 'No heavy waste';
                const imagePath = getHeavyWasteImage(option);

                return (
                  <div
                    key={option}
                    onClick={() => setPercentage(option)}
                    className={`
                      relative overflow-hidden rounded-lg cursor-pointer transition-all
                      ${isSelected ? 'ring-2 ring-[#0037C1] border-[#0037C1]' : 'border border-[#2A2A2A] hover:border-[#0037C1]/50'}
                      ${isSelected ? 'scale-[1.02]' : ''}
                    `}
                  >
                    <div className="aspect-square relative">
                      {!isHeavyWaste ? (
                        <div className="h-full w-full bg-[#1C1C1C] flex items-center justify-center">
                          <div className="rounded-full bg-[#2A2A2A] p-4">
                            <LuX className="h-8 w-8 text-gray-400" />
                          </div>
                        </div>
                      ) : (
                        <img
                          loading="lazy"
                          src={imagePath}
                          alt={`${option} visualization`}
                          className="h-full w-full object-cover"
                        />
                      )}

                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0037C1]/20">
                          <div className="rounded-full bg-[#0037C1] p-1.5 border-2 border-white">
                            <FaCheck className="text-white" />
                          </div>
                        </div>
                      )}

                      {/* Percentage badge */}
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium bg-[#1C1C1C]/80 text-white border border-[#2A2A2A]">
                        {option}
                      </div>
                    </div>

                    <div className="p-2 bg-[#1C1C1C] border-t border-[#2A2A2A]">
                      <p className="text-sm text-white font-medium">{option}</p>
                      <p className="text-xs text-gray-400 break-words">
                        {getPercentageHelperText(option)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Extra space at bottom for mobile */}
          <div className="pb-20 md:pb-0"></div>

          {/* Dialog Actions - Fixed at bottom */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1C1C1C] border-t border-[#2A2A2A] flex justify-end gap-3 md:static md:border-0 md:p-0 md:mt-6">
            <ActionButton variant="secondary" onClick={onClose}>
              Cancel
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={handleConfirmAndClose}
              disabled={!canSubmit}
            >
              Confirm
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
