import { Row, Col, Table } from 'antd';

function Expenses() {
    const data = [
        {
            data: '01-04-2022',
            amount: 2000,
            note: 'test note',
            category: 'Продукты'
        },
        {
            data: '02-04-2022',
            amount: 49,
            note: 'test note',
            category: 'Здоровье'
        },
        {
            data: '03-04-2022',
            amount: 368,
            note: 'test note',
            category: 'Налог'
        },
        {
            data: '04-04-2022',
            amount: 500,
            note: 'test note',
            category: 'Собака'
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
            <Row>
                <Col>
                    <h1>Расходы</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table dataSource={data} columns={columns}>

                    </Table>
                </Col>
            </Row>
        </>
    );
}

export default Expenses;