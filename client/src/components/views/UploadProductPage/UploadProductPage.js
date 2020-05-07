  import React, { useState } from 'react';
  import{ Typography, Button, Form, message, Input, Icon } from 'antd';
  import FileUpload from '../../utils/FileUpload';
  import Axios from 'axios';

  const { Title } =  Typography;
  const { TextArea } = Input;

  const Continents = [
  {key: 1, value: "Africa"},
  {key: 2, value: "Europe"},
  {key: 3, value: "North America"},
  {key: 4, value: "South America"},
  {key: 5, value: "Asia"}
  ]

  function UploadProductPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [ContinentValue, setContinentValue] = useState(1)

    const [Images, setImages] = useState([])

    const onTitleChange = (e) => {
      setTitleValue(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
      setDescriptionValue(e.currentTarget.value)
    }

    const onPriceChange = (e) => {
      setPriceValue(e.currentTarget.value)
    }

    const onContinentsSelectChange = (e) => {
      setContinentValue(e.currentTarget.value)
    }

    const updateImages = (newImages) => {
      setImages(newImages)
    }

    const onSubmit = (e) => {
      e.preventDefault();

      const variables = {
        writer: props.user.userData._id,
        title: TitleValue,
        description: DescriptionValue,
        price: PriceValue,
        images: Images,
        continents: ContinentValue
      }

      Axios.post('/api/product/uploadProduct', variables)
        .then(response => {
          if(response.data.success) {
            alert('Product Successfuly Uploaded')
            props.history.push('/')
          } else {
            alert('Failed to Upload Product')
          }
        })
    }

    return (
      <div style={{maxWidth:'700px', margin:'2rem auto'}}>
      <div style={{textAlign:'center', marginBottom:'2rem '}}>
      <Title level={2}>Upload Pedals</Title>
      </div>

      <Form onSubmit={onSubmit} >
      <FileUpload refreshFunction={updateImages}/>
      <br />
      <br />

      <label>Title</label>
      <Input
      onChange={onTitleChange}
      value={TitleValue}
      />

      <label>Description</label>
      <TextArea
      onChange={onDescriptionChange}
      value={DescriptionValue}
      />

      <br />
      <br />

      <label>Price ($)</label>
      <Input
      onChange={onPriceChange}
      value={PriceValue}
      type='number'
      />

      <select>
      {Continents.map(item => (
        <option key={item.key} value={item.key}>{item.value}</option>
        )
      )}
      </select>

      <br />
      <br />

      <Button onClick={onSubmit}>
      Submit
      </Button>

      </Form>

      </div>
      );
  }

  export default UploadProductPage;

