import { View, Text, PermissionsAndroid, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Contact from 'react-native-contacts';

const Contacts = () => {

    // All the states are here
    const [data, setData] = useState();

    // useEffect function are here
    useEffect(() => {
        getPermission()
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

    const renderItem = ({item}) => {
        return(
            <View style={styles.contactItemParentContainer}>

            <View style={styles.contactItemContainer}>
                <View style={styles.contactThumbNailContainer}>
                    <View style={styles.contactThumbNail}>
                        <Text style={styles.contactThumbNailText}>UP</Text>
                    </View>
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
    },
    contactItemContainer: {
        borderColor: 'black',
        // borderWidth: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
        width: '95%',
    },
    contactThumbNailContainer: {
        // borderColor: 'black',
        // borderWidth: 1,
        flex: 0.5,
    },
    contactThumbNail: {
        borderColor: 'black',
        borderWidth: 1,
        // paddingHorizontal: 15,
        // paddingVertical: 10,
        padding: 10,
        borderRadius: 100,
        alignItems: 'center',
        width: 60,

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
        paddingLeft: 20,
    },
    contactDetails:{
        fontSize: 17,
    },
})

export default Contacts