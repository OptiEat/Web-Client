import React, { useState } from 'react';
import Layout from '../Layout';
import { Upload, message, Button } from 'antd';
import 'antd/dist/antd.css';
import './index.scss';
import useForm from 'react-hook-form'

const request = require('request');
const axios = require('axios');

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

function ScanPage(props) {
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => {
    let base64Encoded = toBase64(document.getElementByID("imageInput").files[0]);
    console.log(base64Encoded);
  }
  const [loading, setLoading] = useState(false);
  const [scanText, setScanText] = useState('Scan');
  const [imgSrc,  setImgSrc] = useState("");
  const [styles, setStyles] = useState({opacity:1, top: "auto", bottom:"50%", position: "absolute"});
  const uploadProps = {
    name: 'file',
    customRequest: dummyRequest,
    //listType: 'picture',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
        console.log("test");
        setLoading(true);
        setScanText("");
      }
      if (info.file.status === 'done') {
        setStyles({opacity:1, top: "auto", bottom:"40px",  position: "relative"});
        message.success(`${info.file.name} file uploaded successfully`);
        toBase64(info.file.originFileObj).then(base64Data => {
          setImgSrc(base64Data);
          base64Data = base64Data.substring(22);
          console.log(base64Data);
          props.setFoods({Products: JSON.parse(data)});
/*
          var options = {
            url: "https://optieat.herokuapp.com/api/query/scan/",
            method: "POST",
            json: {
              "image": base64Data
            }
          };
            request(options, (err, resp, body) => {
              console.log(resp);
              if (resp) {
              message.success(`Successfully scanned`);
              for (let i  = 0 ; i < resp.body.body.body.Products.length; i++) {
                let k = JSON.parse(resp.body.body.body.Products[i]);
              }
              props.setFoods({Products: resp.body.body.body.Products});
              setLoading(false);
              setTimeout(function() {

              })
              console.log(err);
            }
            else {
              message.error("Scan failed");
            }
            });
            */
          });

      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };


  return (
      <Layout>
        <div className ="ScanPage">
          <section className="ScannedImageDisplay">
            <img id='ScannedImage' src={imgSrc} />
          </section>
          <div id='UploadDiv' style={styles}>
          <Upload {...uploadProps} id='UploadWrapper'>
            <Button id='ScanReceiptButton' loading={loading}>{scanText}
            </Button>
          </Upload>
          </div>


        </div>
      </Layout>
  )
}

function handleSubmit(base64Data) {

}

export default ScanPage;
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

/*
toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0')
  .then(dataUrl => {
    console.log('RESULT:', dataUrl)
  })
*/



const data ="[\"{\\\"id\\\": \\\"LGM CHILI OIL SAUCE IN JAR\\\", \\\"description\\\": \\\"Chili oil sauce\\\", \\\"quantity\\\": \\\"1\\\", \\\"quantityType\\\": \\\"Jars\\\", \\\"expiration\\\": \\\"365\\\", \\\"shortName\\\": \\\"chili\\\"}\",\"{\\\"id\\\": \\\"KADOYA SESAME OIL\\\", \\\"description\\\": \\\"Kadoya Sesame Oil\\\", \\\"quantity\\\": \\\"15\\\", \\\"quantityType\\\": \\\"Fl Oz\\\", \\\"expiration\\\": \\\"180\\\", \\\"shortName\\\": \\\"oil\\\"}\",\"{\\\"id\\\": \\\"WU-MU CN BEIJING-NOODLE\\\", \\\"description\\\": \\\"Beijing Noodles\\\", \\\"quantity\\\": \\\"1\\\", \\\"quantityType\\\": \\\"Boxes\\\", \\\"expiration\\\": \\\"60\\\", \\\"shortName\\\": \\\"noodle\\\"}\",\"{\\\"id\\\": \\\"ROSEMARY PASTURE RAISED EGGS\\\", \\\"description\\\": \\\"Rosemary Pasture Raised Eggs\\\", \\\"quantity\\\": \\\"6\\\", \\\"quantityType\\\": \\\"Count\\\", \\\"expiration\\\": \\\"20\\\", \\\"shortName\\\": \\\"egg\\\"}\",\"{\\\"id\\\": \\\"HORIZON\\\", \\\"description\\\": \\\"Horizon Milk\\\", \\\"quantity\\\": \\\"1\\\", \\\"quantityType\\\": \\\"Gallons\\\", \\\"expiration\\\": \\\"10\\\", \\\"shortName\\\": \\\"milk\\\"}\",\"{\\\"id\\\": \\\"HORIZON ORGANIC WHOLE MILK\\\", \\\"description\\\": \\\"Horizon Organic Whole Milk\\\", \\\"quantity\\\": \\\"1\\\", \\\"quantityType\\\": \\\"Gallons\\\", \\\"expiration\\\": \\\"10\\\", \\\"shortName\\\": \\\"milk\\\"}\",\"{\\\"id\\\": \\\"GREEN SEEDLESS GRAPE\\\", \\\"description\\\": \\\"Green Seedless Grapes\\\", \\\"quantity\\\": \\\"15\\\", \\\"quantityType\\\": \\\"Ounces\\\", \\\"expiration\\\": \\\"8\\\", \\\"shortName\\\": \\\"grape\\\"}\",\"{\\\"id\\\": \\\"ORGANIC BABY SPRING MIX\\\", \\\"description\\\": \\\"Organic Baby Spring Vegetables Mix\\\", \\\"quantity\\\": \\\"10\\\", \\\"quantityType\\\": \\\"Ounces\\\", \\\"expiration\\\": \\\"6\\\", \\\"shortName\\\": \\\"salad\\\"}\"]"
