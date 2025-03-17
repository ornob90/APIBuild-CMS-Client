import React from "react";
import SectionContainer from "../shared/SectionContainer";
import SectionTitle from "../shared/SectionTitle";
import AddApiModal from "./ApiAddModal";
import { getApisByUser } from "@/utils/apis.utils";
import Table from "../shared/Table";
import NoDataUI from "../shared/NoDataUI";
import { apisTableHeader } from "@/data/apis.data";
import { PageSearchParams } from "@/types/globals.types";
import DeleteApiBtn from "./DeleteApiBtn";

const Apis = async ({ searchParams }: PageSearchParams) => {
  const limit = 10;

  const { apis: userApis, totalPage } = (await getApisByUser(1, limit)) || {};

  const apis = userApis
    ? userApis.map((api, index) => ({
        ...api,
        rowNumber: index + 1,
        tableName: api?.table?.tableName,
        delete: <DeleteApiBtn api={api}/>
      }))
    : [];

  const haveApis = userApis && userApis.length > 0;

  return (
    <SectionContainer>
      <SectionTitle
        title="APIs"
        rightTemplate={<AddApiModal />}
        hideRightSide={!haveApis}
      />
      {haveApis ? (
        <Table
          data={apis}
          headers={apisTableHeader}
          paginationProps={{
            initialPage: Number(searchParams?.page) ?? 1,
            total: totalPage ?? 0,
          }}
        />
      ) : (
        <NoDataUI createBtnText="Create API" createTemplate={<AddApiModal />} />
      )}
    </SectionContainer>
  );
};

export default Apis;
