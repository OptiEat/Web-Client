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
        message.success(`${info.file.name} file uploaded successfully`);
        toBase64(info.file.originFileObj).then(base64Data => {
          base64Data = base64Data.substring(22);
          console.log(base64Data);

          var options = {
            uri: "http://localhost:5000/api/query/scan",
            method: "POST",
            json: {
              "image": base64Data
            }
          };
            request(options, (err, resp, body) => {
console.log(resp);
console.log(err);
            });

/*
          axios.post('http://localhost:5000/api/query/scan', {
            image: base64Data
          }).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
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

          </section>
          <div id='UploadDiv'>
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
