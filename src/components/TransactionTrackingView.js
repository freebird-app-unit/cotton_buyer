import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import { theme } from '../core/theme';
import Iconicons from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import api_config from '../Api/api';
import RNFetchBlob from 'rn-fetch-blob';
import defaultMessages from '../helpers/defaultMessages';
import PDF_Icon from '../assets/Pdf';
import Button from '../components/Button';
import { widthPercentageToDP } from './responsive-ratio';

export default function TransactionTrackingView(proping) {
  console.log('proping',proping.Props.route.params.data)
  const props = {
    Props: proping.Props.route.params.data
  };



  const scrollViewRef = React.useRef();

  const [height, setHeight] = React.useState(0);
  const [heightDeal, setHeightDeal] = React.useState(0);
  const [heightSempling, setHeightSempling] = React.useState(0);

  const [heightTransmit, setHeightTransmit] = React.useState(0);
  const [heightWGST, setHeightheightWGST] = React.useState(0);
  const [spinner, setSpinner] = React.useState(false);

  const [showLabImage, setShowLabImage] = React.useState(true);
  const [labImageSrc, setLabImageSrc] = React.useState(null);
  const [labMimeType, setLabMimeType] = React.useState(null);

  const [showTransmit, setShowTransmit] = React.useState(true);
  const [transmitImageSrc, setTransmitImageSrc] = React.useState(null);
  const [transmitMimeType, setTransmitMimeType] = React.useState(null);

  const [showWithoutGst, setShowWithoutGst] = React.useState(true);
  // const [heiWGST, setheightWGST] = React.useState(0);

  const [withoutGstImageSrc, setWithoutGstImageSrc] = React.useState(null);
  const [withoutGstMimeType, setWithoutGstMimeType] = React.useState(null);

  const [showDebitNote, setshowDebitNote] = React.useState(true);
  const [showDebitNoteMore, setshowDebitNoteMore] = React.useState(true);

  const [heightDebitNote, setHeightDebitNote] = React.useState(0);
  const [DebitNoteImageSrc, setDebitNoteImageSrc] = React.useState([]);
  const [DebitNoteMimeType, setDebitNoteMimeType] = React.useState([]);

  const [showGst, setShowGst] = React.useState(true);
  const [gstImageSrc, setGstImageSrc] = React.useState(null);
  const [gstMimeType, setGstMimeType] = React.useState(null);
  const [Width, setWidth] = React.useState(0)

  const [showLabStatusButton, setLabStatusButton] = React.useState(true);

  const [showSampling, setShowSampling] = React.useState(null);

  // console.log('heightWGST', heightWGST, heightTransmit)

  useEffect(async () => {
    setSpinner(true)
    getContractDetails(props.Props.deal_id);
  }, []);

  const getContractDetails = dealId => {
    try {
      var self = this;
      let data = {
        deal_id: dealId,
      };

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.CONTRACT_DETAIL,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log(
            'my negotiation list response :',
            JSON.stringify(response.data.data),
          );
          setSpinner(false);
          if (response.data.status == 200) {
            if (response.data.data.lab_report == '') {
              setShowLabImage(true);
            } else {
              setShowLabImage(false);

              setLabImageSrc(response.data.data.lab_report);
              setLabMimeType(response.data.data.lab_report_mime);
            }

            if (response.data.data.lab_report_status) {
              setLabStatusButton(false)
            }

            if (response.data.data.transmit_deal == '') {
              setShowTransmit(true);
            } else {
              setShowTransmit(false);
              setTransmitImageSrc(response.data.data.transmit_deal);
              setTransmitMimeType(response.data.data.transmit_deal_mime);
            }

            if (response.data.data.without_gst == '') {
              setShowWithoutGst(true);
            } else {
              setShowWithoutGst(false);
              setWithoutGstImageSrc(response.data.data.without_gst);
              setWithoutGstMimeType(response.data.data.without_gst_mime);
            }

            if (response.data.data.gst_reciept == '') {
              setShowGst(true);
            } else {
              setShowGst(false);
              setGstImageSrc(response.data.data.gst_reciept);
              setGstMimeType(response.data.data.without_gst_mime);
            }
            // console.log('sempling', response.data.data.is_sample)
            if (response.data.data.is_dispatch === 0) {
              setShowSampling(response.data.data.is_sample == 0 ? true : false);
            } else {
              setShowSampling(false);
            }

            // if (props.Props.debit_note_array == '')
            // { setshowDebitNote(true) }
            // else {
            //   setshowDebitNote(false)
            if (response.data.data.debit_note_array.length == 0) {
              setshowDebitNote(true)
            } else {
              let d = response.data.data.debit_note_array.map(item => item.file_name)
              setDebitNoteImageSrc(d)
              let t = response.data.data.debit_note_array.map(item => item.file_name.split('.').pop())
              setDebitNoteMimeType(t);
              setshowDebitNote(false)

            }

            // console.log()
            // let d = props.Props.debit_note_array.map(item => item.file)
            // setDebitNoteImageSrc(d)
            // console.log('d', d)

            // let t = props.Props.debit_note_array.map(item => item.file.split('.').pop())
            // setDebitNoteMimeType(t);
            // console.log('t',t)
            // setshowDebitNote(false)

            // }
            // // setDebitNoteMimeType

          } else {
            console.log('hi')
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          setSpinner(false);
          alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onPassPressed = () => {
    let data = { deal_id: props.Props.deal_id, lab_report_status: "pass" }
    setLabReportStatus(data)
  };

  const onFailPressed = () => {
    let data = { deal_id: props.Props.deal_id, lab_report_status: "fail" }
    setLabReportStatus(data)
  };

  const onFailWithNPressed = () => {
    let data = { deal_id: props.Props.deal_id, lab_report_status: "fail_with_renegotiation" }
    setLabReportStatus(data)
  };

  const setLabReportStatus = async data => {
    try {
      console.log('PDF Data: ' + JSON.stringify(data));

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      setSpinner(true)
      axios({
        url: api_config.BASE_URL + api_config.LAB_REPORT_STATUS,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {

          setSpinner(false);
          if (response.data.status == 200) {
            setLabStatusButton(false)
            if (data.lab_report_status == "fail_with_renegotiation") {
              let passData = {
                sellerId: props.Props.seller_id,
                post_id: props.Props.post_notification_id,
                type: props.Props.negotiation_type,
                deal_id: props.Props.deal_id
              }

              proping.Props.navigation.navigate('DealDetails', {
                data: passData,
                cameFrom: 'Renegotiation',
                type: props.Props.negotiation_type,
                prevScrName: 'Dashboard',
              });
            }
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          setSpinner(false);
          alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const ButtonLabelLabReport = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
          paddingTop: 10,
        }}>
        {showLabImage ? (
          <TouchableOpacity
            onPress={props.onPress}
            disabled={props.disabled}
            style={{
              width: '40%',
              borderRadius: 5,
              justifyContent: 'center',
              height: 35,
              alignItems: 'center',
              backgroundColor: theme.colors.primary,
              opacity: props.disabled ? 0.55 : 1,
            }}>
            <View
              style={{
                justifyContent: 'space-around',
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <Iconicons
                name="upload"
                size={15}
                color="#fff"
                style={{ paddingTop: 3 }}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: '#fff',
                  fontFamily: 'Poppins-Regular',
                  marginLeft: 5,
                }}>
                Upload
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity onPress={props.onPress}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 0,
                  justifyContent: 'space-between',
                  width: 'auto',
                  paddingHorizontal: 0,
                  borderWidth: 1,
                  borderColor: '#d1d1d1',
                }}>
                <Image
                  style={{ height: 60, width: 60 }}
                  resizeMode="cover"
                  source={{ uri: labImageSrc }}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const ButtonLabelTransmit = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
          paddingTop: 10,
        }}>
        {showTransmit ? (
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              width: '40%',
              borderRadius: 5,
              justifyContent: 'center',
              height: 35,
              alignItems: 'center',
              backgroundColor: theme.colors.primary,
            }}>
            <View
              style={{
                justifyContent: 'space-around',
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <Iconicons
                name="upload"
                size={15}
                color="#fff"
                style={{ paddingTop: 3 }}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: '#fff',
                  fontFamily: 'Poppins-Regular',
                  marginLeft: 5,
                }}>
                Upload
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={props.onPress}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 0,
                justifyContent: 'space-between',
                width: 'auto',
                paddingHorizontal: 0,
                borderWidth: 1,
                borderColor: '#d1d1d1',
              }}>
              <Image
                style={{ height: 60, width: 60 }}
                resizeMode="cover"
                source={{ uri: transmitImageSrc }}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const ButtonLabelWithoutGST = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
          paddingTop: 10,
        }}>
        {showWithoutGst ? (
          <TouchableOpacity
            onPress={props.onPress}
            disabled={props.disabled}
            style={{
              width: '40%',
              borderRadius: 5,
              justifyContent: 'center',
              height: 35,
              alignItems: 'center',
              backgroundColor: theme.colors.primary,
              opacity: props.disabled ? 0.55 : 1,

            }}>
            <View
              style={{
                justifyContent: 'space-around',
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <Iconicons
                name="upload"
                size={15}
                color="#fff"
                style={{ paddingTop: 3 }}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: '#fff',
                  fontFamily: 'Poppins-Regular',
                  marginLeft: 5,
                  // opacity: props.disabled ?  : 0.2,
                }}>
                Upload
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={props.onPress}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 0,
                justifyContent: 'space-between',
                width: 'auto',
                paddingHorizontal: 0,
                borderWidth: 1,
                borderColor: '#d1d1d1',
              }}>
              <Image
                style={{ height: 60, width: 60 }}
                resizeMode="cover"
                source={{ uri: withoutGstImageSrc }}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const ButtonLabelGST = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
          paddingTop: 10,
        }}>
        {showGst ? (
          <TouchableOpacity
            onPress={props.onPress}
            disabled={props.disabled}
            style={{
              width: '40%',
              borderRadius: 5,
              justifyContent: 'center',
              height: 35,
              alignItems: 'center',
              opacity:props.disabled ? 0.55 : 1,
              backgroundColor: theme.colors.primary,
            }}>
            <View
              style={{
                justifyContent: 'space-around',
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <Iconicons
                name="upload"
                size={15}
                color="#fff"
                style={{ paddingTop: 3 }}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: '#fff',
                  fontFamily: 'Poppins-Regular',
                  marginLeft: 5,
                  // opacity:props.disabled ? 1 : 0
                }}>
                Upload
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={props.onPress}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 0,
                justifyContent: 'space-between',
                width: 'auto',
                paddingHorizontal: 0,
                borderWidth: 1,
                borderColor: '#d1d1d1',
              }}>
              <Image
                style={{ height: 60, width: 60 }}
                resizeMode="cover"
                source={{ uri: gstImageSrc }}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const ButtonLabelDebitNote = (props) => {

    return (
      <View style={{
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', width: '80%', paddingTop: 10,
      }} >
        {(showDebitNote || setshowDebitNoteMore) ? <TouchableOpacity onPress={props.onPress}
        disabled={props.disabled}
          style={{ width: 'auto', paddingHorizontal: 10, borderRadius: 5, 
          justifyContent: 'center', height: 35, alignItems: 'center', 
            opacity: props.disabled ? 0.55 : 1,

          backgroundColor: theme.colors.primary }}>
          <View style={{ justifyContent: 'space-around', alignSelf: 'center', flexDirection: 'row' }}>
            <Iconicons name='upload' size={15} color='#fff' style={{ paddingTop: 3 }} />
            <Text style={{
              fontSize: 15,
              color: '#fff',
              fontFamily: "Poppins-Regular", marginLeft: 5
            }}>{props.Title}</Text>
          </View></TouchableOpacity> : <TouchableOpacity onPress={props.onPress}><View style={{
            flexDirection: 'row', alignItems: 'center', paddingVertical: 0,
            justifyContent: 'space-between', width: 'auto'
            , paddingHorizontal: 0, borderWidth: 1, borderColor: '#d1d1d1'
          }} >
            <Image style={{ height: 60, width: 60, }} resizeMode='cover' source={{ uri: gstImageSrc, }} /></View></TouchableOpacity>}
      </View>
    )
  }


  const LabelProperty = props => {
    return (
      <>
        <Text
          style={{
            color: theme.colors.textColor,
            fontSize: 14,
            opacity: 0.5,
            fontFamily: 'Poppins-Regular',
          }}>
          {props.label}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#333',
            fontFamily: 'Poppins-Regular',
          }}>
          {props.value}
        </Text>
      </>
    );
  };

  const onLayoutBales = event => {
    let { height } = event.nativeEvent.layout;
    setHeight(height);
  };
  const onLayoutDeal = event => {
    let { height } = event.nativeEvent.layout;
    setHeightDeal(height);
  };
  const onLayoutSempling = event => {
    let { height } = event.nativeEvent.layout;
    setHeightSempling(height);
  };
  const onLayoutTransmit = event => {
    let { height } = event.nativeEvent.layout;
    setHeightTransmit(height);
  };
  const onLayoutWithoutGST = event => {
    let { height } = event.nativeEvent.layout;
    // console.log('height>>>>>', height);
    setHeightheightWGST(height);
  };



  const onLayoutDebitNote = event => {

    let { height } = event.nativeEvent.layout
    console.log('height', height)
    setHeightDebitNote(height);


  }
  const widthLayout = event => {
    let { width } = event.nativeEvent.layout
    // console.log('height>>>width', width)
    setWidth(width);
  }
  // console.log('height>>>width', Width)

  const openDocumentPicker = async type => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (type == 'lab') {
        //setSpinner(true);
        let data = {
          deal_id: props.Props.deal_id,
          upload_by: 'buyer',
        };
        const formData = new FormData();

        formData.append('data', JSON.stringify(data));
        formData.append('lab_report', {
          uri: res[0].uri,
          name: res[0].name,
          type: res[0].type,
        });
        uploadImageToServer(formData)
        setShowLabImage(false);
        setLabImageSrc(res[0].uri);
        setLabMimeType(res[0].type);
      } else if (type == 'transmit') {
        setSpinner(true);
        let data = {
          deal_id: props.Props.deal_id,
          upload_by: 'buyer',
        };
        const formData = new FormData();

        formData.append('data', JSON.stringify(data));
        formData.append('transmit_deal', {
          uri: res[0].uri,
          name: res[0].name,
          type: res[0].type,
        });
        uploadImageToServer(formData);
        setShowTransmit(false);
        setTransmitImageSrc(res[0].fileCopyUri);
        setTransmitMimeType(res[0].type);
      } else if (type == 'withoutGst') {
        setSpinner(true);
        let data = {
          deal_id: props.Props.deal_id,
          upload_by: 'buyer',
        };
        const formData = new FormData();

        formData.append('data', JSON.stringify(data));
        formData.append('without_gst', {
          uri: res[0].uri,
          name: res[0].name,
          type: res[0].type,
        });
        uploadImageToServer(formData);
        setShowWithoutGst(false);
        setWithoutGstImageSrc(res[0].fileCopyUri);
        setWithoutGstMimeType(res[0].type);
      } else if (type == 'gst') {
        setSpinner(true);
        let data = {
          deal_id: props.Props.deal_id,
          upload_by: 'buyer',
        };
        const formData = new FormData();

        formData.append('data', JSON.stringify(data));
        formData.append('gst_reciept', {
          uri: res[0].uri,
          name: res[0].name,
          type: res[0].type,
        });
        uploadImageToServer(formData);
        setShowGst(false);
        setGstImageSrc(res[0].fileCopyUri);
        setGstMimeType(res[0].type);
      } else if (type == "debitnote") {
        setSpinner(true)
        let data = {
          deal_id: props.Props.deal_id,
          upload_by: 'buyer',
        };
        const formData = new FormData();

        formData.append('data', JSON.stringify(data));
        formData.append('debit_note', {
          uri: res[0].uri,
          name: res[0].name,
          type: res[0].type,
        });
        uploadImageToServer(formData)

        let d = DebitNoteImageSrc || [];

        d.push(res[0].fileCopyUri)
        let i = DebitNoteMimeType || [];
        i.push(res[0].type)
        setDebitNoteImageSrc(d)
        console.log('debit', DebitNoteImageSrc, DebitNoteMimeType)
        setDebitNoteMimeType(i)
        setshowDebitNote(false)
        setshowDebitNoteMore(true)
        // setGstMimeType(res[0].type)
      }

      //alert(res[0].fileCopyUri)
      console.log(JSON.stringify(res));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const viewDocument = async (fileUrl, mimeType) => {
    try {
      // alert(fileUrl+":"+mimeType)
      // const android = RNFetchBlob.android;
      // android.actionViewIntent(fileUrl, mimeType);
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'Application needs access to your storage to download File',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Start downloading
        //this.setState({spinner: true})
        setSpinner(true);
        downloadFile(fileUrl, mimeType);
        console.log('Storage Permission Granted.');
      } else {
        // If permission denied then show alert
        Alert.alert('Error', 'Storage Permission Not Granted');
      }
    } catch (err) {
      alert(err);
    }
  };

  const downloadFile = async (fileUrl, mimeType) => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', res.data);
        setSpinner(false);
        const android = RNFetchBlob.android;
        android.actionViewIntent(res.data, mimeType);
        console.log('File Downloaded Successfully.');
      });
  };

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  const uploadImageToServer = async data => {
    try {
      console.log('PDF Data: ' + JSON.stringify(data));
      axios({
        url: api_config.BASE_URL + api_config.UPDATE_TRANSACTION_TRACKING,
        method: 'POST',
        data: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log(
            'my negotiation list response :',
            JSON.stringify(response.data.data),
          );
          setSpinner(false);
          if (response.data.status == 200) {
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          setSpinner(false);
          alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
    }
  };


  const renderITem = (item, index) => {
    console.log(item, index)
    return (
      <View style={{ flexDirection: 'row', paddingRight: 2 }}>
        {(DebitNoteMimeType[index] === "application/pdf" || DebitNoteMimeType[index] === "application/pdf") ? (<View style={{
          width: 60, height: 60, alignItems: 'center',
          justifyContent: 'center', width: 'auto', paddingTop: 10,
        }}>
          <PDF_Icon onPress={() =>
            viewDocument(item, DebitNoteMimeType[index])} /></View>) : (

          <View style={{
            alignItems: 'center', paddingVertical: 0,
            justifyContent: 'center', width: 'auto', margin: 2
            , paddingHorizontal: 0, borderWidth: 1, borderColor: '#d1d1d1'
          }} ><Image style={{ height: 60, width: 60, }} resizeMode='cover' source={{ uri: item }} /></View>)}

        {index === DebitNoteImageSrc.length - 1 && (<ButtonLabelDebitNote Title='Add More'
          show={true} onPress={() => openDocumentPicker('debitnote')} />)}</View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Spinner visible={spinner} color="#085cab" />
      <ScrollView style={{ flex: 1, alignSelf: 'stretch', marginBottom: '10%' }}>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ width: '20%', alignItems: 'center' }}>
              <View style={styles.ActivestepIndicator} />
              <View
                style={styles.HeightIndicator(height, theme.colors.primary)}
              />
            </View>
            <View
              style={{
                width: '83%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.title}>Bales/ Price Details</Text>
              <View onLayout={onLayoutBales} style={{ width: '80%' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '45%',
                    }}>
                    <LabelProperty
                      label="Post Bales"
                      value={props.Props.post_bales}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '39%',
                    }}>
                    <LabelProperty
                      label="Sale Bales"
                      value={props.Props.sell_bales}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 10,
                  }}>
                  <View
                    style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <LabelProperty
                      label="Post Price"
                      value={props.Props.post_price}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '39%',
                    }}>
                    <LabelProperty
                      label="Sale Price"
                      value={props.Props.sell_price}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '20%', alignItems: 'center' }}>
              <View style={styles.ActivestepIndicator} />
              <View
                style={styles.HeightIndicator(heightDeal, theme.colors.primary)}
              />
            </View>
            <View
              style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <Text style={styles.title}>Deal Details</Text>
              <View style={{ width: '100%' }} onLayout={onLayoutDeal}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '80%',
                    paddingTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '40%',
                    }}>
                    <LabelProperty
                      label="Seller Name"
                      value={props.Props.seller_name}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '45%',
                    }}>
                    <LabelProperty label="Broker Name" value={props.Props.broker_name} />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '80%',
                    paddingTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '47%',
                    }}>
                    <LabelProperty
                      label="Payment Condition"
                      value={props.Props.payment_condition}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '45%',
                    }}>
                    <LabelProperty
                      label="Transmit Condition"
                      value={props.Props.transmit_condition}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '80%',
                    paddingTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '45%',
                    }}>
                    <LabelProperty label="Lab" value={props.Props.lab} />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '20%', alignItems: 'center' }}>
              <View style={styles.ActivestepIndicator} />
              <View
                style={styles.HeightIndicator(
                  30,
                  showSampling ? '#d1d1d1' : theme.colors.primary,
                )}
              />
            </View>
            <View
              style={{
                width: '83%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.title}>Sampling if not direct dispatch</Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#333',
                  opacity: 0.5,
                  fontFamily: 'Poppins-Regular',
                }}>
                Confirmation Needed
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '20%', alignItems: 'center' }}>
              <View
                style={
                  showLabImage
                    ? {
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      backgroundColor: 'transparent',
                      borderWidth: 2,
                      borderColor: '#d1d1d1',
                    }
                    : styles.ActivestepIndicator
                }
              />
              <View
                style={styles.HeightIndicator(
                  heightSempling,
                  showLabImage ? '#d1d1d1' : theme.colors.primary,
                )}
              />
            </View>
            <View
              style={{
                width: '83%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.title}>Upload Lab Report</Text>
              <View style={{ width: '100%' }} onLayout={onLayoutSempling}>
                {showLabImage ? (
                  <ButtonLabelLabReport
                    show={true}
                    disabled={!!showSampling}
                    onPress={() => openDocumentPicker('lab')}
                  />
                ) : (
                  <View>
                    {labMimeType == 'application/pdf' ? (
                      <View
                        style={{
                          width: 60,
                          height: 60,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '80%',
                          paddingTop: 10,
                        }}>
                        <PDF_Icon
                          onPress={() =>
                            viewDocument(
                              props.Props.lab_report,
                              props.Props.lab_report_mime,
                            )
                          }
                        />
                        {showLabStatusButton ? <View style={{ flexDirection: 'row', marginTop: 5 }}>
                          <TouchableOpacity
                            onPress={onPassPressed}
                            style={{
                              flex: 1,
                              width: '40%',
                              borderRadius: 5,
                              justifyContent: 'center',
                              height: 35,
                              alignItems: 'center',
                              backgroundColor: theme.colors.primary,
                              marginRight: 5,
                            }}>
                            <View
                              style={{
                                justifyContent: 'space-around',
                                alignSelf: 'center',
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: '#fff',
                                  fontFamily: 'Poppins-Regular',
                                  marginLeft: 0,
                                }}>
                                Pass
                              </Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={onFailPressed}
                            style={{
                              flex: 1,
                              width: '40%',
                              borderRadius: 5,
                              justifyContent: 'center',
                              height: 35,
                              alignItems: 'center',
                              backgroundColor: theme.colors.primary,
                              marginRight: 5,
                            }}>
                            <View
                              style={{
                                justifyContent: 'space-around',
                                alignSelf: 'center',
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: '#fff',
                                  fontFamily: 'Poppins-Regular',
                                  marginLeft: 0,
                                }}>
                                Fail
                              </Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={onFailWithNPressed}
                            style={{
                              flex: 1,
                              width: '40%',
                              borderRadius: 5,
                              justifyContent: 'center',
                              height: 35,
                              alignItems: 'center',
                              backgroundColor: theme.colors.primary,
                              marginRight: 15,
                            }}>
                            <View
                              style={{
                                justifyContent: 'space-around',
                                alignSelf: 'center',
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: '#fff',
                                  fontFamily: 'Poppins-Regular',
                                  marginLeft: 0,
                                }}>
                                Fail N
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View> : null}

                      </View>
                    ) : (
                      <View>
                        <ButtonLabelLabReport
                          imgSrc={props.Props.lab_report}
                          show={false}
                          onPress={() =>
                            viewDocument(
                              props.Props.lab_report,
                              props.Props.lab_report_mime,
                            )
                          }
                        />
                        {showLabStatusButton ? <View style={{ flexDirection: 'row', marginTop: 5 }}>
                          <TouchableOpacity
                            onPress={onPassPressed}
                            style={{
                              flex: 1,
                              width: '40%',
                              borderRadius: 5,
                              justifyContent: 'center',
                              height: 35,
                              alignItems: 'center',
                              backgroundColor: theme.colors.primary,
                              marginRight: 5,
                            }}>
                            <View
                              style={{
                                justifyContent: 'space-around',
                                alignSelf: 'center',
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: '#fff',
                                  fontFamily: 'Poppins-Regular',
                                  marginLeft: 0,
                                }}>
                                Pass
                              </Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={onFailPressed}
                            style={{
                              flex: 1,
                              width: '40%',
                              borderRadius: 5,
                              justifyContent: 'center',
                              height: 35,
                              alignItems: 'center',
                              backgroundColor: theme.colors.primary,
                              marginRight: 5,
                            }}>
                            <View
                              style={{
                                justifyContent: 'space-around',
                                alignSelf: 'center',
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: '#fff',
                                  fontFamily: 'Poppins-Regular',
                                  marginLeft: 0,
                                }}>
                                Fail
                              </Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={onFailWithNPressed}
                            style={{
                              flex: 1,
                              width: '40%',
                              borderRadius: 5,
                              justifyContent: 'center',
                              height: 35,
                              alignItems: 'center',
                              backgroundColor: theme.colors.primary,
                              marginRight: 15,
                            }}>
                            <View
                              style={{
                                justifyContent: 'space-around',
                                alignSelf: 'center',
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: '#fff',
                                  fontFamily: 'Poppins-Regular',
                                  marginLeft: 0,
                                }}>
                                Fail N
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View> : null}
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '20%', alignItems: 'center' }}>
              <View
                style={
                  showTransmit
                    ? {
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      backgroundColor: 'transparent',
                      borderWidth: 2,
                      borderColor: '#d1d1d1',
                    }
                    : styles.ActivestepIndicator
                }
              />
              <View
                style={styles.HeightIndicator(
                  heightTransmit,
                  showTransmit ? '#d1d1d1' : theme.colors.primary,
                )}
              />
            </View>
            <View
              style={{
                width: '83%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.title}>Upload Transmit deal</Text>
              <View style={{ width: '100%' }} onLayout={onLayoutTransmit}>
                {showTransmit ? (
                  <View
                    style={{
                      width: '83%',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#333',
                        opacity: 0.5,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Confirmation Needed
                    </Text>
                  </View>
                ) : (
                  <View>
                    {transmitMimeType == 'application/pdf' ? (
                      <View
                        style={{
                          width: 60,
                          height: 60,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '80%',
                          paddingTop: 10,
                        }}>
                        <PDF_Icon
                          onPress={() =>
                            viewDocument(
                              props.Props.transmit_deal,
                              props.Props.transmit_deal_mime,
                            )
                          }
                        />
                      </View>
                    ) : (
                      <ButtonLabelTransmit
                        imgSrc={props.Props.transmit_deal}
                        show={false}
                        onPress={() =>
                          viewDocument(
                            props.Props.transmit_deal,
                            props.Props.transmit_deal_mime,
                          )
                        }
                      />
                    )}
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '20%', alignItems: 'center' }}>
              <View
                style={
                  showWithoutGst
                    ? {
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      backgroundColor: 'transparent',
                      borderWidth: 2,
                      borderColor: '#d1d1d1',
                    }
                    : styles.ActivestepIndicator
                }
              />
              <View
                style={styles.HeightIndicator(
                  heightWGST,
                  showWithoutGst ? '#d1d1d1' : theme.colors.primary,
                )}
              />
            </View>
            <View
              style={{
                width: '83%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.title}>Pay without GST (Paid Receipt)</Text>
              {/* {!showWithoutGst ? ( */}
              <View style={{ width: '100%' }} onLayout={onLayoutWithoutGST}>
                {showWithoutGst ? (
                  <ButtonLabelWithoutGST
                    show={true}
                    disabled={!!showTransmit}
                    onPress={() => openDocumentPicker('withoutGst')}
                  />
                ) : (
                  <View>
                    {withoutGstMimeType == 'application/pdf' ? (
                      <View
                        style={{
                          width: 60,
                          height: 60,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '80%',
                          paddingTop: 10,
                        }}>
                        <PDF_Icon
                          onPress={() =>
                            viewDocument(
                              props.Props.without_gst,
                              props.Props.without_gst_mime,
                            )
                          }
                        />
                      </View>
                    ) : (
                      <ButtonLabelWithoutGST
                        imgSrc={props.Props.without_gst}
                        show={false}
                            disabled={!!showDebitNote}

                        onPress={() =>
                          viewDocument(
                            props.Props.without_gst,
                            props.Props.without_gst_mime,
                          )
                        }
                      />
                    )}
                  </View>
                )}
              </View>
              {/* ) : (
                <View
                  style={{width: '100%', opacity: 0.5}}
                  onLayout={onLayoutWithoutGST}>
                  <ButtonLabelWithoutGST show={true} />
                </View>
              )} */}
            </View>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <View style={{ width: '20%', alignItems: 'center' }}>
              <View style={showDebitNote ? {
                height: 20, width: 20, borderRadius: 10, backgroundColor: 'transparent',
                borderWidth: 2, borderColor: '#d1d1d1'
              } : styles.ActivestepIndicator} />
              <View style={styles.HeightIndicator(heightDebitNote, showDebitNote ? '#d1d1d1' : theme.colors.primary)} />
            </View>
            <View style={{ width: '83%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <Text style={styles.title}>Upload debit note</Text>
              {showDebitNoteMore &&
                <View style={{ width: '100%', }} onLayout={onLayoutDebitNote}>
                  {showDebitNote ?
                    <ButtonLabelDebitNote Title='Upload' disabled={!!showWithoutGst} show={true} onPress={() => openDocumentPicker('debitnote')} />
                    :
                    <View style={{ flexDirection: 'row', width: widthPercentageToDP(100), }}>
                      <ScrollView horizontal contentContainerStyle={{
                        paddingRight: widthPercentageToDP(DebitNoteImageSrc.length > 2 ? DebitNoteImageSrc.length * 5 : 1), flexGrow: 1
                      }}
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                        {DebitNoteImageSrc.length && DebitNoteImageSrc.map((item, index) => renderITem(item, index))}
                      </ScrollView>
                    </View>
                  }
                </View>}

            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '20%', alignItems: 'center' }}>
              <View
                style={
                  showGst
                    ? {
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      backgroundColor: 'transparent',
                      borderWidth: 2,
                      borderColor: '#d1d1d1',
                    }
                    : styles.ActivestepIndicator
                }
              />
              {/* <View style={{ height: heightGST + 10, width: '3%', backgroundColor: '#d1d1d1', }} /> */}
            </View>
            <View
              style={{
                width: '83%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.title}>Pay GST Receipt</Text>
              {!showWithoutGst ? (
                <View style={{ width: '100%' }}>
                  {showGst ? (
                    <ButtonLabelGST
                      show={true}
                      disabled={!!showDebitNote}
                      onPress={() => openDocumentPicker('gst')}
                    />
                  ) : (
                    <View>
                      {gstMimeType == 'application/pdf' ? (
                        <View
                          style={{
                            width: 60,
                            height: 60,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '80%',
                            paddingTop: 10,
                          }}>
                          <PDF_Icon
                            onPress={() =>
                              viewDocument(
                                props.Props.gst_reciept,
                                props.Props.gst_reciept_mime,
                              )
                            }
                          />
                        </View>
                      ) : (
                        <ButtonLabelGST
                          imgSrc={props.Props.gst_reciept}
                          show={false}
                          disabled={!!showDebitNote}
                          onPress={() =>
                            viewDocument(
                              props.Props.gst_reciept,
                              props.Props.gst_reciept_mime,
                            )
                          }
                        />
                      )}
                    </View>
                  )}
                </View>
              ) : (
               
                    <ButtonLabelGST
                      show={true}
                      disabled={!!showDebitNote}
                      onPress={() => openDocumentPicker('gst')}
                    />
               
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  ActivestepIndicator: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
  },
  HeightIndicator: (height, color) => ({
    height: height + 5,
    width: '3%',
    backgroundColor: color,
  }),
  title: {
    color: theme.colors.textColor,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
});
