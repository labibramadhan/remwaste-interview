import { Skip } from '../../../models/skip';
import { LuChevronLeft, LuArrowRight } from 'react-icons/lu';

type OrderBottomNavigationTabProps = {
  skip: Skip;
};

export function OrderBottomNavigationTab({
  skip,
}: OrderBottomNavigationTabProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1C1C1C] border-t border-[#2A2A2A] z-40 shadow-lg animate-fade-in">
      <div className="mx-auto px-3 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 max-w-7xl">
        {/* Compact mobile design */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-2 gap-y-2 items-center">
          {/* Skip information - first row on mobile */}
          <div className="bg-[#0037C1] p-2 rounded-md flex items-center col-span-2 sm:w-auto">
            <div className="mr-2">
              <span className="text-xs text-white/70">Selected</span>
              <div className="text-base font-semibold text-white">
                {skip.size} Yard Skip
              </div>
            </div>
            <div className="border-l border-white/20 pl-2 ml-1">
              <span className="text-xs text-white/70">
                {skip.hire_period_days} day
              </span>
              <div className="text-base font-semibold text-white">
                £{skip.price_before_vat.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Status badges - on second row */}
          <div className="col-span-2 sm:ml-2 flex flex-wrap gap-1.5">
            {/* Heavy waste badge */}
            {skip.allows_heavy_waste ? (
              <span className="text-xs bg-green-900/30 text-green-300 px-2 py-0.5 rounded-full border border-green-500/30">
                Allows Heavy Waste
              </span>
            ) : (
              <span className="text-xs bg-orange-900/30 text-orange-300 px-2 py-0.5 rounded-full border border-orange-500/30">
                No Heavy Waste
              </span>
            )}

            {/* Savings display */}
            {skip.original_price &&
              skip.original_price > skip.price_before_vat && (
                <span className="text-xs bg-amber-400 text-black px-2 py-0.5 rounded-full font-medium flex items-center">
                  <svg
                    className="w-3 h-3 mr-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  You saved £
                  {(skip.original_price - skip.price_before_vat).toFixed(2)}!
                </span>
              )}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-2 w-full md:w-auto justify-between md:justify-end mt-2 md:mt-0">
          <button className="px-3 py-1.5 text-white bg-[#2A2A2A] hover:bg-[#3A3A3A] rounded-md flex items-center justify-center transition-colors w-1/2 md:w-auto text-sm">
            <LuChevronLeft className="mr-1" />
            Back
          </button>
          <button className="px-6 py-2 text-white bg-[#0037C1] hover:bg-[#0037C1]/90 rounded-md flex items-center justify-center transition-colors font-medium shadow-md w-1/2 md:w-auto">
            Continue
            <LuArrowRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
