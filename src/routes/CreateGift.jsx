import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export function CreateGift() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [ imageURL, setImageURL ] = useState( null );
  const [ user, setUser ] = useState( null );

  useEffect( () => {
    Axios( {
      method : "GET",
      url    : "http://localhost:8002/getuser",
      headers: {
        "Content-Type": "application/json",
      },
    } ).then( res => {
      if ( res.data )
        setUser( res.data.username );
    } )
      .catch( err => {
        if ( err.response.status === 401 )
          navigate( "../login", { replace: true } );

      } );
  }, [] );

  const onSubmit = async ( data ) => {
    const formData = new FormData();
    formData.append( "image", data.image[0] );
    await Axios
      .post( "http://localhost:8002/uploadImage", formData, {
      } )
      .then( ( response ) => {
        // console.log("response from uploadImage");
      } )
      .catch( ( err ) => {
        console.log( err.data );
      } );

    Axios
      .post( "http://localhost:8002/gifts", data, {
      } )
      .then( ( response ) => {
        console.log( "response", response );
        if ( response.data.message === "success" )
          navigate( "../myGifts", { replace: true } );


      } )
      .catch( ( err ) => {
        console.log( err.data );
      } );
  };

  const GiftPreview = styled.img`
        width: 80%;
        height: 80%;
`;

  return (
    <main>

      {/* <form onSubmit={handleSubmit(onSubmit)}> */}

      <h2>Create Gift</h2>

      <form onSubmit={handleSubmit( ( data ) => onSubmit( data ) )}>

        <div>
          <input {...register( "title" )} placeholder="Title" type="text" />
        </div>
        <div>
          <input
            {...register( "description" )}
            placeholder="Description"
            type="text"
          />
        </div>
        <div>
          <input
            {...register( "url" )}
            placeholder="Url"
            type="url"
          />
        </div>
        <div>
          <label for="img">Select image:</label>
          <div >
            <input
              // ref={register}
              {...register( "image" )}
              type="file"
              name="image"
            />
          </div>
          {/* <input {...register("image")} type="file" id="img" name="image" accept="image/*" onChange={(e) => handleChange(e)} /> */}
          {/* <input
                        {...register("image")}
                        type="file"
                        id="img"
                        name="img"
                        accept="image/*"
                        // value={selectedFile}
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    /> */}

        </div>
        <GiftPreview src={imageURL} />
        <div>
          <select {...register( "priority" )} name="priority" id="priority" multiple>
            <option value={1}>Must Have</option>
            <option value={2}>I'd like</option>
            <option value={3}>Maybe</option>
          </select>
        </div>
        <div>
        </div>
        <input type="submit" />
      </form>
    </main>
  );
}
