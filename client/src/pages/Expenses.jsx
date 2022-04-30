import { Space, Table, DatePicker, Form, InputNumber, Input, Button, notification } from 'antd';
import { useEffect, useState } from 'react';
import CrudActions from '../component/UI/table/CrudActions';
import moment from 'moment';
import SelectCategory from '../component/UI/table/SelectCategory';
import ExpenseService from '../services/ExpenseService';
import CategoryService from '../services/CategoryService';

function Expenses() {
    const [editableRow, setEditableRow] = useState(null);
    const [form] = Form.useForm();
    const [data, setData] = useState();
    const [categories, setCategories] = useState();
    useEffect(() => {
        CategoryService.fetch()
            .then(response => setCategories(response.data))
            .then(() => ExpenseService
                .fetch()
                .then(response =>
                    setData(response.data.map(x => {
                        console.log(moment(x.date));
                        return { ...x, date: moment(x.date) }
                    }))
                )
            );
    }, []);


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
                    return record.date.format('DD.MM.YYYY');
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
            title: 'Примечание',
            width: '300px',
            render: (text, record) => {
                if (isEditable(record)) {
                    return <Form.Item name="note" style={{ marginBottom: 0 }}>
                        <Input />
                    </Form.Item>
                } else {
                    return text;
                }
            }
        },
        {
            dataIndex: 'categoryId',
            key: 'categoryId',
            title: 'Категория',
            render: (text, record) => (
                <SelectCategory record={record} editRow={editableRow} options={getCategorySelectOptions(categories)} fieldName="categoryId" />
            )
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
        form.setFieldsValue({
            ...record,
            date: moment(record.date, 'DD.MM.YYYY')
        });
    }

    const deleteRow = (record) => {

    }

    const onSubmit = (values) => {
        ExpenseService.edit({ ...values, id: editableRow })
            .then(response => {
                if (!response.data) {
                    return;
                }
                const updatedData = [...data];
                const currentRow = updatedData.find(x => x.id === editableRow);
                if (currentRow) {
                    currentRow.date = values.date;
                    currentRow.amount = values.amount;
                    currentRow.note = values.note;
                    currentRow.categoryId = values.categoryId;
                    currentRow.id = response.data.id;
                }
                setData(updatedData);
            })
            .catch(errorHandler)
            .finally(() => { setEditableRow(null); });
    }

    const errorHandler = error => {
        notification.error({
            message: error.message,
            description: error.response?.data?.message,
            placement: 'top'
        });
    }

    const getCategorySelectOptions = categoryDtos => {
        return categoryDtos.map(dto => {
            return { text: dto.name, value: dto.id };
        });
    }

    const addRow = () => {
        const newData = [...data];
        const id = 0;
        const newRow = {
            date: new Date(),
            amount: 0,
            note: '',
            categoryId: getCategorySelectOptions(categories)[0]?.id,
            id
        };
        newData.push(newRow);
        setData(newData);
        initEditRow(newRow);
    }

    return (
        <Space direction="vertical">
            <h1 style={{ textAlign: 'center' }}>Расходы</h1>
            <Form form={form} onFinish={onSubmit}>
                <Table
                    dataSource={data}
                    columns={columns}
                    rowKey="id"
                    size="small"
                    bordered={true}
                    footer={() => <Button type="link" onClick={addRow}>Add</Button>}
                />
            </Form>
        </Space>
    );
}

export default Expenses;