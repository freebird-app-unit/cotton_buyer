const credentials = {
    clientId: '85357792294-dthr9qsa3433b6b4gjehjl876r0bf954.apps.googleusercontent.com',
    appId: '1:85357792294:android:9e9aa8f0a5b1614daeeae7',
    apiKey: 'AIzaSyDK0Jype8oB6v9hFhk_2ykTfa-YyuVLmic',
    storageBucket: 'cotton-buyer.appspot.com',
    databaseURL: 'https://databasename.firebaseio.com',
    messagingSenderId: '85357792294',
    projectId: 'cotton-buyer',
};

export default credentials


    // (
    //     <><Text
    //         style={{
    //             fontSize: 14,
    //             fontWeight: 'bold',
    //             color: 'black',
    //             marginLeft: 20,
    //             marginBottom: 5,
    //         }}>
    //         Station Name
    //     </Text>
    //         <SelectDropdown
    //             data={itemsStation}
    //             onSelect={(selectedItem, index) => {
    //                 console.log(selectedItem, index);
    //                 setStationError(null);
    //                 setValueStation(selectedItem.value);
    //             }}
    //             buttonStyle={styles.dropdown3BtnStyle}
    //             renderCustomizedButtonChild={(selectedItem, index) => {
    //                 return (
    //                     <View style={styles.dropdown3BtnChildStyle}>
    //                         <Text style={styles.dropdown3BtnTxt}>
    //                             {selectedItem ? selectedItem.label : 'Station Name'}
    //                         </Text>
    //                     </View>
    //                 );
    //             }}
    //             renderDropdownIcon={() => {
    //                 return (
    //                     <FontAwesome
    //                         name="chevron-down"
    //                         color={'black'}
    //                         size={14}
    //                         style={{ marginRight: 20 }}
    //                     />
    //                 );
    //             }}
    //             dropdownIconPosition={'right'}
    //             dropdownStyle={styles.dropdown3DropdownStyle}
    //             rowStyle={styles.dropdown3RowStyle}
    //             renderCustomizedRowChild={(item, index) => {
    //                 return (
    //                     <View style={styles.dropdown3RowChildStyle}>
    //                         <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
    //                     </View>
    //                 );
    //             }}
    //         />
    //         <View style={styles.container}>
    //             {StationError != null ? (
    //                 <Text style={styles.error}>{StationError}</Text>
    //             ) : null}
    //         </View></>)