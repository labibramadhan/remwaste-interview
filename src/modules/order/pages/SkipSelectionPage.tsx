import { useSkips } from '../../skips/hooks/useSkips';
import { OrderSkipGrid } from '../components/OrderSkipGrid';
import { useOrderStore } from '../store/useOrderStore';
import OrderHeaderSteps from '../components/OrderHeaderSteps';

export default function SkipSelectionPage() {
  const { data: skips, isLoading, isError } = useSkips();

  const selectedSkipId = useOrderStore((s) => s.selectedSkipId);
  const selectSkip = useOrderStore((s) => s.actions.selectSkip);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <OrderHeaderSteps />
      <div className="max-w-7xl mx-auto px-4 pb-32">
        <h2 className="text-2xl font-bold text-center mb-4">
          Choose Your Skip Size
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Select the skip size that best suits your needs
        </p>

        <OrderSkipGrid
          skips={skips}
          isLoading={isLoading}
          isError={isError}
          selectedSkipId={selectedSkipId}
          onSelect={selectSkip}
        />
      </div>
    </main>
  );
}
