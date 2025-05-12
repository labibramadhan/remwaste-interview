import { Outlet } from '@tanstack/react-router';
export function Root() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Outlet />
    </div>
  );
}
