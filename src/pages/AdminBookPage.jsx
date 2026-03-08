
import Sidebar from "../components/common/sidebar/Sidebar";
import SearchFilterTable from "../components/common/tables/SearchFilterTable";

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

      <SearchFilterTable
        title="Book List"
        placeholder="Search books..."
        categories={bookCategories}
        buttonText="Add Books"
      ></SearchFilterTable>

      
    </div>
  );
}

export default AdminBookPage;
