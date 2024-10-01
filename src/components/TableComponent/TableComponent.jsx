import { Divider, Dropdown, Space, Table } from "antd";
import React, { useState } from "react";
import Loading from "../LoadingComponent/LoadingComponent";
import { DownOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

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

    // Danh sách các cột cần loại bỏ
    const excludedColumns = [
        "image",
        "createdAt",
        "updatedAt",
        "__v",
        "key",
        "avatar",
    ];

    // Hàm lọc bỏ các cột không mong muốn
    const filterColumns = (data) => {
        return data.map((row) => {
            return Object.fromEntries(
                Object.entries(row).filter(
                    ([key, value]) => !excludedColumns.includes(key)
                )
            );
        });
    };

    // Hàm export dữ liệu ra Excel
    const exportToExcel = () => {
        const filteredData = filterColumns(data); // Lọc dữ liệu
        const ws = XLSX.utils.json_to_sheet(filteredData); // Chuyển dữ liệu đã lọc sang sheet
        const wb = XLSX.utils.book_new(); // Tạo workbook mới
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // Thêm sheet vào workbook
        XLSX.writeFile(wb, "filtered_table_data.xlsx"); // Xuất file Excel
    };

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

                {/* Nút Export Excel */}
                <div style={{ marginTop: "20px" }}>
                    <button onClick={exportToExcel}>Export to Excel</button>
                </div>
            </Loading>
        </div>
    );
};

export default TableComponent;
