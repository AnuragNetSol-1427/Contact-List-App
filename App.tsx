import { View, Text, PermissionsAndroid } from 'react-native'
import React, { useEffect } from 'react'
import Contact from 'react-native-contacts';

const App = () => {
  useEffect(() => {
    getPermission()
  }, [])
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
            })
            .catch(e => {
              console.log(e)
            })
        }
        }
      )
  }

  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App