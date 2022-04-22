import { Button, Table, Input, Form, notification, Space, Select } from 'antd';
import { useEffect, useState } from 'react';
import CategoryService from '../services/CategoryService';

function Category() {
    useEffect(() => {
        CategoryService.fetch().then(response => setData(response.data));
    }, []);
    const [data, setData] = useState();

    const [editRow, setEditRow] = useState();
    const [form] = Form.useForm();
    const columns = [
        {
            dataIndex: 'name',
            title: 'Наименование',
            key: 'name',
            render: (text, record) => {
                if (editRow === record.id) {
                    return <Form.Item name="name" rules={[{ required: true, message: "Необходимо ввести имя" }]} style={{ marginBottom: 0 }}>
                        <Input />
                    </Form.Item>;
                } else {
                    return text;
                }
            }
        },
        {
            dataIndex: 'type',
            title: 'Тип',
            key: 'type',
            render: (text, record) => {
                if (editRow === record.id) {
                    return <Form.Item name="type" rules={[{ required: false, message: "Необходимо выбрать тип" }]} style={{ marginBottom: 0 }}>
                        <Select defaultValue={"expense"}>
                            <Select.Option value="expense">Расходы</Select.Option>
                            <Select.Option value="income">Доходы</Select.Option>
                        </Select>
                    </Form.Item>;
                } else {
                    return <Select bordered={false} value={record.type} disabled showArrow={false} >
                        <Select.Option value="expense">Расходы</Select.Option>
                        <Select.Option value="income">Доходы</Select.Option>
                    </Select>;
                }
            }
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <>
                    {editRow !== record.id &&
                        <Button
                            type="link"
                            onClick={() => initEditRow(record)}>
                            Edit
                        </Button>
                    }
                    {editRow === record.id && <Button type="link" htmlType="submit">Save</Button>}
                    {editRow !== record.id && <Button type="link" onClick={() => deleteRow(record)}>Delete</Button>}
                </>
            ),
        },
    ]

    const initEditRow = (record) => {
        setEditRow(record.id);
        form.setFieldsValue({ name: record.name });
        form.setFieldsValue({ type: record.type });
    }

    const onSubmit = (values) => {
        CategoryService.edit({ ...values, id: editRow })
            .then(response => {
                if (!response.data) {
                    return;
                }
                const updatedData = [...data];
                const currentRow = updatedData.find(x => x.id === editRow);
                if (currentRow) {
                    currentRow.name = response.data.name;
                    currentRow.type = response.data.type;
                    currentRow.id = response.data.id;
                }
                setData(updatedData);
            })
            .catch(errorHandler)
            .finally(() => { setEditRow(null); });
    }

    const addRow = () => {
        const newData = [...data];
        const id = 0;
        const newRow = { id, name: "" };
        newData.push(newRow);
        setData(newData);
        initEditRow(newRow);
    }

    const deleteRow = (record) => {
        CategoryService.remove(record.id)
            .then(response => {
                const updatedData = [...data];
                const deletedRowIndex = updatedData.findIndex(x => x.id === record.id);
                if (deletedRowIndex !== -1) {
                    updatedData.splice(deletedRowIndex, 1);
                }
                setData(updatedData);
            })
            .catch(errorHandler)
    }

    const errorHandler = error => {
        notification.error({
            message: error.message,
            description: error.response?.data?.message,
            placement: 'top'
        });
    }

    return (
        <Space direction='vertical'>
            <h1 style={{ textAlign: 'center' }}>Категории</h1>
            <Form form={form} onFinish={onSubmit}>
                <Table dataSource={data} columns={columns} rowKey="id" size="middle">

                </Table>
            </Form>
            <Button onClick={addRow}>Add</Button>
        </Space>
    );
}

export default Category;