import Sidebar from "../components/common/sidebar/Sidebar";
import SearchFilterTable from "../components/common/tables/SearchFilterTable";
import TableData from "../assets/data/tableData";
import PageTable from "../components/common/tables/PageTable";

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
    <div className="flex w-full flex-col p-2 px-10 border border-green-700">
      <SearchFilterTable
        title="Journal List"
        placeholder="Search journals..."
        categories={journalCategories}
        buttonText="Add Journals"
      />
      <PageTable data={TableData} />
    </div>
    </div>
  );
}

export default AdminJournalPage;