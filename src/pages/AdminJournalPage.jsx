import Sidebar from "../components/common/sidebar/Sidebar";
import SearchFilterTable from "../components/common/tables/SearchFilterTable";

const journalCategories = [
  "All",
  "Science",
  "Technology",
  "Health",
  "Business",
];

function AdminJournalPage() {


  return (
    <div className="flex w-full h-full gap-x-2">
      <Sidebar />

      <SearchFilterTable
        title="Journal List"
        placeholder="Search journals..."
        categories={journalCategories}
        buttonText="Add Journals"
      />
    </div>
  );
}

export default AdminJournalPage;