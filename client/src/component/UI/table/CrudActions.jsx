import { Button } from "antd";

function CrudActions({record, editRow, initEditRow, deleteRow}) {
    return (<>
        {editRow !== record.id &&
            <Button
                type="link"
                onClick={() => initEditRow(record)}>
                Edit
            </Button>
        }
        {editRow === record.id && <Button type="link" htmlType="submit">Save</Button>}
        {editRow !== record.id && <Button type="link" onClick={() => deleteRow(record)}>Delete</Button>}
    </> );
}

export default CrudActions;
