import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Modal from '@/components/Modal';
import LoadingSpinner from '@/components/Spinnner';

import { ProductDetail } from '@/types/product';

export default function ProductDetailPage() {
  const router = useRouter();

  const [productDetail, setProductDetail] = useState<ProductDetail>();
  const [form, setForm] = useState<ProductDetail>({
    id: 0,
    title: '',
    description: '',
    price: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);

  const closeModal = () => {
    setOpenEditModal(false);
  };

  useEffect(() => {
    if (router.isReady) {
      const productId = router.query.id;
      if (productId == undefined) return;
      const fetchData = async () => {
        const res = await fetch(`/api/product/${productId}`);
        const result = await res.json();
        setProductDetail(result.data);
        setForm(result.data);

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      };
      fetchData();
    }
  }, [router.isReady, router.query.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === 'price' ? parseFloat(e.target.value) : e.target.value,
    });
  };

  const handleEditProduct = async () => {
    fetch(`/api/product/${form.id}`, {
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status == 200) {
        alert('Edit Success!');
        setProductDetail(form);
        closeModal();
      } else {
        alert('Error Happen');
      }
    });
  };

  const handleDeleteProduct = async () => {
    fetch(`/api/product/${form.id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status == 202) {
        router.push('/');
      } else {
        alert('Error Happen');
      }
    });
  };

  return (
    <Layout>
      <main>
        {openEditModal && (
          <Modal closeModal={closeModal}>
            <form className='flex max-w-3xl flex-col'>
              <label>ID</label>
              <input
                type='text'
                name='id'
                value={form?.id}
                disabled
                className='cursor-not-allowed bg-gray-200'
              />
              <label className='mt-4'>Title</label>
              <input
                type='text'
                name='title'
                onChange={handleChange}
                value={form?.title}
                placeholder='ex: Black Shirt'
              />

              <label className='mt-4'>Description</label>
              <input
                type='text'
                name='description'
                onChange={handleChange}
                value={form?.description}
                placeholder='ex: Black Shirt that is big'
              />
              <label className='mt-4'>Price</label>
              <input
                type='number'
                name='price'
                onChange={handleChange}
                placeholder='ex: 99, 99.4'
                value={form?.price}
              />
              <div className='flex justify-end'>
                <Button onClick={handleEditProduct} className='mt-8'>
                  Submit Edit
                </Button>
              </div>
            </form>
          </Modal>
        )}
        <section className='layout mt-4 flex min-h-[70vh] flex-col gap-4 rounded-md border p-8'>
          <h1>Product Detail</h1>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <h2>{productDetail?.title}</h2>
              <p>{productDetail?.description}</p>
              <p>{productDetail?.price}</p>
              <div className='flex gap-4'>
                <Button
                  onClick={() => {
                    setOpenEditModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button onClick={handleDeleteProduct}>Delete</Button>
              </div>
            </>
          )}
        </section>
      </main>
    </Layout>
  );
}
