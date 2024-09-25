import { Divider, Table } from "antd";
import React from "react";
import Loading from "../LoadingComponent/LoadingComponent";

const TableComponent = (props) => {
    const {
        selectionType = "checkbox",
        columns = [],
        data = [],
        isPending = false,
    } = props;

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === "Disabled User",
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <div>
            <Divider />
            <Loading isPending={isPending}>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                />
            </Loading>
        </div>
    );
};

export default TableComponent;
