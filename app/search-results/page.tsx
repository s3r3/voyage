// app/search-results/page.tsx
import SearchResultsPage from "app/ui/landing/hotels/components/searchResultPage"; // Sesuaikan path jika komponen Anda ada di tempat lain

// Ini adalah komponen halaman yang di-render oleh Next.js
export default function Page() {
  return (
    <div>
      {/* Render komponen SearchResultsPage Anda di sini */}
      <SearchResultsPage />
    </div>
  );
}