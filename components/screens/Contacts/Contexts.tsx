import { View, Text, PermissionsAndroid, FlatList, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Contact from 'react-native-contacts';

const Contexts = () => {
    const [data, setData] = useState();

    const getPermission = async () => {
        try {
          const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          );
          if (permission === 'granted') {
            const contacts = await Contact.getAll();
            // // console.log(contacts);
                let newContacts = [];
                for(let i = 0; i < 100; i++){
                    newContacts.push(...contacts)
                }
            // console.log(`Contact data: `, contacts[0])
            // setData([contacts[0]]);
            console.log(`Contact data: `, contacts)
            setData(contacts);
          }
        } catch (error) {
          return <Text>returning error</Text>
        }
      };

      const extraContacts = () => {
        let newContacts = [];
        for(let i = 0; i < 100; i++){
            newContacts.push(data)
        }
        return newContacts;
    }

    const renderItem = ({item}) => {   //item is the js object
        const items = JSON.stringify(item);  //here this is the string, we can't extract its properties
        //  console.log(items)
    //  console.log(items[0].displayName)
        //  return (
        //     <>
        //         <Text>{item.displayName}</Text>
        //  </>
        //  )

         const firstName = item?.givenName;
         const letterOfFirstName = firstName?.charAt(0).toUpperCase();

         const familyName = item?.familyName;
         const letterOfFamilyName = familyName?.charAt(0).toUpperCase();

         const hasThumbNail = item?.hasThumbnail;

         let colors = ['#B9E9FC', '#AAE3E2', '#B3E5BE', '#abcdef'];
         let index = item?.recordID;
         return(
             <View style={styles.contactItemParentContainer}>

              <View style={styles.contactItemContainer}>
                 <View style={styles.contactThumbNailContainer}> 
                    <>
                        {hasThumbNail ? (<Image style={styles.thumbNailImage} source={{uri: item?.thumbnailPath}} />) : (
                    <View style={[styles.contactThumbNail, {backgroundColor: colors[index % colors.length]}]}>
                             <Text style={styles.contactThumbNailText}>{letterOfFirstName}{letterOfFamilyName}</Text>
                     </View>
                         )}
                     </>   
                 </View>
                  <View style={styles.contactDetailsContainer}>
                     <Text style={styles.contactName}>{item?.displayName}</Text>
                      {/* <Text style={styles.contactDetails}>{item?.phoneNumbers[0].number}</Text> */}
                      {/* <Text>{(item?.phoneNumbers.length > 0) ? }</Text> */}
                  </View> 
              </View>
              </View>
        )
    }

    useEffect(() => {
        getPermission()
      }, [])
  return (
    <>
    <View style = {styles.header}>
        <Text style={styles.headerText}>Contacts</Text>
    </View>
    <FlatList
    //   data={extraContacts()}
      data={data}
      renderItem={({item})=>{
        return item ? renderItem({item}) : null 
      }}

      />
      </>
  )
}

export default Contexts

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'red',
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