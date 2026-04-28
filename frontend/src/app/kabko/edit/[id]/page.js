import { getKabkoById, getProvinsi } from '../../../../lib/api';
import KabkoForm from '../../../../components/KabkoForm';
import { notFound } from 'next/navigation';

export default async function EditKabkoPage({ params }) {
  const { id } = await params;
  const [data, provinsi] = await Promise.all([getKabkoById(id), getProvinsi()]);
  if (!data) notFound();

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Edit Kabko</h2>
        <p className="text-sm text-slate-600">Ubah data kabupaten/kota.</p>
      </div>
      <KabkoForm initialData={data} isEdit={true} provinsiList={provinsi} />
    </section>
  );
}