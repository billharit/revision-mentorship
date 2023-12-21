import Button from '@/components/buttons/Button';

export default function Modal({
  children,
  closeModal,
}: {
  children: React.ReactNode;
  closeModal: () => void;
}) {
  return (
    <div className='absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/30'>
      <div className='layout flex max-h-[90vh] min-h-[70vh] flex-col rounded-lg border bg-white px-8 py-4'>
        <div className='flex justify-end'>
          <Button
            variant='light'
            className='border-red-600 text-red-600'
            onClick={closeModal}
          >
            Close
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
