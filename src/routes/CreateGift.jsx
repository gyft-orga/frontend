import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const fileToDataUri = ( file ) => new Promise( ( resolve, reject ) => {
  const reader = new FileReader();
  reader.addEventListener( "load", ( event ) => {
    resolve( event.target.result );
  } );
  reader.readAsDataURL( file );
} );

export function CreateGift() {
  const { register, handleSubmit } = useForm();
  const [ imageURL, setImageURL ] = useState( null );
  const [ dataUri, setDataUri ] = useState( "" );
  const [ user, setUser ] = useState( null );
  const navigate = useNavigate();

  useEffect( () => {
    Axios( {
      method : "GET",
      url    : "http://localhost:8002/getuser",
      headers: {
        "Content-Type": "application/json",
      },
    } ).then( res => {
      setUser( res.data.username );
    } )
      .catch( err => {
        console.log( "err:", err.response.status );
      } );
  }, [] );

  const onSubmit = ( data ) => {
    axios
      .post( "http://localhost:8002/createGift", { data, imageURL, user }, {
        headers: { "Content-Type": "application/json" },
      } )
      .then( ( response ) => {
        console.log( "response", response );
        console.log( "response status", response.status );
        if ( response.status === 200 ) {
          console.log( "this should happen" );
          navigate( "../myGifts", { replace: true } );
        }
      } )
      .catch( ( err ) => {
        console.log( err.data );
      } );
  };

  const handleChange = ( event ) => {
    const objectURL = URL.createObjectURL( event.target.files[0] );
    const file = event.target.files[0];

    setImageURL( objectURL );

    fileToDataUri( file )
      .then( dataUri => {
        //   setDataUri(dataUri)
        console.log( "dataUri", dataUri );
      } );
  };

  const GiftPreview = styled.img`
        width: 80%;
        height: 80%;
`;

  return (
    <main>
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
          <input {...register( "image" )} type="file" id="img" name="img" accept="image/*" onChange={( e ) => handleChange( e )} />
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
