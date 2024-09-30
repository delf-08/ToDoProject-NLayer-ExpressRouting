import { TodoAttributes } from "../../Model/Todo";
import { ITodoResponse } from "../interfaces/ITodoResponse";

export class TodoResponseMapper {
    static map(data: TodoAttributes): ITodoResponse {
        return {
            id: data.id,
            name: data.name,
            detail: data.detail,
            userId: data.userId
        };
    }

    public static mapList(data: TodoAttributes[]): ITodoResponse[] {
        return data.map((x) => this.map(x));
    }
}
