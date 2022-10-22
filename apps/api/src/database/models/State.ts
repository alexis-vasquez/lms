import { DataTypes, Model } from "sequelize";
import { sequelize } from "..";

interface StateModel extends Model {
    id: number;
    pending : boolean;
    active : boolean;
    finished : boolean;
    cancelled : boolean;
}


export const State = sequelize.define<StateModel>("State", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    pending:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    active:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    finished:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    cancelled:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},
{timestamps: false}
);