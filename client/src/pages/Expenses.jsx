import { Space, Table, DatePicker, Form, InputNumber } from 'antd';
import { useState } from 'react';
import CrudActions from '../component/UI/table/CrudActions';
import moment from 'moment';

function Expenses() {
    const [editableRow, setEditableRow] = useState(null);
    const [form] = Form.useForm();

    const data = [
        {
            date: new Date(),
            amount: 2000,
            note: 'test note',
            category: 'Продукты',
            id: 1
        },
        {
            date: new Date(),
            amount: 49,
            note: 'test note',
            category: 'Здоровье',
            id: 2
        },
        {
            date: new Date(),
            amount: 368,
            note: 'test note',
            category: 'Налог',
            id: 3
        },
        {
            date: new Date(),
            amount: 500,
            note: 'test note',
            category: 'Собака',
            id: 4
        }
    ];
    const columns = [
        {
            dataIndex: 'date',
            title: 'Дата',
            key: 'date',
            render: (text, record) => {
                if (isEditable(record)) {
                    return <Form.Item name="date" rules={[{ required: true, message: "Необходимо ввести дату" }]} style={{ marginBottom: 0 }}>
                        <DatePicker onChange={(date) => record.date = date} format="DD.MM.YYYY" />
                    </Form.Item>;
                } else {
                    return record.date.toLocaleDateString();
                }
            }
        },
        {
            dataIndex: 'amount',
            key: 'amount',
            title: 'Сумма',
            width: 100,
            align: 'right',
            render: (text, record) => {
                if (isEditable(record)) {
                    return <Form.Item name="amount" rules={[{ required: true, message: "Необходимо ввести количество" }]} style={{ marginBottom: 0 }}>
                        <InputNumber />
                    </Form.Item>
                } else {
                    return text;
                }
            }
        },
        {
            dataIndex: 'note',
            key: 'note',
            title: 'Примечание'
        },
        {
            dataIndex: 'category',
            key: 'category',
            title: 'Категория'
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <>
                    <CrudActions record={record} editRow={editableRow} initEditRow={initEditRow} deleteRow={deleteRow} />
                </>
            )
        }
    ]

    const isEditable = (record) => {
        return editableRow === record.id;
    }

    const initEditRow = (record) => {
        setEditableRow(record.id);
        console.log(record.amount);
        form.setFieldsValue({ amount: record.amount, date: moment(record.date, 'DD.MM.YYYY') });
    }

    const deleteRow = (record) => {

    }

    const onSubmit = (values) => {

    }
    return (
        <Space direction="vertical">
            <h1 style={{ textAlign: 'center' }}>Расходы</h1>
            <Form form={form} onFinish={onSubmit}>
                <Table dataSource={data} columns={columns} rowKey="id" size="middle" bordered={true}>

                </Table>
            </Form>
        </Space>
    );
}

export default Expenses;