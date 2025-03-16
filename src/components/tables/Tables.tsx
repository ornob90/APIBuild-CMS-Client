import { getTablesByUser } from "@/utils/tables.utils";
import SectionContainer from "../shared/SectionContainer";
import SectionTitle from "../shared/SectionTitle";
import AddTableModal from "./AddTableModal";
import { PageSearchParams } from "@/types/globals.types";
import { tablesHeaderData } from "@/data/tables.data";
import Table from "../shared/Table";
import DeleteTableBtn from "./DeleteTableBtn";
import NoDataUI from "../shared/NoDataUI";
import { CiViewTable } from "react-icons/ci";
import { getProjectsByUser } from "@/utils/projects.utils";

const Tables = async ({ searchParams }: PageSearchParams) => {
  const limit = 10;

  const {
    tables: userTables,
    totalPage,
    total,
  } = (await getTablesByUser()) || {};
  const { projects } = await getProjectsByUser();

  const projectsNameMap: { [key: string]: string } = {};

  if (Array.isArray(projects) && projects.length > 0) {
    projects.forEach((p) => {
      const key = String(p?._id) || "none";
      projectsNameMap[key] = p.projectName;
    });
  }

  const tables =
    userTables?.map((table, index) => ({
      rowNumber: index + 1,
      action: <DeleteTableBtn table={table} key={table._id} />,
      tableName: table?.tableName,
      projectName: Object.keys(projectsNameMap).includes(table?.projectId)
        ? projectsNameMap[table?.projectId]
        : "",
    })) || [];

  const haveTables = Array.isArray(tables) && tables.length > 0;

  return (
    <SectionContainer>
      <SectionTitle
        title="Tables"
        rightTemplate={<AddTableModal />}
        hideRightSide={!haveTables}
      />

      {haveTables ? (
        <Table
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data={tables as Record<string, any>[]}
          headers={tablesHeaderData}
          paginationProps={{
            initialPage: Number(searchParams?.page) ?? 1,
            total: totalPage ?? 0,
          }}
          showPagination={!!(total && total > limit)}
        />
      ) : (
        <NoDataUI
          createBtnText="Create Table"
          createBtnIcon={<CiViewTable className=" text-lg" />}
          createTemplate={<AddTableModal />}
        />
      )}
    </SectionContainer>
  );
};

export default Tables;
