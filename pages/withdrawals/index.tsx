import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";

import React from "react";
import {
    IResourceComponentsProps,
    BaseRecord,
    useTranslate,
} from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const WithdrawalList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps } = useTable({
    resource: "vw_ewa_withdrawal",
    filters: {
      permanent: [
        {
          field: "company_id",
          operator: "eq",
          value: 1,
        },
      ],
    },
    syncWithLocation: true,
  });

  return (
    <List canCreate={false}>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          title={translate("withdrawals.field.id")}
          dataIndex="id"
        />
        <Table.Column
          title={translate("withdrawals.field.created_at")}
          dataIndex="created_at"
        />
        <Table.Column
          title={translate("withdrawals.field.employee_name")}
          dataIndex="employee_name"
        />
        <Table.Column
          title={translate("withdrawals.field.amount")}
          dataIndex="amount"
        />
        <Table.Column
          title={translate("withdrawals.field.reason")}
          dataIndex="reason"
        />
        <Table.Column
          title={translate("withdrawals.field.status")}
          dataIndex="status"
        />
        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton
                hideText
                size="small"
                recordItemId={record.id}
              />
              <ShowButton
                hideText
                size="small"
                recordItemId={record.id}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (!authenticated) {
    return {
      props: {
        ...translateProps,
      },
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/categories")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};

export default WithdrawalList;