import { Row, Col, Table } from 'antd';

function Expenses() {
    const data = [
        {
            data: '01-04-2022',
            amount: 2000,
            note: 'test note',
            category: 'Продукты',
            id: 1
        },
        {
            data: '02-04-2022',
            amount: 49,
            note: 'test note',
            category: 'Здоровье',
            id: 2
        },
        {
            data: '03-04-2022',
            amount: 368,
            note: 'test note',
            category: 'Налог',
            id: 3
        },
        {
            data: '04-04-2022',
            amount: 500,
            note: 'test note',
            category: 'Собака',
            id: 4
        }
    ];
    const columns = [
        {
            dataIndex: 'data',
            title: 'Дата'
        },
        {
            dataIndex: 'amount',
            title: 'Сумма'
        },
        {
            dataIndex: 'note',
            title: 'Примечание'
        },
        {
            dataIndex: 'category',
            title: 'Категория'
        },
    ]
    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Расходы</h1>
            <Table dataSource={data} columns={columns} rowKey="id" size="middle">

            </Table>
        </>
    );
}

export default Expenses;