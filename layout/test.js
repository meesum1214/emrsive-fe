import { useState } from "react"
import { Text, View } from "react-native"

export default () => {
    const [columnEdit, setColumnEdit] = useState(false) // this will decide whether to show edit and delete icons or not
    const [columnIdHover, setColumnIdHover] = useState(null) // this will decide which column to delete
    return (
        <View
            // Here we are setting the columnIdHover to the columnId of the column which is hovered
            onMouseOver={() => {
                setColumnEdit(true)
                setColumnIdHover(columnId)
            }}

            // Here we are setting the columnEdit to false when the mouse leaves the column
            onMouseLeave={() => {
                setColumnEdit(false)
            }}
            className="flex justify-between items-center w-full px-6 h-[60px] bg-[#242731] rounded-sm rounded-b-none"
        >
            <Text className="text-[17px] font-bold text-subtle-text">
                {column.title}
            </Text>

            <View className="flex items-center">
                <AiFillDelete
                    size={18}
                    // Here we are checking if the columnIdHover is equal to the columnId of the column
                    className={`${columnEdit ? "block" : "hidden"} cursor-pointer transition-all text-white mr-1`}
                    onClick={() => handleOnColumnDelete(columnIdHover)}
                />


                <AiFillEdit
                    size={18}
                    // Here we are checking if the columnIdHover is equal to the columnId of the column
                    onClick={() => setColumnState(true)} className={`cursor-pointer transition-all ${columnEdit ? "block" : "hidden"}`}
                />
            </View>
        </View>
    )
}