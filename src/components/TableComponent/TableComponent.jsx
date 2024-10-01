import { Divider, Dropdown, Space, Table } from "antd";
import React, { useState } from "react";
import Loading from "../LoadingComponent/LoadingComponent";
import { DownOutlined } from "@ant-design/icons";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

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
    const exportToExcel = async () => {
        const filteredData = filterColumns(data); // Lọc dữ liệu
        const workbook = new ExcelJS.Workbook(); // Tạo workbook mới
        const worksheet = workbook.addWorksheet("Sheet1"); // Thêm sheet vào workbook

        // Thêm hàng tiêu đề (header) vào sheet
        if (filteredData.length > 0) {
            worksheet.columns = Object.keys(filteredData[0]).map((key) => ({
                header: key,
                key: key,
            }));

            // Thêm dữ liệu vào sheet
            filteredData.forEach((row) => {
                worksheet.addRow(row);
            });
        }

        // Tạo file Excel dưới dạng blob và tải về
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "filtered_table_data.xlsx"); // Sử dụng file-saver để tải file
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
