import { Divider, Dropdown, Space, Table } from "antd";
import React, { useState } from "react";
import Loading from "../LoadingComponent/LoadingComponent";
import { DownOutlined } from "@ant-design/icons";

const TableComponent = (props) => {
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
    const {
        selectionType = "checkbox",
        columns = [],
        data = [],
        isPending = false,
        handleDeleteMany,
    } = props;

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys);
            console.log(`selectedRowKeys: ${selectedRowKeys}`);
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === "Disabled User",
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys);
    };

    const items = [
        {
            key: "1",
            label: <span onClick={handleDeleteAll}>Delete many</span>,
        },
    ];

    return (
        <div>
            <Divider />
            <Loading isPending={isPending}>
                {rowSelectedKeys.length > 0 && (
                    <div style={{ marginBottom: "15px" }}>
                        <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <a href="#!" onClick={(e) => e.preventDefault()}>
                                <Space>
                                    Choose many
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                )}

                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    {...props}
                />
            </Loading>
        </div>
    );
};

export default TableComponent;
