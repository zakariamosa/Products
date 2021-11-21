import React, { useState } from 'react'



const useToggleModalVisible = () => {
    const [showModalVisible,setShowModalVisible] = useState(false);

    const toggleModalVisible = (bool: boolean) => {
        setShowModalVisible(bool);
    }

    return({showModalVisible,toggleModalVisible})
}

export default useToggleModalVisible