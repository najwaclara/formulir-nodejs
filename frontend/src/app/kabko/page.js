import { getKabko } from '../../lib/api';
import KabkoTable from '../../components/KabkoTable';
import Link from 'next/link';

export default async function KabkoPage() {
  const data = await getKabko();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Daftar Kabko</h2>
          <p className="text-sm text-slate-600">Kelola data kabupaten/kota.</p>
        </div>
        <Link
          href="/kabko/tambah"
          className="rounded-xl bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700"
        >
          Tambah Kabko
        </Link>
      </div>
      <KabkoTable data={data} />
    </section>
  );
}