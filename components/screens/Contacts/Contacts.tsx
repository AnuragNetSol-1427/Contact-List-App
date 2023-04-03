import { View, Text, PermissionsAndroid, FlatList, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Contact from 'react-native-contacts';

const Contacts = () => {

    // All the states are here
    const [data, setData] = useState();
    // const [displayName, setDisplayName] = useState('');
    // const [firstLetter, setFirstLetter] = useState('');

    // useEffect function are here
    useEffect(() => {
        getPermission()
        // firstLettersFunction();
      }, [])

    // All the functions are here  
    const getPermission = () => {
    PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.',
        'buttonPositive': 'Please accept bare mortal'
        }
    )
        .then(res => {
        if(res=='granted'){
            Contact.getAll()
            .then((contacts) => {
                // work with contacts
                console.log(contacts)
                setData(contacts)
            })
            .catch(e => {
                console.log(e)
            })
        }
        }
        )
    }
    
    // const firstLettersFunction = (displayName) => {
    //     const result = (displayName.displayName).split(' ').map(word => word.charAt(0).toUpperCase()).join('');
    //     setFirstLetter(result);

    // }
    const renderItem = ({item}) => {
        const firstName = item.givenName;
        const letterOfFirstName = firstName.charAt(0).toUpperCase();

        const familyName = item.familyName;
        const letterOfFamilyName = familyName.charAt(0).toUpperCase();

        const hasThumbNail = item.hasThumbnail;

        let colors = ['#B9E9FC', '#AAE3E2', '#B3E5BE', '#abcdef'];
        let index = item.recordID;
        
        // setDisplayName(item.displayName)
        return(
            <View style={styles.contactItemParentContainer}>

            <View style={styles.contactItemContainer}>
                <View style={styles.contactThumbNailContainer}>
                    <>
                        {hasThumbNail ? (<Image style={styles.thumbNailImage} source={{uri: item.thumbnailPath}} />) : (
                    <View style={[styles.contactThumbNail, {backgroundColor: colors[index % colors.length]}]}>
                            <Text style={styles.contactThumbNailText}>{letterOfFirstName}{letterOfFamilyName}</Text>
                    </View>
                            )}
                    </>
                </View>
                <View style={styles.contactDetailsContainer}>
                    <Text style={styles.contactName}>{item.displayName}</Text>
                    <Text style={styles.contactDetails}>{item.phoneNumbers[0].number}</Text>
                </View>
            </View>
            </View>
        )
    }
  return (
    <>
    <View style = {styles.header}>
        <Text style={styles.headerText}>Contacts</Text>
    </View>
    <FlatList
      data={data}
      renderItem={renderItem}
      />
      </>
  )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'green',
    },
    headerText: {
        color: 'white',
        fontSize: 25,
        paddingTop: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    contactItemParentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 1.5,
    },
    contactItemContainer: {
        borderColor: 'black',
        // borderWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
        width: '95%',
        // margin: 1.5,

    },
    contactThumbNailContainer: {
        // borderColor: 'black',
        // borderWidth: 1,
        flex: 0.5,
    },
    thumbNailImage: {
        height: 45,
        width: 50,
        borderColor: 'black',
        borderWidth: 1,
        // paddingHorizontal: 15,
        // paddingVertical: 10,
        padding: 6,
        borderRadius: 100,
        alignItems: 'center',
        width: 50,
    },
    contactThumbNail: {
        borderColor: 'black',
        borderWidth: 1,
        // paddingHorizontal: 15,
        // paddingVertical: 10,
        padding: 6,
        borderRadius: 100,
        alignItems: 'center',
        width: 50,

    },
    contactThumbNailText: {
        alignItems: 'center',
        fontSize: 22,
    },
    contactDetailsContainer: {
        // borderColor: 'black',
        // borderWidth: 1,
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contactName: {
        fontSize: 17,
        // paddingLeft: 1,
    },
    contactDetails:{
        fontSize: 17,
    },
})

export default Contacts