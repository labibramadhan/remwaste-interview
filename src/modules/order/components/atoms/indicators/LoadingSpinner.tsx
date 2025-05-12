export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0037C1]"></div>
      <span className="ml-3 text-white">Loading...</span>
    </div>
  );
}
