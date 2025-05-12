import { useState } from 'react';
import { FaArrowRight, FaCheck } from 'react-icons/fa6';
import { LuInfo } from 'react-icons/lu';
import { Skip } from '../../../../types/skip';
import { SkipWarningBadge } from './SkipWarningBadge';
import { StatusBadge } from '../atoms/badges/StatusBadge';

interface SkipCardProps {
  skip: Skip;
  selected: boolean;
  disabled: boolean;
  onSelect: (id: string) => void;
  onOpenHeavyWasteDialog: () => void;
}

export function SkipCard({
  skip,
  selected,
  disabled,
  onSelect,
  onOpenHeavyWasteDialog,
}: SkipCardProps) {
  const [showDisabledInfo, setShowDisabledInfo] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <div
      data-testid="skip-card"
      data-unavailable={disabled}
      className={`
        group relative flex flex-col
        rounded-lg border-2 p-4 md:p-6 transition-all
        ${selected ? 'border-primary bg-[#0037C1]/10' : 'border-[#2A2A2A] hover:border-[#0037C1]/50'}
        bg-[#1C1C1C] text-white
        ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        `}
      onClick={() => !disabled && onSelect(skip.id)}
      onMouseEnter={() => {
        if (disabled) {
          setShowDisabledInfo(true);
        }
        setIsCardHovered(true);
      }}
      onMouseLeave={() => {
        setShowDisabledInfo(false);
        setIsCardHovered(false);
      }}
      onFocus={() => {
        if (disabled) {
          setShowDisabledInfo(true);
        }
        setIsCardHovered(true);
      }}
      onBlur={() => {
        setShowDisabledInfo(false);
        setIsCardHovered(false);
      }}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-disabled={disabled}
      aria-label={`${skip.size} Yard Skip ${disabled ? '- Not suitable for heavy waste' : ''}`}
    >
      {/* Disabled explanation overlay with fade animation */}
      {disabled && showDisabledInfo && (
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-lg z-30 flex items-center justify-center p-6 animate-fade-in"
          role="tooltip"
          aria-live="polite"
          onClick={(e) => {
            // Prevent clicks on the overlay from propagating to the card
            e.stopPropagation();
          }}
        >
          <div className="bg-[#1C1C1C]/90 border border-[#2A2A2A] rounded-lg p-4 max-w-[90%] text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="bg-red-500/10 p-2 rounded-full">
                <LuInfo className="text-red-500 w-6 h-6" />
              </div>
            </div>
            <h4 className="font-bold text-lg mb-2">Cannot Use This Skip</h4>
            <p className="text-sm text-white mb-3">
              You've selected waste that contains heavy materials, but this skip
              is not suitable for heavy waste.
            </p>
            <div className="flex justify-center">
              <button
                className="text-white cursor-pointer px-3 py-1.5 bg-amber-500 hover:bg-amber-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0037C1] focus:ring-opacity-50 active:bg-amber-600 touch-manipulation"
                onClick={(e) => {
                  // First prevent the event from bubbling up
                  e.stopPropagation();
                  e.preventDefault();

                  // Then call the dialog opener with a slight delay to ensure
                  // it executes after this click event is fully processed
                  setTimeout(() => {
                    onOpenHeavyWasteDialog();
                    setShowDisabledInfo(false);
                  }, 50);
                }}
              >
                Change Waste Type
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skip image container */}
      <div className="relative mb-4">
        <img
          src={skip.image_url}
          className="w-full h-36 md:h-48 object-cover rounded-md mb-4"
          alt={`${skip.size} Yard Skip`}
        />

        {/* Recommended badge */}
        {skip.recommended && (
          <div
            data-testid="recommended-badge"
            className="absolute top-3 right-2 z-20 bg-[#0037C1] text-white px-3 py-1 rounded-full text-sm font-medium shadow-md flex items-center gap-2"
          >
            Recommended For Your Waste
          </div>
        )}

        {/* Warning indicators */}
        {(!skip.allowed_on_road || !skip.allows_heavy_waste) && (
          <div className="absolute bottom-3 left-2 z-20 space-y-2">
            {!skip.allowed_on_road && <SkipWarningBadge type="road" />}
            {!skip.allows_heavy_waste && <SkipWarningBadge type="heavy" />}
          </div>
        )}
      </div>

      {/* Skip details */}
      <h3 className="text-lg md:text-xl font-bold mb-2 text-white flex items-center gap-2">
        {skip.size} Yard Skip
      </h3>
      <p className="text-sm text-gray-200 mb-2">
        {skip.hire_period_days} days hire period
      </p>

      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          {skip.original_price &&
          skip.original_price > skip.price_before_vat ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-bold text-amber-400">
                  £{skip.price_before_vat}
                </span>
                <span className="text-sm text-gray-300 line-through">
                  £{skip.original_price}
                </span>
              </div>
              <div className="mt-1">
                <StatusBadge variant="amber">
                  Save £
                  {(skip.original_price - skip.price_before_vat).toFixed(2)}{' '}
                  today!
                </StatusBadge>
              </div>
            </>
          ) : (
            <span className="text-xl md:text-2xl font-bold text-[#0037C1]">
              £{skip.price_before_vat}
            </span>
          )}
          <span className="text-xs text-gray-400 mt-1">* VAT not included</span>
        </div>
        {skip.popular && (
          <div
            data-testid="popular-badge"
            className="bg-green-500/10 border border-green-500/20 rounded px-2 py-1"
          >
            <span className="text-xs font-medium text-green-400">
              Popular Choice
            </span>
          </div>
        )}
      </div>

      <div className="mt-auto pt-4">
        <button
          disabled={disabled}
          className={`cursor-pointer w-full py-2.5 md:py-3 px-4 rounded-md transition-all flex items-center justify-center space-x-2 
            ${
              selected
                ? 'bg-[#0037C1] text-white hover:bg-[#002da1] border-1 border-transparent'
                : disabled
                  ? 'bg-[#2A2A2A] text-white opacity-50 cursor-not-allowed'
                  : `bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] border-1 ${isCardHovered ? 'border-[#0037C1] text-[#0037C1]' : 'border-transparent'}`
            }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onSelect(skip.id);
          }}
          aria-label={selected ? 'Unselect this skip' : 'Select this skip'}
        >
          <span>{selected ? 'Selected' : 'Select This Skip'}</span>
          {!selected && !disabled && isCardHovered && (
            <FaArrowRight className="ml-1 animate-fade-in" />
          )}
          {selected && !disabled && <FaCheck className="ml-1" />}
        </button>
      </div>
    </div>
  );
}
