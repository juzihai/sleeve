import {CellStatus} from "../../core/enum";


class Cell {
    title
    id
    status =CellStatus.WAITING

    constructor(spec) {
        this.title=spec.value
        this.id=spec.value_id
        this.spec = spec
    }
    getCellCode(spec){
        return spec.key_id +"-" + spec.value_id
    }

}

export {
    Cell
}