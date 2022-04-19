import { Button, Table, Input, Form } from 'antd';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
            dataIndex: 'id',
            title: 'id',
            key: 'id'
        },
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
                    {editRow !== record.id && <Button type="link">Delete</Button>}
                </>
            ),
        },
    ]

    const initEditRow = (record) => {
        setEditRow(record.id);
        form.setFieldsValue({ name: record.name });
    }

    const onSubmit = (values) => {
        CategoryService.edit({ ...values, id: editRow }).then(response => {
            
            if (!response.data) {
                //TODO: показать нотификацию
                return;
            }
            const updatedData = [...data];
            const currentRow = updatedData.find(x => x.id === editRow);
            console.log(response.data, currentRow);
            if (currentRow) {
                currentRow.name = response.data.name;
                currentRow.id = response.data.id;
            }
            setData(updatedData);
            setEditRow(null);
        });
    }

    const addRow = () => {
        const newData = [...data];
        const id = 0;
        const newRow = { id, name: "" };
        newData.push(newRow);
        setData(newData);
        initEditRow(newRow);
    }
    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Категории</h1>
            <Form form={form} onFinish={onSubmit}>
                <Table dataSource={data} columns={columns} rowKey="id" size="middle">

                </Table>
            </Form>
            <Button onClick={addRow}>Add</Button>
        </>
    );
}

export default Category;