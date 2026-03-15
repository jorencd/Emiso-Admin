
import Sidebar from "../components/common/sidebar/Sidebar";
import SearchFilterTable from "../components/common/tables/SearchFilterTable";
import TableData from "../assets/data/tableData";
import PageTable from "../components/common/tables/PageTable";

const bookCategories = [
  "All",
  "Arts",
  "Business",
  "Education",
  "Medicine",
  "Science",
  "Technology",
  "Social Science",
];

function AdminBookPage() {

  return (
    <div className="flex w-full h-full gap-x-2 ">
      <Sidebar />
      <div className="flex w-full flex-col p-2 px-10 border border-green-700">
        <SearchFilterTable
          title="Book List"
          placeholder="Search books..."
          categories={bookCategories}
          buttonText="Add Books"
        ></SearchFilterTable>
        <PageTable data={TableData} />
      </div>
    </div>
  );
}

export default AdminBookPage;
