import PushNotification from 'react-native-push-notification';


import { Platform,PermissionsAndroid } from 'react-native';

const requestNotificationPermission = async () => {
  if(Platform.OS ==="android"){
    try {
      PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS').then(
        response => {
          if(!response){
            PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS',{
                title: 'Notification',
                message:
                  'App needs access to your notification ' +
                  'so you can get Updates',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            })
          }
        }
      ).catch(
        err => {
          console.log("Notification Error=====>",err);
        }
      )
    } catch (err){
      console.log(err);
    }
  }
};

const configureNotifications = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};





const showMaxFavoritesNotification = () => {
  PushNotification.localNotification({
    channelId:"Rick and Morty",
   
    title: "Favorite Limit Warning",
    message: "You have exceeded favorite limit. You have to remove another character from your favorites.",
    playSound: true,
    soundName: "default",
  });
  console.log("local")
};

export { configureNotifications ,requestNotificationPermission,showMaxFavoritesNotification};