import React from 'react'
import './RatioComponent.css';
import { MdOutlineBlock } from "react-icons/md";
import { BsInstagram, BsTiktok, BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

export default function RatioComponent() {
  return (
    <>
      <h1>Ratio</h1>
      <div className="ratio-container">
        <div>
          <button className="ratio-button button-original">
            <MdOutlineBlock size={25} />
          </button>
          <span>Original</span>
        </div>

        <div>
          <button className="ratio-button button-4-5 selected">
            <BsInstagram size={25} />
          </button>
          <span className='d-flex justify-content-center'>4:5</span>
        </div>

        {/* <button className="ratio-button button-4-5 selected">
          <BsInstagram />
          <span>4:5</span>
        </button> */}
        <button className="ratio-button button-9-18">
          <BsTiktok />
          <span>9:18</span>
        </button>
        <button className="ratio-button button-16-9">
          <BsYoutube />
          <span>16:9</span>
        </button>
        <button className="ratio-button button-9-16">
          <FaFacebookF />
          <span>9:16</span>
        </button>
      </div>
      <div className="ratio-values">
        <span className="ratio-value">4:3</span>
        <span className="ratio-value">1:1</span>
        <span className="ratio-value">5:4</span>
        <span className="ratio-value">20:9</span>
      </div>
    </>
  )
}
