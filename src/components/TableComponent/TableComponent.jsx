import { Divider, Dropdown, Modal, Space, Table } from "antd";
import React, { useState } from "react";
import Loading from "../LoadingComponent/LoadingComponent";
import { DownOutlined } from "@ant-design/icons";
import { WrapperButtonExtend } from "./style";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
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
        },
    };

    // const handleDeleteAll = () => {
    //     handleDeleteMany(rowSelectedKeys);
    // };

    // Xử lý khi người dùng nhấn "Delete many"
    const handleDeleteAll = () => {
        Modal.confirm({
            title: "Are you sure you want to delete selected items?",
            okText: "Ok",
            cancelText: "Cancel",
            okButtonProps: {
                style: {
                    backgroundColor: "red",
                    borderColor: "red",
                },
            },
            cancelButtonProps: {
                style: {
                    backgroundColor: "gray",
                    borderColor: "gray",
                    color: "white",
                },
            },
            onOk() {
                handleDeleteMany(rowSelectedKeys);
            },
        });
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
        "orderItems",
    ];

    // Hàm flatten object lồng nhau
    const flattenObject = (obj, parent = "", res = {}) => {
        for (let key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const propName = parent ? `${parent}_${key}` : key;
                if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
                    flattenObject(obj[key], propName, res);
                } else {
                    res[propName] = obj[key];
                }
            }
        }
        return res;
    };

    // Hàm lọc bỏ các cột không mong muốn và flatten dữ liệu
    const filterColumns = (data) => {
        return data.map((row) => {
            // Flatten object lồng nhau
            const flattenedRow = flattenObject(row);
            // Lọc bỏ các cột không cần thiết
            return Object.fromEntries(
                Object.entries(flattenedRow).filter(
                    ([key, value]) => !excludedColumns.includes(key)
                )
            );
        });
    };

    // Hàm export dữ liệu ra Excel
    const exportToExcel = async () => {
        const filteredData = filterColumns(data); // Lọc và flatten dữ liệu
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
        saveAs(blob, "table_data.xlsx"); // Sử dụng file-saver để tải file
    };

    return (
        <div>
            <Divider />
            <Loading isPending={isPending}>
                <WrapperButtonExtend>
                    {/* Choose many */}
                    {rowSelectedKeys.length > 0 ? (
                        <div style={{ display: "flex" }}>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                            >
                                <a
                                    href="#!"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <Space>
                                        Choose many
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    ) : (
                        <div></div>
                    )}

                    {/* Nút Export Excel */}
                    <ButtonComponent
                        styleButton={{
                            background:
                                "linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%)",
                            color: "#fff",
                            fontSize: "1.6rem",
                            fontWeight: "500",
                        }}
                        textButton={"Export to Excel"}
                        onClick={exportToExcel}
                    />
                </WrapperButtonExtend>

                <Table
                    pagination={{ pageSize: 8 }}
                    {...(selectionType && {
                        rowSelection: {
                            type: selectionType,
                            ...rowSelection,
                        },
                    })}
                    columns={columns}
                    dataSource={data}
                    {...props}
                />
            </Loading>
        </div>
    );
};

export default TableComponent;
