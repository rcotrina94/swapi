import { IBaseModel } from "../../domain/interfaces";

export default function SwapiSerializer(model: IBaseModel): Object{
    return model.toJSON()
}
