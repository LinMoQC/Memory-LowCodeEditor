import { ComponentConfig } from "../../stores/component-config";
import TableDev from "./dev";
import TableProd from "./prod";

export const TableConfig: ComponentConfig = {
    name: 'Table',
    defaultProps: {},
    desc: '表格',
    setter: [
        {
            name: 'url',
            label: 'url',
            type: 'input',
        },
    ],
    dev: TableDev,
    prod: TableDev
}

