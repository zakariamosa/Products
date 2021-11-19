import React, { useState } from 'react'



const useToggleModalVisible = () => {
    const [showModalVisible,setShowModalVisible] = useState(true);

    const toggleModalVisible = (bool: boolean | ((prevState: boolean) => boolean)) => {
        setShowModalVisible(bool);
    }

    return({showModalVisible,toggleModalVisible})
}

export default useToggleModalVisible