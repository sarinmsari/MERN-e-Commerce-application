import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../Backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(false);

  const loadAllProducts = ()=>{
    getProducts().then(data=>{
      if(data.error){
        setErrors(data.error)
      }else{
        setProducts(data)
      }
    })
  }

  useEffect(()=>{
    loadAllProducts()
  },[])

  return (
    <Base title="Home Page" description="Welcome to the new local shopping">
      <div className="row">
        <h1 className="text-white">All of t-shirts</h1>
        <div className="row">
          {products.map((product,index)=>{
            return(
              <div key={index} className="col-4 mb-4">
                <Card product={product}/>
              </div>
            )
          })}
        </div>
      </div>
    </Base>
  );
}
