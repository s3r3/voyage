// app/search-results/page.tsx
import React, { Suspense } from "react";
import SearchResultsPage from "app/ui/landing/hotels/components/searchResultPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Memuat hasil pencarian...</div>}>
      <SearchResultsPage />
    </Suspense>
  );
}
