'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createKabko, updateKabko } from '../lib/api';

export default function KabkoForm({ initialData = null, isEdit = false, provinsiList = [] }) {
  const router = useRouter();
  const [nama, setNama] = useState('');
  const [provinsiId, setProvinsiId] = useState('');

  useEffect(() => {
    if (initialData) {
      setNama(initialData.nama_kabkot || '');
      setProvinsiId(initialData.provinsi_id?.toString() || '');
    }
  }, [initialData]);

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      nama_kabkot: nama,
      provinsi_id: parseInt(provinsiId),
    };
    try {
      if (isEdit && initialData?.id) {
        await updateKabko(initialData.id, payload);
        alert('Kabko berhasil diubah');
      } else {
        await createKabko(payload);
        alert('Kabko berhasil ditambahkan');
      }
      router.push('/kabko');
      router.refresh();
    } catch (error) {
      alert(error.message);
    }
  }

  const inputClass = 'w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500';
  const labelClass = 'mb-1 block text-sm font-medium text-slate-700';

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>Nama Kabko</label>
          <input
            className={inputClass}
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Provinsi</label>
          <select
            className={inputClass}
            value={provinsiId}
            onChange={(e) => setProvinsiId(e.target.value)}
            required
          >
            <option value="">-- Pilih Provinsi --</option>
            {provinsiList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama_provinsi}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="rounded-xl bg-slate-900 px-5 py-2.5 font-medium text-white hover:bg-slate-700"
      >
        {isEdit ? 'Update' : 'Simpan'}
      </button>
    </form>
  );
}