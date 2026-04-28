import { getProvinsi } from '../../../lib/api';
import KabkoForm from '../../../components/KabkoForm';

export default async function TambahKabkoPage() {
  const provinsi = await getProvinsi();

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Tambah Kabko</h2>
        <p className="text-sm text-slate-600">Tambahkan data kabupaten/kota baru.</p>
      </div>
      <KabkoForm provinsiList={provinsi} />
    </section>
  );
}