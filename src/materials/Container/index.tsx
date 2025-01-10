import { ComponentConfig } from "../../components/editor/stores/component-config";
import ContainerDev from "./dev";
import ContainerProd from "./prod";

export const ContainerConfig: ComponentConfig = {
    name: 'Container',
    defaultProps: {},
    dev: ContainerDev,
    prod: ContainerProd,
    desc: '容器'
}