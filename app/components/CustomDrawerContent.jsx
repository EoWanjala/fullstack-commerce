import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {/* Add more custom content here if needed */}
    </DrawerContentScrollView>
);

export default CustomDrawerContent;
