import React from 'react';
import {
  LuMapPin,
  LuTrash2,
  LuTruck,
  LuShield,
  LuCalendar,
  LuCreditCard,
} from 'react-icons/lu';

// Define the order steps
const steps = [
  { label: 'Postcode', icon: <LuMapPin />, completed: true },
  { label: 'Waste Type', icon: <LuTrash2 />, completed: true },
  { label: 'Select Skip', icon: <LuTruck />, active: true },
  { label: 'Permit Check', icon: <LuShield />, completed: false },
  { label: 'Choose Date', icon: <LuCalendar />, completed: false },
  { label: 'Payment', icon: <LuCreditCard />, completed: false },
];

export default function OrderHeaderSteps() {
  const activeStepIndex = steps.findIndex((step) => step.active);

  // For mobile, only show the current active step and the next step
  const mobileSteps = steps.filter((_step, index) => {
    return index === activeStepIndex || index === activeStepIndex + 1;
  });

  return (
    <div className="flex justify-center mb-8 overflow-x-auto">
      {/* Desktop view - all steps visible */}
      <div className="hidden md:flex items-center space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            {index > 0 && (
              <div
                className={`w-16 h-px ${index <= activeStepIndex ? 'bg-[#0037C1]' : 'bg-[#2A2A2A]'}`}
              />
            )}
            <button
              className={`flex items-center whitespace-nowrap transition-colors ${
                step.active || step.completed
                  ? 'text-[#0037C1] cursor-pointer hover:text-[#0037C1]'
                  : 'text-white/60 cursor-not-allowed opacity-50'
              }`}
              disabled={!step.active && !step.completed}
            >
              {step.icon}
              <span className="ml-2 text-white">{step.label}</span>
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Mobile view - only current and next step visible */}
      <div className="flex md:hidden items-center space-x-4">
        {mobileSteps.map((step, index) => (
          <React.Fragment key={step.label}>
            {index > 0 && <div className="w-16 h-px bg-[#2A2A2A]" />}
            <button
              className={`flex items-center whitespace-nowrap transition-colors ${
                step.active || step.completed
                  ? 'text-[#0037C1] cursor-pointer hover:text-[#0037C1]'
                  : 'text-white/60 cursor-not-allowed opacity-50'
              }`}
              disabled={!step.active && !step.completed}
            >
              {step.icon}
              <span className="ml-2 text-white">{step.label}</span>
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
