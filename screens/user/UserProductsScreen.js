import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import ProductItem from '../../components/shop/ProductItem';
import * as productActions from '../../store/actions/products';

import Colors from '../../constants/Colors';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        Alert.alert("Are you sure?", "Do you realy want to delete this item?", 
        [
            { text: 'No', style: 'default' },
            { text: 'Yes', style: 'destructive', onPress: () => {
                dispatch(productActions.deleteProduct(id));
            } }
        ]);
    };

    const editProductHandler = (id) => {
        console.log(id);
        props.navigation.navigate('EditProduct', {productId: id});
    };

    return (
        <FlatList 
            data={userProducts} 
            keyExtractor={item => item.id} 
            renderItem={itemData => <ProductItem  
                                        image={itemData.item.imageUrl}
                                        title={itemData.item.title}
                                        price={itemData.item.price}
                                        onSelect={() => {
                                            editProductHandler(itemData.item.id);
                                        }}
                                    >
                                        <Button color={Colors.primary} title="Edit" onPress={() => {
                                            editProductHandler(itemData.item.id);
                                        }} />
                                        <Button color={Colors.primary} title="Delete" onPress={deleteHandler.bind(this, itemData.item.id)} />
                                    </ProductItem>
                                } 
        />
    );
};

UserProductsScreen.navigationOptions = navData => {
    return {
    headerTitle: 'My Products',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName='md-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Create' iconName='md-create' onPress={() => {
                navData.navigation.navigate('EditProduct');
            }} />
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({

});

export default UserProductsScreen;