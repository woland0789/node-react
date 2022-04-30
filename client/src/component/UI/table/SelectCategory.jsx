import { Form, Select } from 'antd';

function SelectCategory({ record, editRow, options, fieldName }) {
    if (editRow === record.id) {
        return <Form.Item name={fieldName} rules={[{ required: false, message: "Необходимо выбрать тип" }]} style={{ marginBottom: 0 }}>
            <Select >
                {options.map(option =>
                    <Select.Option key={option.value} value={option.value}>{option.text}</Select.Option>
                )}
            </Select>
        </Form.Item>;
    } else {
        return <Select bordered={false} value={record[fieldName]} disabled showArrow={false} >
            {options.map(option =>
                <Select.Option key={option.value} value={option.value}>{option.text}</Select.Option>
            )}
        </Select>;
    }
}

export default SelectCategory;