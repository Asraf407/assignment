import axios from 'axios';
import React, { useState } from 'react';
// import { Navbar } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
    const { register, handleSubmit } = useForm();
    const [imageURL, setImageURL] = useState(null);

    const onSubmit = data => {
        const productData = {
            name: data.name,
            imageURL: imageURL
        };
        const url = `https://arcane-retreat-79532.herokuapp.com/products`;

        console.log(productData)
        fetch(url, {
            method:'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(res => console.log('server side response'))
    };
    const handleImgUpload =event =>{
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '733ccff8b2166f98b7716e88c8d0bc09');
        imageData.append('image', event.target.files[0]);
        
        axios.post('https://api.imgbb.com/1/upload',
        imageData)
          .then(function (response) {

          setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
    <div className ='bg-primary text-center'>
        {/* <Navbar className = ''>
            <h4>Add Product</h4>
            <br/>
            <h4>Manage Product</h4>

        </Navbar> */}
        <div className = ' '>
       
            <form onSubmit={handleSubmit(onSubmit)}>
                    <br/>
                    <h1>Add your preferred Product </h1>
             Product Name: <input name="name"  {...register('name', {required: true})} placeholder= 'Product Name'/>
                    <br />
            Email Address: <input type="email" placeholder='Write your email' {...register('email', { required: true })} />
                    <br/>
           Product Quantity:  <input name="name" placeholder='quantity' />
                     <br/>
            Upload Image: <input name="image" type="file" onChange={handleImgUpload} />
                     <br/>
            <input className='dark' type="submit" />
            <br/>
            </form>
        </div>
        </div>
    );
};

export default AddProduct;