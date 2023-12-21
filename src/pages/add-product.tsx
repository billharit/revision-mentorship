import { useState } from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';

import { AddProduct } from '@/types/product';

export default function AddProductPage() {
  const [form, setForm] = useState<AddProduct>({
    title: '',
    description: '',
    price: 0,
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    price: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === 'price' ? parseFloat(e.target.value) : e.target.value,
    });
  };

  const handleAddProduct = async () => {
    const isTitleError = form.title.trim().length < 1;
    const isDescriptionError = form.description.trim().length < 1;
    const isPriceError = isNaN(form.price) || form.price <= 0;
    setErrors({
      title: isTitleError,
      description: isDescriptionError,
      price: isPriceError,
    });

    if (!isTitleError && !isDescriptionError && !isPriceError) {
      fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      }).then((res) => {
        if (res.status === 201) {
          alert('Add Product Success!');
          setForm({
            title: '',
            description: '',
            price: 0,
          });
        }
      });
    } else {
      alert('Something is wrong');
    }
  };

  return (
    <Layout>
      <div className='layout'>
        <h1 className='mt-4'>Add Product</h1>
        <form className='mt-4 flex max-w-lg flex-col'>
          <label>Title</label>
          <input
            type='text'
            name='title'
            placeholder='ex: Black Shirt'
            onChange={handleChange}
            value={form.title}
            className={
              'rounded-md ' + (errors.title ? 'border-red-400' : 'border')
            }
          />
          {errors.title && (
            <p className='text-red-400'>Title cannot be Empty</p>
          )}
          <label>Description</label>
          <input
            type='text'
            name='description'
            placeholder='ex: Black Shirt with long sleeve'
            onChange={handleChange}
            value={form.description}
            className={
              'rounded-md ' + (errors.description ? 'border-red-400' : 'border')
            }
          />
          {errors.description && (
            <p className='text-red-400'>Description cannot be Empty</p>
          )}
          <label>Price</label>
          <input
            type='number'
            name='price'
            placeholder='ex: 99, 99.4'
            onChange={handleChange}
            value={form.price}
            className={
              'rounded-md ' + (errors.price ? 'border-red-400' : 'border')
            }
          />
          {errors.price && (
            <p className='text-red-400'>Please put only positive number</p>
          )}
          <Button className='mt-4' onClick={handleAddProduct}>
            Add Product
          </Button>
        </form>
      </div>
    </Layout>
  );
}
